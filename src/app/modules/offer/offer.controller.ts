import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { OfferService } from './offer.service'

const createOffer = catchAsync(async (req: Request, res: Response) => {
  const offerData = req.body
  const offer = await OfferService.createOffer(offerData)

  const responseData = {
    message: 'Offer created successfully',
    data: offer,
  }

  sendSuccessResponse(res, responseData)
})

export const OfferController = {
  createOffer,
}
