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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const customResponse_1 = require("../../../../shared/customResponse");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield user_service_1.UserService.createUser(userData);
    const responseData = {
        message: 'User created successfully',
        data: user,
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletAddress = req.body;
    const user = yield user_service_1.UserService.loginUser(walletAddress);
    const responseData = {
        message: 'Successfully logged in',
        data: user,
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updateBody = req.body;
    const result = yield user_service_1.UserService.updateUser(userId, updateBody);
    const responseData = {
        statusCode: http_status_1.default.OK,
        data: result,
        message: 'User updated successfully',
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.UserController = {
    createUser,
    loginUser,
    updateUser,
};
