"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidRoute = void 0;
const express_1 = __importDefault(require("express"));
const bid_controller_1 = require("./bid.controller");
const router = express_1.default.Router();
router.post('/', bid_controller_1.BidController.createBid);
exports.BidRoute = router;
