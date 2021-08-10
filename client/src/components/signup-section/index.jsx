import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useAuth} from '../../store/auth-context'

function Singup() {
  const [name, setName] = React.useState('')
  const [avatar, setAvatar] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(false)
  const {setUser, setToken} = useAuth()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setError(false)

    axios.post('/user/create', {name, avatar, email, password}).then((response) => {
      if (response.data.user && response.data.token) {
        setUser(response.data.user)
        setToken(response.data.token)
      }
      if (response.data.message) {
        setError(true)
      }
    })
  }

  return (
    <div className='ml-auto mr-auto max-w-4xl bg-gray-700 mt-20  rounded-lg'>
      <div className='p-2 pt-6 pb-4 md:p-10 grid grid-cols-1 md:grid-cols-2'>
        <div className='px-3 mt-auto mb-auto'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-3xl mb-7 font-bold text-gray-200'>
              <span className='text-green'>Signup</span> your account.
            </h2>
            {error && (
              <span className='text-lg font-semibold text-red-700'>
                Some of the inputs are not valid!
              </span>
            )}
            <div className='flex items-center justify-between mb-5 w-full bg-gray-100 pr-3 pl-4 rounded-full py-2'>
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className='bg-transparent w-full outline-none text-sm font-normal text-gray-800'
              />
            </div>
            <div className='flex items-center justify-between mb-5 w-full bg-gray-100 pr-3 pl-4 rounded-full py-2'>
              <input
                type='url'
                onChange={(e) => setAvatar(e.target.value)}
                placeholder='Avatar Url'
                className='bg-transparent w-full outline-none text-sm font-normal text-gray-800'
              />
            </div>
            <div className='flex items-center justify-between mb-5 w-full bg-gray-100 pr-3 pl-4 rounded-full py-2'>
              <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address'
                className='bg-transparent w-full outline-none text-sm font-normal text-gray-800'
              />
            </div>
            <div className='flex items-center justify-between mb-5 w-full bg-gray-100 pr-3 pl-4 rounded-full py-2'>
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='bg-transparent w-full outline-none text-sm font-normal text-gray-800'
              />
            </div>
            <button
              type='submit'
              className='py-2 px-4 bg-gray-900 uppercase rounded font-bold text-gray-100'
            >
              Sign up
            </button>
          </form>
          <h2 className='text-lg mb-5 font-semibold mt-4 text-gray-200'>
            Already have an account?{' '}
            <Link to='/login'>
              <span className='text-green'>Log in</span>
            </Link>
          </h2>
        </div>
        <div className='w-full hidden md:block'>
          <img className='w-full' src='/login.svg' alt='login' />
        </div>
      </div>
    </div>
  )
}

export default Singup
