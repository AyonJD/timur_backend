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
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const customResponse_1 = require("../../../../shared/customResponse");
const admin_service_1 = require("./admin.service");
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = req.body;
    const admin = yield admin_service_1.AdminService.createAdmin(adminData);
    const responseData = {
        message: 'Admin created successfully',
        data: admin,
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
const loginAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const admin = yield admin_service_1.AdminService.loginAdmin(userData);
    const responseData = {
        message: 'Successfully logged in',
        data: admin,
    };
    (0, customResponse_1.sendSuccessResponse)(res, responseData);
}));
exports.AdminController = {
    createAdmin,
    loginAdmin,
};
