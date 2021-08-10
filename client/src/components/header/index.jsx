import * as React from 'react'
import axios from 'axios'
import {useLocation, useHistory} from 'react-router-dom'
import {useDrawer} from '../../store/drawer-context'
import {useSearch} from '../../store/search-results'
import {useAuth} from '../../store/auth-context'
import {
  MdPerson,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdSearch,
  MdDehaze,
} from 'react-icons/md'

function Header() {
  const {open, setOpen} = useDrawer()
  const {setData, setLoading} = useSearch()
  const location = useLocation()
  const history = useHistory()
  const {user} = useAuth()

  const [query, setQuery] = React.useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setLoading(true)

    if (query.length) {
      axios.post('/search', {query}).then((response) => {
        setData(response.data.data)
        setLoading(false)
      })
    }
  }

  return (
    <div className='flex sticky top-0 z-20 bg-gray-700 items-center justify-between py-3 px-4 '>
      <div className='flex items-center justify-start'>
        <MdDehaze
          onClick={() => setOpen(!open)}
          className='icon text-3xl mr-6 md:hidden block'
        />
        <span className='bg-gray-800 cursor-pointer mr-2 text-gray-400 inline-block text-3xl rounded-full'>
          <MdKeyboardArrowLeft onClick={() => history.goBack()} className='p-1' />
        </span>
        <span className='bg-gray-800  cursor-pointer text-gray-400 inline-block text-3xl rounded-full'>
          <MdKeyboardArrowRight onClick={() => history.goForward()} className='p-1' />
        </span>
        {location.pathname === '/search' && (
          <form
            onSubmit={handleSubmit}
            className='hidden md:flex items-center justify-between ml-8 w-96 bg-gray-100 pr-3 pl-4 rounded-full py-2'
          >
            <input
              type='text'
              placeholder='Search...'
              onChange={(e) => setQuery(e.target.value)}
              className='bg-transparent w-full outline-none text-sm font-normal text-gray-800'
            />
            <button type='submit'>
              <MdSearch className='icon' />
            </button>
          </form>
        )}
      </div>
      <div className='p-1 bg-gray-600 rounded-full flex cursor-pointer'>
        <span className='bg-gray-800 text-gray-400 inline-block text-3xl rounded-full'>
          <MdPerson className='p-1' />
        </span>
        <h2 className='font-semibold text-gray-100 text-lg ml-2'>{user.name}</h2>
        <span className='text-gray-400 inline-block text-3xl'>
          <MdKeyboardArrowDown className='p-1' />
        </span>
      </div>
    </div>
  )
}

export default Header
