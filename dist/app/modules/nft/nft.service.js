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
exports.NftSearvice = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const nft_model_1 = __importDefault(require("./nft.model"));
const nft_constant_1 = require("./nft.constant");
const paginationHelper_1 = __importDefault(require("../../helpers/paginationHelper"));
const createNft = (nftData) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield nft_model_1.default.create(nftData);
    if (!nft)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Nft creation failed');
    return nft;
});
const getAllNfts = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: nft_constant_1.NFT_SEARCH_FIELDS.map(field => ({
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
    const result = yield nft_model_1.default
        .find(whereCondition)
        .populate([{ path: 'creator' }])
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield nft_model_1.default.countDocuments();
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
exports.NftSearvice = {
    createNft,
    getAllNfts,
};
