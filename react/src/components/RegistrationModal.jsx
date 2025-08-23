import React, { useState } from 'react'
import './RegistrationModal.css'

const RegistrationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    telefon: '',
    lozinka: '',
    potvrdaLozinke: '',
    adresa: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.ime.trim()) newErrors.ime = 'Ime je obavezno'
    if (!formData.prezime.trim()) newErrors.prezime = 'Prezime je obavezno'
    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email nije valjan'
    }
    if (!formData.telefon.trim()) newErrors.telefon = 'Telefon je obavezan'
    if (!formData.lozinka) {
      newErrors.lozinka = 'Lozinka je obavezna'
    } else if (formData.lozinka.length < 6) {
      newErrors.lozinka = 'Lozinka mora imati najmanje 6 karaktera'
    }
    if (formData.lozinka !== formData.potvrdaLozinke) {
      newErrors.potvrdaLozinke = 'Lozinke se ne poklapaju'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      alert(`Dobrodošli ${formData.ime} ${formData.prezime}! Uspješno ste se registrirali.`)
      setFormData({
        ime: '',
        prezime: '',
        email: '',
        telefon: '',
        lozinka: '',
        potvrdaLozinke: '',
        adresa: ''
      })
      onClose()
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="registration-modal">
        <div className="modal-header">
          <h2>🍽️ Registracija</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ime">Ime *</label>
              <input
                type="text"
                id="ime"
                name="ime"
                value={formData.ime}
                onChange={handleInputChange}
                className={errors.ime ? 'error' : ''}
                placeholder="Vaše ime"
              />
              {errors.ime && <span className="error-message">{errors.ime}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="prezime">Prezime *</label>
              <input
                type="text"
                id="prezime"
                name="prezime"
                value={formData.prezime}
                onChange={handleInputChange}
                className={errors.prezime ? 'error' : ''}
                placeholder="Vaše prezime"
              />
              {errors.prezime && <span className="error-message">{errors.prezime}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="vas.email@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefon">Telefon *</label>
            <input
              type="tel"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleInputChange}
              className={errors.telefon ? 'error' : ''}
              placeholder="+385 XX XXX XXX"
            />
            {errors.telefon && <span className="error-message">{errors.telefon}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="adresa">Adresa</label>
            <input
              type="text"
              id="adresa"
              name="adresa"
              value={formData.adresa}
              onChange={handleInputChange}
              placeholder="Vaša adresa (opciono)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lozinka">Lozinka *</label>
              <input
                type="password"
                id="lozinka"
                name="lozinka"
                value={formData.lozinka}
                onChange={handleInputChange}
                className={errors.lozinka ? 'error' : ''}
                placeholder="Minimalno 6 karaktera"
              />
              {errors.lozinka && <span className="error-message">{errors.lozinka}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="potvrdaLozinke">Potvrda lozinke *</label>
              <input
                type="password"
                id="potvrdaLozinke"
                name="potvrdaLozinke"
                value={formData.potvrdaLozinke}
                onChange={handleInputChange}
                className={errors.potvrdaLozinke ? 'error' : ''}
                placeholder="Ponovite lozinku"
              />
              {errors.potvrdaLozinke && <span className="error-message">{errors.potvrdaLozinke}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Otkaži
            </button>
            <button type="submit" className="btn-register">
              Registriraj se
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationModal
