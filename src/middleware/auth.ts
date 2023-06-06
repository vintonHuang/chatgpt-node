/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */

const auth = async (req, res, next) => {
  // TODO 需要对token进行二次的校验，防止通过接口工具直接调用
  try {
    const Authorization = req.header('Authorization')
    if (!Authorization)
      throw new Error('Error: 无访问权限 | No access rights')
    next()
  }
  catch (error) {
    res.send({ status: 401, message: error.message ?? 'Please authenticate.', data: null })
  }
}

export { auth }
