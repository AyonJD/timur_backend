"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftRoute = void 0;
const express_1 = __importDefault(require("express"));
const nft_controller_1 = require("./nft.controller");
const router = express_1.default.Router();
router.post('/', nft_controller_1.NftController.createNft);
router.get('/', nft_controller_1.NftController.getAllNfts);
exports.NftRoute = router;
