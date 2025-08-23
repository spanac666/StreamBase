import React, { useState } from 'react'
import './Home.css'

const Home = () => {
  const [showMap, setShowMap] = useState(false)
  const [formData, setFormData] = useState({
    ime: '',
    poruka: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Hvala ${formData.ime}! Vaša poruka je poslana: "${formData.poruka}"`)
    setFormData({ ime: '', poruka: '' })
  }

  return (
    <div className="main-about">
      <div className="hero-section">
        <img 
          src="/slike/logo.jpeg" 
          alt="Restaurant Logo" 
          className="hero-logo"
        />
        <h1>Dobrodošli u naš restoran!</h1>
        <p className="hero-description">Uživajte u najboljoj hrani u gradu. Svežali sastojci, tradicionalni recepti i savršen ukus!</p>
        <button className="hero-btn" onClick={() => window.location.href = '/menu'}>
          Pogledaj meni
        </button>
      </div>

      <div className="content-sections">
        <div className="map-container">
          <div className="map-trigger">
            <h3>Naša lokacija</h3>
            <p>Hover ovde da vidite mapu</p>
          </div>
          <div 
            className="map-overlay"
            onMouseEnter={() => setShowMap(true)}
            onMouseLeave={() => setShowMap(false)}
          >
            {showMap ? (
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.234567890123!2d15.8947234!3d45.8181234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zU2FudGnEh2V2YSA5LCAxMDI5OCBPYm9yb3ZvIEJpc3RyYW5za28sIENyb2F0aWE!5e0!3m2!1sen!2s!4v1625234567890"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant Location - Šantićeva 9, 10298 Oborovo Bistransko, Croatia"
                ></iframe>
              </div>
            ) : (
              <div className="map-placeholder">
                <p>🗺️ Hover da vidite mapu restorana</p>
                <p className="address-text">Šantićeva 9, 10298 Oborovo Bistransko, Croatia</p>
              </div>
            )}
          </div>
        </div>

        <div className="registracija">
        <h2>Kontaktiraj nas</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ime">Ime:</label>
            <input
              type="text"
              id="ime"
              name="ime"
              value={formData.ime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="poruka">Poruka:</label>
            <textarea
              id="poruka"
              name="poruka"
              rows="4"
              value={formData.poruka}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" id="submit" className="btn btn-primary">
            Pošalji
          </button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Home
