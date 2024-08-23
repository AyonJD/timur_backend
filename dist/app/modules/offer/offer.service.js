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
exports.OfferService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const offer_model_1 = __importDefault(require("./offer.model"));
const createOffer = (offerData) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = offer_model_1.default.create(offerData);
    if (!offer)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Offer creation failed');
    return offer;
});
const getAllOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield offer_model_1.default.find();
    if (!offers || offers.length === 0)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No offers found');
    return offers;
});
exports.OfferService = {
    createOffer,
    getAllOffers,
};
