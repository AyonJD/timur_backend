import { model, Schema } from 'mongoose'
import { ICollection, ICollectionModel } from './collection.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const collectionSchema = new Schema(
  {
    collectionName: { type: String, required: true },
    collectionSymbol: { type: String, required: true },
    collectionDescription: { type: String, required: true },
    category: { type: String, required: true },
    supply: { type: Number, required: true },
    nfts: [{ type: Schema.Types.ObjectId, ref: 'Nft', required: false }],
    floorPrice: { type: Number, required: true },
    totalVolume: { type: Number, required: true },
    chainId: { type: String, required: true },
    image: { type: String, required: true },
    nftType: { type: Number, required: true },
    specialCollection: { type: String, required: false },
  },
  {
    timestamps: true,
  },
)

// sssssssssssssssssssss======>

collectionSchema.pre('save', async function (next) {
  const collection = this as ICollection
  const isExist = await collectionModel
    .findOne({ collectionName: collection.collectionName })
    .exec()

  if (isExist !== null && Object.keys(isExist).length !== 0) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Collection with this name already exists',
    )
  }
  next()
})

const collectionModel = model<ICollection, ICollectionModel>(
  'Collection',
  collectionSchema,
)

export default collectionModel
