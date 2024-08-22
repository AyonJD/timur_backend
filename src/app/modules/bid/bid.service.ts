import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IBid } from './bid.interface'
import bidModel from './bid.model'

const createBid = async (bidData: IBid): Promise<IBid> => {
  const bid = bidModel.create(bidData)

  if (!bid) throw new ApiError(httpStatus.BAD_REQUEST, 'Bid creation failed')

  return bid
}

export const BidSearvice = {
  createBid,
}
