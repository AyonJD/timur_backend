import express from 'express'
import { OfferController } from './offer.controller'

const router = express.Router()

router.post('/', OfferController.createOffer)

export const OfferRoute = router
