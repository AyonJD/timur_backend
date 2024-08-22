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

const getAllOffers = async (): Promise<IOffer[]> => {
  const offers = await offerModel.find()

  if (!offers || offers.length === 0)
    throw new ApiError(httpStatus.NOT_FOUND, 'No offers found')

  return offers
}

export const OfferService = {
  createOffer,
  getAllOffers,
}
