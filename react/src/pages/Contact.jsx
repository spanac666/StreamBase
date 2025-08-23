import React, { useState, useEffect } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    ime: '',
    email: '',
    poruka: ''
  })
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = [
    '/slike/POZADINSKA SLIKA 11.jpeg',
    '/slike/slika-1.jpg',
    '/slike/slika-2.jpg',
    '/slike/slika-3.jpg',
    '/slike/slika-4.jpg',
    '/slike/slika-5.jpg',
    '/slike/slika-6.jpg',
    '/slike/slika-7.jpg',
    '/slike/slika-8.jpg',
    '/slike/slika-9.jpg',
    '/slike/slika-10.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [images.length])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Hvala ${formData.ime}! Vaša poruka je poslana.`)
    setFormData({ ime: '', email: '', poruka: '' })
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="main-contact">
      <div className="contact-header">
        <h1>Galerija</h1>
        <p>Pogledajte naš restoran i atmosferu!</p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <h2>Kontakt informacije</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="ime">Ime i prezime:</label>
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
              <label htmlFor="email">Email adresa:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="poruka">Vaša poruka:</label>
              <textarea
                id="poruka"
                name="poruka"
                rows="6"
                value={formData.poruka}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Pošalji poruku
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <h2>Informacije</h2>
          <div className="contact-info">
            <div className="info-item">
              <h3>📍 Adresa</h3>
              <p>Glavna ulica 123<br />Grad, Država</p>
            </div>
            
            <div className="info-item">
              <h3>📞 Telefon</h3>
              <p>+387 XX XXX XXX</p>
            </div>
            
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>info@restoran.com</p>
            </div>
            
            <div className="info-item">
              <h3>🕒 Radno vreme</h3>
              <p>Pon - Ned: 10:00 - 23:00</p>
            </div>
          </div>
        </div>

        <div className="gallery-section">
          <h2>GALERIJA</h2>
          <div className="image-slider">
            <button className="slider-btn prev" onClick={prevImage}>❮</button>
            <div className="slider-container">
              <img 
                src={images[currentImageIndex]} 
                alt={`Desert ${currentImageIndex + 1}`}
                className="slider-image"
              />
            </div>
            <button className="slider-btn next" onClick={nextImage}>❯</button>
          </div>
          <div className="slider-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
