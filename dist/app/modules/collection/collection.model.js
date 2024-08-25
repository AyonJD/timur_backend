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
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const collectionSchema = new mongoose_1.Schema({
    collectionName: { type: String, required: true },
    collectionSymbol: { type: String, required: true },
    collectionDescription: { type: String, required: true },
    category: { type: String, required: true },
    supply: { type: Number, required: true },
    nfts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Nft', required: false }],
    floorPrice: { type: Number, required: true },
    totalVolume: { type: Number, required: true },
    chainId: { type: String, required: true },
    image: { type: String, required: true },
    nftType: { type: Number, required: true },
    specialCollection: { type: String, required: false },
}, {
    timestamps: true,
});
// sssssssssssssssssssss======>
collectionSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = this;
        const isExist = yield collectionModel
            .findOne({ collectionName: collection.collectionName })
            .exec();
        if (isExist !== null && Object.keys(isExist).length !== 0) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Collection with this name already exists');
        }
        next();
    });
});
const collectionModel = (0, mongoose_1.model)('Collection', collectionSchema);
exports.default = collectionModel;
