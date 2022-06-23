import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useSocket } from '../../utils/hooks/useSocket'

const Input = () => {
  const { socket } = useSocket()
  const [message, setMessage] = useState('')

  const onSendMessage = (e: any) => {
    e.preventDefault()
    if (message !== '') {
      socket.current.emit('message', {
        content: message,
      })
      setMessage('')
    } else {
      alert('빈칸을 다 채워주세요')
    }
  }

  return (
    <>
      <form onSubmit={onSendMessage}>
        <InputStyle
          value={message}
          onChange={(e: any) => {
            setMessage(e.target.value)
          }}
        />
        <button>보내기</button>
      </form>
    </>
  )
}

export default Input

const InputStyle = styled.input`
  width: 200px;
  height: 7%;
  padding: 8px;
  outline: none;
  border: none;
`
