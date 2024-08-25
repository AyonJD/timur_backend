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
const nftSchema = new mongoose_1.Schema({
    nftName: { type: String, required: true },
    nftDescription: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: String, required: true },
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    chainId: { type: String, required: true },
}, {
    timestamps: true,
});
nftSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const nft = this;
        const isExist = yield nftModel.findOne({ nftName: nft.nftName }).exec();
        if (isExist !== null && Object.keys(isExist).length !== 0) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Nft with this name already exists');
        }
        next();
    });
});
const nftModel = (0, mongoose_1.model)('Nft', nftSchema);
exports.default = nftModel;
