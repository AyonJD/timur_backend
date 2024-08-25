"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const collection_model_1 = __importDefault(require("./collection.model"));
const collection_constant_1 = require("./collection.constant");
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const createCollection = (collectionData) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = collection_model_1.default.create(collectionData);
    if (!collection)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Collection creation failed');
    return collection;
});
const getAllCollections = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: collection_constant_1.COLLECTION_SEARCH_FIELDS.map(field => ({
                [field]: new RegExp(searchTerm, 'i'),
            })),
        });
    }
    const whereCondition = andConditions.length ? { $and: andConditions } : {};
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOption);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield collection_model_1.default
        .find(whereCondition)
        .populate('nfts')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield collection_model_1.default.countDocuments();
    const responseData = {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
    return responseData;
});
const getCollectionById = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield collection_model_1.default
        .findById(collectionId)
        .populate('nfts');
    if (!collection) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Collection not found');
    }
    return collection;
});
const getCollectionByNftId = (nftId) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield collection_model_1.default.findOne({ nfts: nftId });
    if (!collection) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Collection not found');
    }
    return collection;
});
const getCollectionsBySpecialCollection = (specialCollection) => __awaiter(void 0, void 0, void 0, function* () {
    // Query the database to find collections matching the specialCollection criteria
    const collections = yield collection_model_1.default.find({ specialCollection }).exec();
    if (!collections || collections.length === 0)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Collection not found with this Special collection');
    return collections;
});
const getCollectionsByChainId = (chainId) => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield collection_model_1.default.find({ chainId }).exec();
    if (!collections || collections.length === 0)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Collection not found with this chain id');
    return collections;
});
exports.CollectionService = {
    createCollection,
    getAllCollections,
    getCollectionById,
    getCollectionByNftId,
    getCollectionsBySpecialCollection,
    getCollectionsByChainId,
};
