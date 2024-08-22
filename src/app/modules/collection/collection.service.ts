import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ICollection, ICollectionFilters } from './collection.interface'
import collectionModel from './collection.model'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { COLLECTION_SEARCH_FIELDS } from './collection.constant'
import paginationHelper from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createCollection = async (
  collectionData: ICollection,
): Promise<ICollection> => {
  const collection = collectionModel.create(collectionData)

  if (!collection)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Collection creation failed')

  return collection
}

const getAllCollections = async (
  filters: ICollectionFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<ICollection[]>> => {
  const { searchTerm } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: COLLECTION_SEARCH_FIELDS.map(field => ({
        [field]: new RegExp(searchTerm, 'i'),
      })),
    })
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await collectionModel
    .find(whereCondition)
    .populate('nfts')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)

  const total = await collectionModel.countDocuments()

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }

  return responseData
}

const getCollectionById = async (
  collectionId: string,
): Promise<ICollection> => {
  const collection = await collectionModel
    .findById(collectionId)
    .populate('nfts')

  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found')
  }
  return collection
}

const getCollectionByNftId = async (nftId: string): Promise<ICollection> => {
  const collection = await collectionModel.findOne({ nfts: nftId })

  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found')
  }
  return collection
}

export const CollectionService = {
  createCollection,
  getAllCollections,
  getCollectionById,
  getCollectionByNftId,
}
