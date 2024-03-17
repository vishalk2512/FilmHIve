import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt1 } from 'react-icons/hi'

import logo from '../../assets/logo.svg'
import './Navbar.css'

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])

  const handleClick = (path) => {
    setActiveLink(path)
    setShowMobileMenu(false)
  }

  return (
    <div className='navbar__container'>
      <div className='navbar container'>
        <div
          className='navbar__logo'
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }>
          <img src={logo} alt='filmHive' />
        </div>
        <ul className={`navbar__links ${showMobileMenu && 'show'}`}>
          <li className='navbar__link-item'>
            <Link
              to='/'
              className={activeLink === '/' ? 'active' : ''}
              onClick={() => handleClick('/')}>
              Trending
            </Link>
          </li>
          <li className='navbar__link-item'>
            <Link
              to='/movies'
              className={activeLink === '/movies' ? 'active' : ''}
              onClick={() => handleClick('/movies')}>
              Movies
            </Link>
          </li>
          <li className='navbar__link-item'>
            <Link
              to='/tvseries'
              className={activeLink === '/tvseries' ? 'active' : ''}
              onClick={() => handleClick('/tvseries')}>
              TV Series
            </Link>
          </li>
          <li className='navbar__link-item'>
            <Link
              to='/search'
              className={activeLink === '/search' ? 'active' : ''}
              onClick={() => handleClick('/search')}>
              Search
            </Link>
          </li>
        </ul>
        <HiMenuAlt1
          size={25}
          className='navbar__toogle-icon'
          onClick={() => setShowMobileMenu((show) => !show)}
        />
      </div>
    </div>
  )
}

export default Navbar
