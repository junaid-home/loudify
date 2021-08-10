import {Link} from 'react-router-dom'
import {useDrawer} from '../../store/drawer-context'

const ListItem = ({Icon, text, active, topSpace, href = '#'}) => {
  const {setOpen} = useDrawer()
  return (
    <Link to={href}>
      <div
        onClick={() => setOpen(false)}
        className={`flex items-center cursor-pointer  justify-start  px-2 mx-2 ${
          Icon && 'py-2'
        } mb-1 ${
          active
            ? 'bg-gray-600 text-gray-100 rounded-sm'
            : 'text-gray-400 hover:text-gray-100'
        } ${topSpace && 'mt-8'}`}
      >
        {Icon && <Icon className='text-lg ' />}
        <p className={`${Icon ? 'ml-2' : 'text-gray-300 hover:text-gray-500'}`}>{text}</p>
      </div>
    </Link>
  )
}

export default ListItem
