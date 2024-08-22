import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CollectionService } from './collection.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'

const createCollection = catchAsync(async (req: Request, res: Response) => {
  const collectionData = req.body
  const collection = await CollectionService.createCollection(collectionData)

  const responseData = {
    message: 'Collection created successfully',
    data: collection,
  }
  sendSuccessResponse(res, responseData)
})

const getAllCollections = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await CollectionService.getAllCollections(
    filters,
    paginationOption,
  )

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Collections fetched successfully',
  }

  sendSuccessResponse(res, responseData)
})

const getCollectionById = catchAsync(async (req: Request, res: Response) => {
  const { collectionId } = req.params
  const collection = await CollectionService.getCollectionById(collectionId)

  const responseData = {
    message: 'Collection fetched successfully',
    data: collection,
  }
  sendSuccessResponse(res, responseData)
})

const getCollectionByNftId = catchAsync(async (req: Request, res: Response) => {
  const { nftId } = req.params
  const collection = await CollectionService.getCollectionByNftId(nftId)

  const responseData = {
    message: 'Collection fetched successfully',
    data: collection,
  }
  sendSuccessResponse(res, responseData)
})

export const CollectionController = {
  createCollection,
  getAllCollections,
  getCollectionById,
  getCollectionByNftId,
}
