import { Model, Types } from 'mongoose'

export interface IOffer {
  offerAmount: number
  nft: Types.ObjectId
}

export interface IOfferModel extends Model<IOffer> {
  getOfferById(offerId: string): Promise<IOffer>
}
