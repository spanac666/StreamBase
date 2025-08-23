import React, { useState } from 'react'
import './PaymentModal.css'

const PaymentModal = ({ total, onClose, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
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
    
    // Basic validation
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Molimo unesite sve potrebne podatke.')
      return
    }

    // Simulate payment processing
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <div className="modal show">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Podaci za dostavu i plaćanje</h2>
        <div className="payment-label">
          Ukupno za naplatu: {total.toFixed(2)}€
        </div>
        
        <form onSubmit={handleSubmit} id="pay-form">
          <div className="form-section">
            <h3>Podaci za dostavu</h3>
            <input
              type="text"
              name="name"
              placeholder="Ime i prezime"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Adresa za dostavu"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Broj telefona"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-section">
            <h3>Podaci za plaćanje</h3>
            <input
              type="text"
              name="cardNumber"
              placeholder="Broj kartice (xxxx-xxxx-xxxx-xxxx)"
              value={formData.cardNumber}
              onChange={handleInputChange}
              pattern="[0-9\-\s]*"
              maxLength="19"
            />
            <div className="card-details">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                pattern="[0-9/]*"
                maxLength="5"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                pattern="[0-9]*"
                maxLength="3"
              />
            </div>
          </div>

          <div className="payment-options">
            <p><strong>Načini plaćanja:</strong></p>
            <div className="payment-methods">
              <label>
                <input type="radio" name="paymentMethod" value="card" defaultChecked />
                Kartica
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="cash" />
                Gotovina pri dostavi
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Završi narudžbu
            </button>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Odustani
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentModal
