import {MdHome, MdSearch, MdLibraryMusic} from 'react-icons/md'
import {useLocation} from 'react-router'
import ListItem from '../list-item'

function SideBar() {
  const location = useLocation()

  return (
    <div className='select-none hidden md:block bg-gray-900 w-full relative col-start-1 col-end-3  min-h-screen'>
      <div className='sticky top-0 left-0 py-2'>
        <img src='/logo.png' alt='site logo' className='w-4/6 px-3 py-4 mx-2 mb-3' />

        <ListItem href='/' active={location.pathname === '/'} text='Home' Icon={MdHome} />
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
  )
}

export default SideBar
