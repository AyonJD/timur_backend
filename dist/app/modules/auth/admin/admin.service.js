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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const admin_model_1 = __importDefault(require("./admin.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../../config"));
const hashPassword_1 = __importDefault(require("../../../helpers/hashPassword"));
const checkPassword_1 = __importDefault(require("../../../helpers/checkPassword"));
const createAdmin = (adminData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = adminData, rest = __rest(adminData, ["email", "password"]);
    const hashedPassword = yield (0, hashPassword_1.default)(password);
    const accessToken = jsonwebtoken_1.default.sign({ email, role: 'admin' }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    const admin = yield admin_model_1.default.create(Object.assign(Object.assign({}, rest), { role: 'admin', password: hashedPassword, email }));
    if (!admin)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Admin account creation failed');
    return {
        accessToken,
        data: { walletAddress: admin.walletAddress, role: 'admin' },
    };
});
const loginAdmin = (adminData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = adminData;
    if (!email)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email is missing');
    const isUserExist = yield admin_model_1.default.findOne({ email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin with this email not found');
    }
    const passwordMatch = yield (0, checkPassword_1.default)(password, isUserExist);
    if (!passwordMatch)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password');
    const accessToken = jsonwebtoken_1.default.sign({ email, role: 'admin' }, config_1.default.access_token, {
        expiresIn: '1d',
    });
    return {
        accessToken,
        data: {
            walletAddress: isUserExist.walletAddress,
            role: 'admin',
            email: isUserExist.email,
        },
    };
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
};
