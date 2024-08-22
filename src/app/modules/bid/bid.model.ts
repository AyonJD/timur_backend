import { model, Schema, Types } from 'mongoose'
import { IBid, IBidModel } from './bid.interface'

const bidSchema = new Schema(
  {
    bidAmount: { type: Number, required: true },
    nft: { type: Types.ObjectId, ref: 'Nft' },
  },
  {
    timestamps: true,
  },
)

const bidModel = model<IBid, IBidModel>('Bid', bidSchema)

export default bidModel
