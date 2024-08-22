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
exports.NftController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const nft_service_1 = require("./nft.service");
const customResponse_1 = require("../../../shared/customResponse");
const pick_1 = __importDefault(require("../../../shared/pick"));
const shared_constant_1 = require("../../../constant/shared.constant");
const http_status_1 = __importDefault(require("http-status"));
const createNft = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nftData = req.body;
    const nft = yield nft_service_1.NftSearvice.createNft(nftData);
    const responseData = {
        message: 'Nft created successfully',
        data: nft,
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const getAllNfts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const paginationOption = (0, pick_1.default)(req.query, shared_constant_1.paginationFields);
    const result = yield nft_service_1.NftSearvice.getAllNfts(filters, paginationOption);
    const responseData = {
        statusCode: http_status_1.default.OK,
        meta: result.meta || {},
        data: result.data || [],
        message: 'All Nfts fetched successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.NftController = {
    createNft,
    getAllNfts,
};
