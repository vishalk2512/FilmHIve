import axios from 'axios'
import { useEffect, useState } from 'react'

import './Trending.css'
import { Tab, Card, Pagination, Loader } from '../../components'

const apiKey = import.meta.env.VITE_API_KEY

const Trending = () => {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [timeWindow, setTimeWindow] = useState('day')
  const [mediaType, setmediaType] = useState('movie')

  function handleTab(currentTab) {
    switch (currentTab) {
      case 'Today':
        setTimeWindow('day')
        setPage(1)
        break
      case 'This Week':
        setTimeWindow('week')
        setPage(1)
        break
      case 'Movies':
        setmediaType('movie')
        setPage(1)
        break
      case 'TV Series':
        setmediaType('tv')
        setPage(1)
        break
      default:
        setTimeWindow('day')
        setmediaType('movie')
    }
  }

  async function fetchTrending() {
    try {
      setError(null)
      setLoading(true)
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=${apiKey}&language=en-Us&page=${page}`
      )
      setDatas(data.results)
      setTotalPage(data.total_pages)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Not Found!')
    }
  }

  useEffect(() => {
    fetchTrending()
  }, [page, mediaType, timeWindow])

  return (
    <div className='trending'>
      <div className='trending__header'>
        <h1 className='trending__title'>Trending</h1>
        <Tab item1='Today' item2='This Week' handleTab={handleTab} />
        <Tab item1='Movies' item2='TV Series' handleTab={handleTab} />
      </div>

      {loading && <Loader />}
      {error && <p className='error--msg'>{error}</p>}
      {!loading && !error && (
        <div className='card__conatiner'>
          {datas.map((data) => {
            return (
              <Card
                key={data.id}
                id={data.id}
                poster_path={data.poster_path}
                title={mediaType === 'tv' ? data.name : data.title}
                media_type={data.media_type}
                release_date={
                  mediaType === 'tv' ? data.first_air_date : data.release_date
                }
                vote_average={data.vote_average}
                vote_count={data.vote_count}
              />
            )
          })}
        </div>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default Trending
