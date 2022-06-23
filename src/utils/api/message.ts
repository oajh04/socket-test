/* eslint-disable import/no-anonymous-default-export */
import request from '../axios/axios'

export default {
  getMessages() {
    return request({
      url: '/messages',
      method: 'get',
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`,
      },
    })
  },
}
