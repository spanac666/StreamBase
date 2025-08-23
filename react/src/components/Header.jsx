import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BasketIcon from './BasketIcon'
import RegistrationModal from './RegistrationModal'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  const openRegistrationModal = () => {
    setShowRegistrationModal(true)
  }

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false)
  }

  return (
    <header id="zaglavlje">
      <h1>RESTORAN ŠPANAC</h1>
      <nav id="navigacija1">
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              POČETNA
            </Link>
          </li>
          <li>
            <Link 
              to="/menu" 
              className={location.pathname === '/menu' ? 'active' : ''}
            >
              MENI
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              KONTAKT
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header-actions">
        <button className="register-btn" onClick={openRegistrationModal}>
          REGISTRACIJA
        </button>
        <BasketIcon />
      </div>
      {showRegistrationModal && (
        <RegistrationModal onClose={closeRegistrationModal} />
      )}
    </header>
  )
}

export default Header
