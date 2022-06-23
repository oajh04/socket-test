import { useEffect, useRef } from 'react'
import socketIO from 'socket.io-client'

const ENDPOINT = `http://211.38.86.92:8092/?EIO
=2&transport=websocket&authorization=${localStorage.getItem('access-token')}`

export const useSocket = () => {
  const socket = useRef<any>()

  useEffect(() => {
    socket.current = socketIO.connect(ENDPOINT, {
      transports: ['websocket'],
    })

    socket.current.on('connect', () => {
      console.log('연결 성공')
    })

    socket.current.on('disconnect', () => {
      console.log('연결 해제')
    })

    return () => socket.current.disconnect()
  }, [])

  return { socket } as const
}
