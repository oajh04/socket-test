/* eslint-disable import/no-anonymous-default-export */
import request from '../axios/axios'

export default {
  postLogin(nickName: string) {
    return request({
      url: '/users/signin',
      method: 'post',
      data: {
        userName: nickName,
      },
    })
  },
}
