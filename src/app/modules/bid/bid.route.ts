import express from 'express'
import { BidController } from './bid.controller'

const router = express.Router()

router.post('/', BidController.createBid)

export const BidRoute = router
