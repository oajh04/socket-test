/* eslint-disable no-restricted-globals */
import './App.css'
import SocketTest from './components/SocketTest'
import SignUp from './components/SignUp'
import { useEffect, useState } from 'react'

function App() {
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      setIsSignUp(true)
    } else {
      setIsSignUp(false)
    }
  }, [])

  return <>{isSignUp ? <SocketTest /> : <SignUp setIsSignUp={setIsSignUp} />}</>
}

export default App
