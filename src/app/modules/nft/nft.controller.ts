import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { NftSearvice } from './nft.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'

const createNft = catchAsync(async (req: Request, res: Response) => {
  const nftData = req.body
  const nft = await NftSearvice.createNft(nftData)

  const responseData = {
    message: 'Nft created successfully',
    data: nft,
  }
  sendSuccessResponse(res, responseData)
})

const getAllNfts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await NftSearvice.getAllNfts(filters, paginationOption)

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Nfts fetched successfully',
  }

  sendSuccessResponse(res, responseData)
})

export const NftController = {
  createNft,
  getAllNfts,
}
