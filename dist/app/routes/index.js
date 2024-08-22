"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nft_route_1 = require("../modules/nft/nft.route");
const collection_route_1 = require("../modules/collection/collection.route");
const bid_route_1 = require("../modules/bid/bid.route");
const offer_route_1 = require("../modules/offer/offer.route");
const user_route_1 = require("../modules/auth/user/user.route");
const admin_route_1 = require("../modules/auth/admin/admin.route");
const router = express_1.default.Router();
const routes = [
    {
        path: '/nft',
        route: nft_route_1.NftRoute,
    },
    {
        path: '/collections',
        route: collection_route_1.CollectionRoute,
    },
    {
        path: '/bids',
        route: bid_route_1.BidRoute,
    },
    {
        path: '/offers',
        route: offer_route_1.OfferRoute,
    },
    {
        path: '/auth/user',
        route: user_route_1.UserRoute,
    },
    {
        path: '/auth/admin',
        route: admin_route_1.AdminRoute,
    },
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
