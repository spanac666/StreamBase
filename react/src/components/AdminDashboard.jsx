import React, { useState, useEffect } from 'react'
import './AdminDashboard.css'

// Import JSON data (in real app, these would be API calls)
import menuDataJSON from '../data/menuData.json'
import adminUsersJSON from '../data/adminUsers.json'
import ordersJSON from '../data/orders.json'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu')
  const [menuData, setMenuData] = useState(menuDataJSON)
  const [orders, setOrders] = useState(ordersJSON.orders)
  const [users, setUsers] = useState(adminUsersJSON.users)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  // Login function
  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find(u => 
      u.username === loginForm.username && 
      u.password === loginForm.password && 
      u.active
    )
    
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
      setLoginForm({ username: '', password: '' })
    } else {
      alert('Neispravni podaci za prijavu!')
    }
  }

  // Logout function
  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  // Menu management functions
  const updateMenuItem = (categoryKey, itemId, updatedItem) => {
    setMenuData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [categoryKey]: {
          ...prev.categories[categoryKey],
          items: prev.categories[categoryKey].items.map(item =>
            item.id === itemId ? { ...item, ...updatedItem } : item
          )
        }
      }
    }))
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  // Login form if not logged in
  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Prijava</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Korisničko ime:</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Lozinka:</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Prijaviť se</button>
          </form>
          <div className="demo-credentials">
            <p><strong>Demo podaci:</strong></p>
            <p>Admin: admin / admin123</p>
            <p>Manager: manager / manager123</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard - {menuData.restaurant.name}</h1>
        <div className="admin-user-info">
          <span>Dobrodošli, {currentUser.username} ({currentUser.role})</span>
          <button onClick={handleLogout} className="btn btn-danger">Odjava</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          📋 Meni
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 Narudžbe
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Postavke
        </button>
        {currentUser.permissions.includes('users_manage') && (
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Korisnici
          </button>
        )}
      </div>

      <div className="admin-content">
        {activeTab === 'menu' && (
          <div className="menu-management">
            <h2>Upravljanje Menijem</h2>
            {Object.entries(menuData.categories).map(([categoryKey, category]) => (
              <div key={categoryKey} className="category-section">
                <h3>{category.name}</h3>
                <div className="items-grid">
                  {category.items.map(item => (
                    <div key={item.id} className="item-card">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="price">{item.price}{menuData.settings.currency}</p>
                        <p className="ingredients">{item.ingredients}</p>
                        <div className="item-controls">
                          <label>
                            <input
                              type="checkbox"
                              checked={item.available}
                              onChange={(e) => updateMenuItem(categoryKey, item.id, { available: e.target.checked })}
                            />
                            Dostupno
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              checked={item.featured}
                              onChange={(e) => updateMenuItem(categoryKey, item.id, { featured: e.target.checked })}
                            />
                            Izdvojeno
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-management">
            <h2>Upravljanje Narudžbama</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h4>Narudžba #{order.id}</h4>
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Kupac:</strong> {order.customer.name}</p>
                    <p><strong>Telefon:</strong> {order.customer.phone}</p>
                    <p><strong>Adresa:</strong> {order.customer.address}</p>
                    <p><strong>Ukupno:</strong> {order.total}{menuData.settings.currency}</p>
                  </div>
                  <div className="order-items">
                    <h5>Stavke:</h5>
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        {item.quantity}x {item.name} - {item.price * item.quantity}{menuData.settings.currency}
                      </div>
                    ))}
                  </div>
                  <div className="order-actions">
                    <select 
                      value={order.status} 
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      {ordersJSON.orderStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-management">
            <h2>Postavke Restorana</h2>
            <div className="settings-grid">
              <div className="setting-group">
                <h3>Osnovne informacije</h3>
                <div className="form-group">
                  <label>Ime restorana:</label>
                  <input type="text" defaultValue={menuData.restaurant.name} />
                </div>
                <div className="form-group">
                  <label>Telefon:</label>
                  <input type="text" defaultValue={menuData.restaurant.contact.phone} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" defaultValue={menuData.restaurant.contact.email} />
                </div>
              </div>
              
              <div className="setting-group">
                <h3>Finansijske postavke</h3>
                <div className="form-group">
                  <label>Valuta:</label>
                  <input type="text" defaultValue={menuData.settings.currency} />
                </div>
                <div className="form-group">
                  <label>Porez (%):</label>
                  <input type="number" step="0.01" defaultValue={menuData.settings.taxRate * 100} />
                </div>
                <div className="form-group">
                  <label>Dostava ({menuData.settings.currency}):</label>
                  <input type="number" step="0.01" defaultValue={menuData.settings.deliveryFee} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && currentUser.permissions.includes('users_manage') && (
          <div className="users-management">
            <h2>Upravljanje Korisnicima</h2>
            <div className="users-list">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h4>{user.username}</h4>
                  <p>Uloga: {user.role}</p>
                  <p>Status: {user.active ? 'Aktivan' : 'Neaktivan'}</p>
                  <p>Dozvole: {user.permissions.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
