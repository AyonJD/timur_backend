"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRoute = void 0;
const express_1 = __importDefault(require("express"));
const collection_controller_1 = require("./collection.controller");
const router = express_1.default.Router();
router.post('/', collection_controller_1.CollectionController.createCollection);
router.get('/', collection_controller_1.CollectionController.getAllCollections);
router.get('/collection/special/:specialCollectionId', collection_controller_1.CollectionController.getCollectionsBySpecialCollection);
router.get('/collection/chain/:chainId', collection_controller_1.CollectionController.getCollectionsByChainId);
router.get('/collection/:nftId', collection_controller_1.CollectionController.getCollectionByNftId);
router.get('/:collectionId', collection_controller_1.CollectionController.getCollectionById);
exports.CollectionRoute = router;
