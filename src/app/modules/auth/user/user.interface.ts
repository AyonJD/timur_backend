import { Model, Types } from 'mongoose'

export interface IUser {
  walletAddress: string
  role?: string
  nfts?: Types.ObjectId[]
  bids?: Types.ObjectId[]
  offers?: Types.ObjectId[]
}

export interface IUserResponse {
  accessToken: string
  data: Partial<IUser>
}

export interface IUserModel extends Model<IUser> {
  isUserExist(walletAddress: string): Promise<IUser | null>
}
