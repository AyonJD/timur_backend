import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { BidSearvice } from './bid.service'

const createBid = catchAsync(async (req: Request, res: Response) => {
  const bidData = req.body
  const bid = await BidSearvice.createBid(bidData)

  const responseData = {
    message: 'Bid created successfully',
    data: bid,
  }

  sendSuccessResponse(res, responseData)
})

export const BidController = {
  createBid,
}
