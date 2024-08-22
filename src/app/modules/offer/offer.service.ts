import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import offerModel from './offer.model'
import { IOffer } from './offer.interface'

const createOffer = async (offerData: IOffer): Promise<IOffer> => {
  const offer = offerModel.create(offerData)

  if (!offer)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offer creation failed')

  return offer
}

export const OfferService = {
  createOffer,
}
