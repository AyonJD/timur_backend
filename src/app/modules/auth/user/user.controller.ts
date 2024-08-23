import { Request, Response } from 'express'
import catchAsync from '../../../../shared/catchAsync'
import { UserService } from './user.service'
import { sendSuccessResponse } from '../../../../shared/customResponse'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await UserService.createUser(userData)

  const responseData = {
    message: 'User created successfully',
    data: user,
  }

  sendSuccessResponse(res, responseData)
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { walletAddress } = req.body

  console.log(walletAddress)

  const user = await UserService.loginUser(walletAddress)

  const responseData = {
    message: 'Successfully logged in',
    data: user,
  }

  sendSuccessResponse(res, responseData)
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const updateBody = req.body

  const result = await UserService.updateUser(userId, updateBody)

  const responseData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'User updated successfully',
  }

  sendSuccessResponse(res, responseData)
})

export const UserController = {
  createUser,
  loginUser,
  updateUser,
}
