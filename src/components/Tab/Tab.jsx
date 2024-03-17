import { useEffect, useState } from 'react'
import './Tab.css'

const Tab = ({ item1, item2, handleTab }) => {
  const [active, setActive] = useState(item1)

  useEffect(() => {
    handleTab(active)
  }, [])

  return (
    <div className='tab'>
      <button
        className={`tab__item ${active === item1 ? 'active' : ''}`}
        onClick={() => {
          setActive(item1)
          handleTab(item1)
        }}>
        {item1}
      </button>
      <button
        className={`tab__item ${active === item2 ? 'active' : ''}`}
        onClick={() => {
          setActive(item2)
          handleTab(item2)
        }}>
        {item2}
      </button>
    </div>
  )
}

export default Tab
