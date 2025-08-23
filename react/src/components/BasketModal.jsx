import React, { useState } from 'react'
import { useBasket } from './BasketProvider'
import PaymentModal from './PaymentModal'
import './BasketModal.css'

const BasketModal = () => {
  const { 
    basketItems, 
    removeFromBasket, 
    updateQuantity, 
    getTotalPrice, 
    clearBasket,
    setIsBasketOpen 
  } = useBasket()
  
  const [showPayment, setShowPayment] = useState(false)

  const handleClose = () => {
    setIsBasketOpen(false)
  }

  const handlePayment = () => {
    setShowPayment(true)
  }

  const handlePaymentComplete = () => {
    clearBasket()
    setShowPayment(false)
    setIsBasketOpen(false)
    alert('Hvala vam na narudžbi! Vaša pizza će biti spremna za 20-30 minuta.')
  }

  if (basketItems.length === 0) {
    return (
      <div className="basket-box show">
        <h3>Vaša košarica</h3>
        <p>Košarica je prazna</p>
        <button className="btn btn-danger" onClick={handleClose}>
          Zatvori
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="basket-box show">
        <h3>Vaša košarica</h3>
        <ul id="basket-list">
          {basketItems.map(item => (
            <li key={item.id} className="basket-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price}€</span>
              </div>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromBasket(item.id)}
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="basket-total">
          <strong>Ukupno: {getTotalPrice().toFixed(2)}€</strong>
        </div>
        <div className="basket-actions">
          <button className="btn btn-primary" onClick={handlePayment}>
            Plaćanje
          </button>
          <button className="btn btn-danger" onClick={handleClose}>
            Zatvori
          </button>
        </div>
      </div>
      {showPayment && (
        <PaymentModal 
          total={getTotalPrice()}
          onClose={() => setShowPayment(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </>
  )
}

export default BasketModal
