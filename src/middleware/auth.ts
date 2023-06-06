/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */
import fetch from 'node-fetch'
interface SendResponseOptions<T = any> {
  status: number
  message?: string
  data?: T
}
const auth = async (req, res, next) => {
  // TODO 需要对token进行二次的校验，防止通过接口工具直接调用
  try {
    const Authorization = req.header('Authorization')
    if (!Authorization)
      throw new Error('Error: 无访问权限 | No access rights')
    const urlVerify = `${process.env.CHAT_BACKEND_URL}/backend/user/verify`
    const headers = {
      'Authorization': Authorization,
      'Content-Type': 'application/json',
    }
    const useResponse = await fetch(urlVerify, { method: 'POST', headers })
    if (!useResponse.ok)
      throw new Error('校验请求失败～～～～')
    const { status, message } = await useResponse.json() as SendResponseOptions<any>
    if (status === 200)
      next()
    else
      res.send({ status, message, data: null })
  }
  catch (error) {
    res.send({ status: 401, message: error.message ?? 'Please authenticate.', data: null })
  }
}

export { auth }
