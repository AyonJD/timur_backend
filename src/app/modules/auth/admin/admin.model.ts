import { model, Schema } from 'mongoose'
import httpStatus from 'http-status'
import ApiError from '../../../../errors/ApiError'
import { IAdmin, IAdminModel } from './admin.interface'

const adminSchema = new Schema(
  {
    walletAddress: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

adminSchema.pre('save', async function (next) {
  const admin = this as IAdmin
  const isExist = await adminModel.findOne({ email: admin.email }).exec()

  if (isExist !== null && Object.keys(isExist).length !== 0) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Admin with this email already exists',
    )
  }
  next()
})

const adminModel = model<IAdmin, IAdminModel>('Admin', adminSchema)

export default adminModel
