import { Model, Types } from 'mongoose'

export interface IBid {
  bidAmount: number
  nft: Types.ObjectId
}

export interface IBidModel extends Model<IBid> {
  getBidById(bidId: string): Promise<IBid>
}
