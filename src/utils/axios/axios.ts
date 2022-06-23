/* eslint-disable no-restricted-globals */
import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: 'http://211.38.86.92:8091',
  timeout: 10000,
})
instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  async (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const { response } = error as any
      if (response.data.status === 401) {
        try {
          const res = await axios({
            method: 'post',
            url: `http://211.38.86.92:9091/users/signin`,
            data: {
              userName: localStorage.getItem('nickname'),
            },
          })
          localStorage.setItem('access-token', res.data.accessToken)
          window.location.reload()
        } catch (err: any) {}
      } else return Promise.reject(error)
    }
  }
)
export default instance
