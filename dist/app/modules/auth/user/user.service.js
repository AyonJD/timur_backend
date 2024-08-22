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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../../config"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletAddress } = userData;
    const accessToken = jsonwebtoken_1.default.sign({ walletAddress, role: 'user' }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    const user = yield user_model_1.default.create(Object.assign(Object.assign({}, userData), { role: 'user' }));
    if (!user)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User creation failed');
    return {
        accessToken,
        data: { walletAddress: user.walletAddress, role: 'user' },
    };
});
const loginUser = (walletAddress) => __awaiter(void 0, void 0, void 0, function* () {
    if (!walletAddress)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Wallet Address is missing');
    const user = yield user_model_1.default.isUserExist(walletAddress);
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User with this wallet address not found');
    const accessToken = jsonwebtoken_1.default.sign({ walletAddress, role: 'user' }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    return {
        accessToken,
        data: { walletAddress: user.walletAddress, role: 'user' },
    };
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: userId });
    if (!isExist)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    const updatedUser = yield user_model_1.default.findOneAndUpdate({ _id: userId }, userData, { new: true });
    if (!updatedUser)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'USomething went wrong to update user');
    return updatedUser;
});
exports.UserService = {
    createUser,
    loginUser,
    updateUser,
};
