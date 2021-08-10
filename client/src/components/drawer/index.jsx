import {useRef} from 'react'
import {useDrawer} from '../../store/drawer-context'
import useOutsideClick from '../../hooks/useOutsideClick'
import {MdHome, MdSearch, MdLibraryMusic} from 'react-icons/md'
import {useLocation} from 'react-router'
import ListItem from '../list-item'

function MyDrawer() {
  const location = useLocation()
  const ref = useRef()
  const {open, setOpen} = useDrawer()
  useOutsideClick(ref, () => setOpen(false))

  return (
    <div
      className={`absolute top-0 bottom-0 left-0 z-50 bg-half-transparent w-full ${
        open ? 'block' : 'hidden'
      }`}
    >
      <div
        style={{width: '55vw'}}
        className={`min-h-screen box-border bg-gray-900 border-r-1 border-gray-700 text-gray-100 sticky top-0 bottom-0 `}
        ref={ref}
      >
        <div className=' py-2 '>
          <img src='/logo.png' alt='site logo' className='w-4/6 px-3 py-4 mx-2 mb-3' />

          <ListItem
            href='/'
            active={location.pathname === '/'}
            text='Home'
            Icon={MdHome}
          />
          <ListItem
            href='/search'
            active={location.pathname === '/search'}
            text='Search'
            Icon={MdSearch}
          />
          <ListItem
            href='/library'
            active={location.pathname === '/library'}
            text='Library'
            Icon={MdLibraryMusic}
          />
          <div className='border-b-1 border-gray-600'></div>
        </div>
      </div>
    </div>
  )
}

export default MyDrawer
