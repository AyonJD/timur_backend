import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IBid } from './bid.interface'
import bidModel from './bid.model'

const createBid = async (bidData: IBid): Promise<IBid> => {
  const bid = bidModel.create(bidData)

  if (!bid) throw new ApiError(httpStatus.BAD_REQUEST, 'Bid creation failed')

  return bid
}

const getAllBids = async (): Promise<IBid[]> => {
  const bids = await bidModel.find()

  if (!bids || bids.length === 0)
    throw new ApiError(httpStatus.NOT_FOUND, 'No bids found')

  return bids
}

export const BidSearvice = {
  createBid,
  getAllBids,
}
