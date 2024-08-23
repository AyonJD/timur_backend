import httpStatus from 'http-status'
import ApiError from '../../../../errors/ApiError'
import { IAdmin, IAdminResponse } from './admin.interface'
import adminModel from './admin.model'
import jwt from 'jsonwebtoken'
import config from '../../../../config'
import hashPassword from '../../../helpers/hashPassword'
import checkPassword from '../../../helpers/checkPassword'

const createAdmin = async (adminData: IAdmin): Promise<IAdminResponse> => {
  const { email, password, ...rest } = adminData

  const hashedPassword = await hashPassword(password)

  const accessToken = jwt.sign(
    { email, role: 'admin' },
    config.access_token as string,
    {
      expiresIn: '1d',
    },
  )

  const admin = await adminModel.create({
    ...rest,
    role: 'admin',
    password: hashedPassword,
    email,
  })

  if (!admin)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin account creation failed')

  return {
    accessToken,
    data: { walletAddress: admin.walletAddress, role: 'admin' },
  }
}

const loginAdmin = async (adminData: {
  email: string
  password: string
}): Promise<IAdminResponse> => {
  const { email, password } = adminData
  if (!email) throw new ApiError(httpStatus.BAD_REQUEST, 'Email is missing')

  const isUserExist = await adminModel.findOne({ email })
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin with this email not found')
  }

  const passwordMatch = await checkPassword(password, isUserExist)

  if (!passwordMatch)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password')

  const accessToken = jwt.sign(
    { email, role: 'admin' },
    config.access_token as string,
    {
      expiresIn: '1d',
    },
  )

  return {
    accessToken,
    data: {
      walletAddress: isUserExist.walletAddress,
      role: 'admin',
      email: isUserExist.email,
    },
  }
}

export const AdminService = {
  createAdmin,
  loginAdmin,
}
