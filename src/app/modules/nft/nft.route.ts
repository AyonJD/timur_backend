import express from 'express'
import { NftController } from './nft.controller'

const router = express.Router()

router.post('/', NftController.createNft)
router.get('/', NftController.getAllNfts)

export const NftRoute = router
