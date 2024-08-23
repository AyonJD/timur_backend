import httpStatus from 'http-status'
import ApiError from '../../../../errors/ApiError'
import { IUser, IUserResponse } from './user.interface'
import userModel from './user.model'
import jwt from 'jsonwebtoken'
import config from '../../../../config'

const createUser = async (userData: IUser): Promise<IUserResponse> => {
  const { walletAddress } = userData

  const accessToken = jwt.sign(
    { walletAddress, role: 'user' },
    config.access_token as string,
    {
      expiresIn: '1d',
    },
  )

  const user = await userModel.create({ ...userData, role: 'user' })

  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed')

  return {
    accessToken,
    data: { walletAddress: user.walletAddress, role: 'user' },
  }
}

const loginUser = async (walletAddress: string): Promise<IUserResponse> => {
  if (!walletAddress)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wallet Address is missing')

  const user = await userModel.findOne({ walletAddress })

  if (!user)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User with this wallet address not found',
    )

  const accessToken = jwt.sign(
    { walletAddress, role: 'user' },
    config.access_token as string,
    {
      expiresIn: '1d',
    },
  )

  return {
    accessToken,
    data: { walletAddress: user.walletAddress, role: 'user' },
  }
}

const updateUser = async (
  userId: string,
  userData: Partial<IUser>,
): Promise<IUser> => {
  const isExist = await userModel.findOne({ _id: userId })
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    userData,
    { new: true },
  )

  if (!updatedUser)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'USomething went wrong to update user',
    )
  return updatedUser
}

export const UserService = {
  createUser,
  loginUser,
  updateUser,
}
