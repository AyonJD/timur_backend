import { model, Schema } from 'mongoose'
import { IOffer, IOfferModel } from './offer.interface'

const offerSchema = new Schema(
  {
    offerAmount: { type: Number, required: true },
    nft: { type: Schema.Types.ObjectId, ref: 'Nft' },
  },
  {
    timestamps: true,
  },
)

const offerModel = model<IOffer, IOfferModel>('Offer', offerSchema)
export default offerModel
