import { model, Schema } from 'mongoose'
import { IUser, IUserModel } from './user.interface'
import ApiError from '../../../../errors/ApiError'
import httpStatus from 'http-status'

const userSchema = new Schema(
  {
    walletAddress: { type: String, required: true },
    role: { type: String, required: true },
    nfts: [{ type: Schema.Types.ObjectId, ref: 'Nft', required: false }],
    bids: [{ type: Schema.Types.ObjectId, ref: 'Bid', required: false }],
    offers: [{ type: Schema.Types.ObjectId, ref: 'Offer', required: false }],
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  const user = this as IUser
  const isExist = await userModel
    .findOne({ walletAddress: user.walletAddress })
    .exec()

  if (isExist !== null && Object.keys(isExist).length !== 0) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User with this wallet address already exists',
    )
  }
  next()
})

const userModel = model<IUser, IUserModel>('User', userSchema)

export default userModel
