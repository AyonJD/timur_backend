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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
const mongoose_1 = __importDefault(require("mongoose"));
const collection_model_1 = __importDefault(require("../collection/collection.model"));
const createNft = (nftData) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionId } = nftData, rest = __rest(nftData, ["collectionId"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Retrieve the collection
        const collection = yield collection_model_1.default
            .findById(collectionId)
            .session(session);
        if (!collection) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Collection not found');
        }
        // Extract chainId from the collection
        const { chainId } = collection;
        // Create the new NFT with the chainId from the collection
        const nft = yield nft_model_1.default.create([Object.assign(Object.assign({}, rest), { chainId })], { session });
        if (!nft || nft.length === 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'NFT creation failed');
        }
        // Update the collection to push the new NFT's _id into the nfts array
        const updateResult = yield collection_model_1.default.updateOne({ _id: collectionId }, { $push: { nfts: nft[0]._id } }, { session });
        // Log the update result
        console.log('Update Result:', updateResult);
        // Check if the update was acknowledged and affected documents
        if (updateResult.acknowledged && updateResult.matchedCount > 0) {
            // Optionally, you can check the `modifiedCount` if using a compatible version
            if (updateResult.modifiedCount === 0) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update the collection with the new NFT');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update the collection with the new NFT');
        }
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        // Return the created NFT
        return nft[0];
    }
    catch (error) {
        // Abort the transaction on error
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
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
