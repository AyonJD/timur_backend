import express from 'express'
import { CollectionController } from './collection.controller'

const router = express.Router()

router.post('/', CollectionController.createCollection)
router.get('/', CollectionController.getAllCollections)
router.get(
  '/collection/special/:specialCollectionId',
  CollectionController.getCollectionsBySpecialCollection,
)
router.get(
  '/collection/chain/:chainId',
  CollectionController.getCollectionsByChainId,
)
router.get('/collection/:nftId', CollectionController.getCollectionByNftId)
router.get('/:collectionId', CollectionController.getCollectionById)

export const CollectionRoute = router
