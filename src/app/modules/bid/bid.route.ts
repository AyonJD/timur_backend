import express from 'express'
import { BidController } from './bid.controller'

const router = express.Router()

router.post('/', BidController.createBid)
router.get('/', BidController.getAllBids)

export const BidRoute = router
