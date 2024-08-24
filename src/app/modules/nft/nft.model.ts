import { model, Schema } from 'mongoose'
import { INft, INftModel } from './nft.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const nftSchema = new Schema(
  {
    nftName: { type: String, required: true },
    nftDescription: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    chainId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

nftSchema.pre('save', async function (next) {
  const nft = this as INft
  const isExist = await nftModel.findOne({ nftName: nft.nftName }).exec()

  if (isExist !== null && Object.keys(isExist).length !== 0) {
    throw new ApiError(httpStatus.CONFLICT, 'Nft with this name already exists')
  }
  next()
})

const nftModel = model<INft, INftModel>('Nft', nftSchema)
export default nftModel
