import { Request, Response } from 'express'
import catchAsync from '../../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../../shared/customResponse'
import { AdminService } from './admin.service'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminData = req.body
  const admin = await AdminService.createAdmin(adminData)

  const responseData = {
    message: 'Admin created successfully',
    data: admin,
  }

  sendSuccessResponse(res, responseData)
})

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body

  const admin = await AdminService.loginAdmin(userData)

  const responseData = {
    message: 'Successfully logged in',
    data: admin,
  }

  sendSuccessResponse(res, responseData)
})

export const AdminController = {
  createAdmin,
  loginAdmin,
}
