import React from 'react'
import axios from 'axios'
import SongCard from '../song-card'
import Loader from '../loader'
import {MdSearch} from 'react-icons/md'
import {useSearch} from '../../store/search-results'

function SearchSection() {
  const [query, setQuery] = React.useState('')
  const {data, loading, setLoading, setData} = useSearch()

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

  return loading ? (
    <Loader />
  ) : (
    <div className='px-4 py-3'>
      <form
        onSubmit={handleSubmit}
        className='flex md:hidden items-center justify-between mb-5 w-full bg-gray-100 pr-3 pl-4 rounded-full py-2'
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
      <h2 className='text-3xl font-bold text-gray-100'>Search Results</h2>
      <p className='text-gray-400 mt-1'>
        Discover latest songs with a simple search query.
      </p>
      <div className='grid grid-rows-auto grid-cols-2 md:grid-rows-1 md:grid-cols-5 gap-4 my-4 mb-8'>
        {data?.map((song, index) => (
          <SongCard key={song.title + index} data={song} />
        ))}
      </div>
    </div>
  )
}

export default SearchSection
