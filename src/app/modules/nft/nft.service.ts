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
import mongoose, { SortOrder } from 'mongoose'
import collectionModel from '../collection/collection.model'

const createNft = async (nftData: INft): Promise<INft> => {
  const { collectionId, ...rest } = nftData
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // Retrieve the collection
    const collection = await collectionModel
      .findById(collectionId)
      .session(session)
    if (!collection) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found')
    }

    // Extract chainId from the collection
    const { chainId } = collection

    // Create the new NFT with the chainId from the collection
    const nft = await nftModel.create([{ ...rest, chainId }], { session })
    if (!nft || nft.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'NFT creation failed')
    }

    // Update the collection to push the new NFT's _id into the nfts array
    const updateResult = await collectionModel.updateOne(
      { _id: collectionId },
      { $push: { nfts: nft[0]._id } },
      { session },
    )

    // Log the update result
    console.log('Update Result:', updateResult)

    // Check if the update was acknowledged and affected documents
    if (updateResult.acknowledged && updateResult.matchedCount > 0) {
      // Optionally, you can check the `modifiedCount` if using a compatible version
      if (updateResult.modifiedCount === 0) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Failed to update the collection with the new NFT',
        )
      }
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to update the collection with the new NFT',
      )
    }

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()

    // Return the created NFT
    return nft[0]
  } catch (error) {
    // Abort the transaction on error
    await session.abortTransaction()
    session.endSession()
    throw error
  }
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
