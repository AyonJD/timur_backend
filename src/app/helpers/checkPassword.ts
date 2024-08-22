import bcrypt from 'bcrypt'
import { IAdmin } from '../modules/auth/admin/admin.interface'

const checkPassword = async (
  password: string,
  admin: IAdmin,
): Promise<boolean> => {
  const hashedPassword = admin.password

  // Compare the provided password with the hashed password using bcrypt's compare function
  const passwordMatch = await bcrypt.compare(password, hashedPassword)

  return passwordMatch
}

export default checkPassword
