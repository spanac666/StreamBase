import React from 'react'
import { useBasket } from './BasketProvider'
import BasketModal from './BasketModal'
import './BasketIcon.css'

const BasketIcon = () => {
  const { getTotalItems, toggleBasket, isBasketOpen } = useBasket()

  return (
    <>
      <div className="basket" onClick={toggleBasket}>
        <span className="basket-icon">🛒</span>
        <span className="basket-count">{getTotalItems()}</span>
      </div>
      {isBasketOpen && <BasketModal />}
    </>
  )
}

export default BasketIcon
