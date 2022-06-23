import styled from '@emotion/styled'
import React, { FC, useState } from 'react'
import login from '../../utils/api/login'

interface Props {
  setIsSignUp: (e: boolean) => void
}

const SignUp: FC<Props> = ({ setIsSignUp }) => {
  const [nickName, setNickName] = useState('')

  const handleSignUp = (e: any) => {
    e.preventDefault()
    login
      .postLogin(nickName)
      .then((res) => {
        localStorage.setItem('access-token', res.data.accessToken)
        window.location.reload()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <Wrapper onSubmit={handleSignUp}>
        <div>닉네임를 입력하세요</div>
        <div>
          <input
            onChange={(e) => {
              setNickName(e.target.value)
            }}
          />
          <button>완료</button>
        </div>
      </Wrapper>
    </>
  )
}

export default SignUp

const Wrapper = styled.form`
  z-index: 9999;
  width: 300px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
`
