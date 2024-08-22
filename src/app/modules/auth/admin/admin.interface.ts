import { Model } from 'mongoose'

export interface IAdmin {
  walletAddress: string
  email: string
  password: string
  role?: string
}

export interface IAdminResponse {
  accessToken: string
  data: Partial<IAdmin>
}

export interface IAdminModel extends Model<IAdmin> {
  isUserExist(email: string): Promise<IAdmin | null>
}
