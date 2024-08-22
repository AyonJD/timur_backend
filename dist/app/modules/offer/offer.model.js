"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const offerSchema = new mongoose_1.Schema({
    offerAmount: { type: Number, required: true },
    nft: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Nft' },
}, {
    timestamps: true,
});
const offerModel = (0, mongoose_1.model)('Offer', offerSchema);
exports.default = offerModel;
