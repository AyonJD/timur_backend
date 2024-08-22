"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bidSchema = new mongoose_1.Schema({
    bidAmount: { type: Number, required: true },
    nft: { type: mongoose_1.Types.ObjectId, ref: 'Nft' },
}, {
    timestamps: true,
});
const bidModel = (0, mongoose_1.model)('Bid', bidSchema);
exports.default = bidModel;
