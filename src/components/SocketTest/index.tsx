import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../../utils/hooks/useSocket'
import messageApi from '../../utils/api/message'
import styled from '@emotion/styled'
import Input from './Input'

interface IMessage {
  message: string
  isMine: boolean
  createdAt: string
  id: number
  senderName: string
}

const SocketTest = () => {
  const { socket } = useSocket()
  const [messages, setMessages] = useState<IMessage[]>([])
  const content = useRef('') as any

  const handlerSignOut = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('nickname')
    window.location.reload()
  }

  const contentScroll = useCallback(() => {
    if (content.current) {
      content.current.scrollTo({
        top: content.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    contentScroll()
  }, [messages])

  const handleReceiveMessage = useCallback((data: IMessage) => {
    setMessages((oldMessages) => {
      return [...oldMessages, data]
    })
  }, [])

  useEffect(() => {
    socket.current.on('message', handleReceiveMessage)

    messageApi.getMessages().then((res) => {
      setMessages(res.data.messages)
    })
  }, [])

  return (
    <>
      <Wrppaer>
        <SingOut onClick={handlerSignOut}>로그아웃</SingOut>
        <ContentWrapper>
          <Content ref={content}>
            {messages.map((m: IMessage) => (
              <div key={m.id}>
                {m.senderName} : {m.message}
              </div>
            ))}
          </Content>
          <Input />
        </ContentWrapper>
      </Wrppaer>
    </>
  )
}

export default SocketTest

const Wrppaer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const SingOut = styled.div`
  margin-bottom: 5px;
  cursor: pointer;
`

const ContentWrapper = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid black;
`

const Content = styled.div`
  width: 100%;
  height: 93%;
  overflow: auto;
  border-bottom: 1px solid black;
`
