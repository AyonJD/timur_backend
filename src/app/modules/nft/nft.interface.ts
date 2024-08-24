import { Model, Types } from 'mongoose'

export interface INft {
  nftName: string
  nftDescription: string
  image: string
  owner: string
  creator: Types.ObjectId
  chainId: string
  collectionId?: string
}

export interface INftModel extends Model<INft> {
  getNftById(nftId: string): Promise<INft>
}

export interface INftFilters {
  searchTerm?: string
}
