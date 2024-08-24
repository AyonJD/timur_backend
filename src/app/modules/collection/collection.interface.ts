import { Model, Types } from 'mongoose'

export interface ICollection {
  collectionName: string
  collectionSymbol: string
  collectionDescription: string
  category: string
  supply: number
  nfts: Types.ObjectId[]
  floorPrice: number
  totalVolume: number
}

export interface ICollectionModel extends Model<ICollection> {
  getCollectionById(collectionId: string): Promise<ICollection>
}

export interface ICollectionFilters {
  searchTerm?: string
}
