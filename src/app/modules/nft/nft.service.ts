import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { INft, INftFilters } from './nft.interface'
import nftModel from './nft.model'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { NFT_SEARCH_FIELDS } from './nft.constant'
import paginationHelper from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createNft = async (nftData: INft): Promise<INft> => {
  const nft = await nftModel.create(nftData)

  if (!nft) throw new ApiError(httpStatus.BAD_REQUEST, 'Nft creation failed')

  return nft
}

const getAllNfts = async (
  filters: INftFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<INft[]>> => {
  const { searchTerm } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: NFT_SEARCH_FIELDS.map(field => ({
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

  const result = await nftModel
    .find(whereCondition)
    .populate([{ path: 'creator' }])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)

  const total = await nftModel.countDocuments()

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

export const NftSearvice = {
  createNft,
  getAllNfts,
}
