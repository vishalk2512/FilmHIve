import { Link } from 'react-router-dom'

import './NotFound.css'
import NotAvailable from '../../assets/404.svg'

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={NotAvailable} alt='404 page not found' className='' />
      <p>The page you requested could not be found.</p>
      <Link to='/' className='not-found__home-link'>
        Go to Home
      </Link>
    </div>
  )
}

export default NotFound
