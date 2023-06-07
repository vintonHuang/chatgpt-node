/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */
import fetch from 'node-fetch'
interface SendResponseOptions<T = any> {
  type: 200 | 400
  message?: string
  data?: T
}

export function sendResponse<T>(options: SendResponseOptions<T>) {
  if (options.type === 200) {
    return Promise.resolve({
      message: options.message ?? null,
      data: options.data ?? null,
      status: options.type,
    })
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    message: options.message ?? 400,
    data: options.data ?? null,
    status: options.type,
  })
}
// 用户调用聊天，次数加一
export function fetchGuestCount(req) {
  const Authorization = req.header('Authorization')
  const url = `${process.env.CHAT_BACKEND_URL}/backend/user/incr_tmp_count`
  const headers = {
    'Authorization': Authorization,
    'Content-Type': 'application/json',
  }
  fetch(url, { method: 'POST', headers })
}
