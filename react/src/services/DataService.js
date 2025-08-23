// DataService - Handles JSON data operations for admin panel
class DataService {
  constructor() {
    this.menuData = null
    this.orders = null
    this.users = null
  }

  // Initialize data from JSON files
  async loadData() {
    try {
      const [menuResponse, ordersResponse, usersResponse] = await Promise.all([
        import('../data/menuData.json'),
        import('../data/orders.json'),
        import('../data/adminUsers.json')
      ])
      
      this.menuData = menuResponse.default
      this.orders = ordersResponse.default
      this.users = usersResponse.default
      
      return { success: true }
    } catch (error) {
      console.error('Error loading data:', error)
      return { success: false, error }
    }
  }

  // Menu operations
  getMenuData() {
    return this.menuData
  }

  updateMenuItem(categoryKey, itemId, updates) {
    if (!this.menuData) return false
    
    const category = this.menuData.categories[categoryKey]
    if (!category) return false
    
    const itemIndex = category.items.findIndex(item => item.id === itemId)
    if (itemIndex === -1) return false
    
    category.items[itemIndex] = { ...category.items[itemIndex], ...updates }
    return true
  }

  addMenuItem(categoryKey, newItem) {
    if (!this.menuData) return false
    
    const category = this.menuData.categories[categoryKey]
    if (!category) return false
    
    // Generate new ID
    const maxId = Math.max(...Object.values(this.menuData.categories)
      .flatMap(cat => cat.items.map(item => item.id)))
    
    newItem.id = maxId + 1
    category.items.push(newItem)
    return newItem
  }

  deleteMenuItem(categoryKey, itemId) {
    if (!this.menuData) return false
    
    const category = this.menuData.categories[categoryKey]
    if (!category) return false
    
    const itemIndex = category.items.findIndex(item => item.id === itemId)
    if (itemIndex === -1) return false
    
    category.items.splice(itemIndex, 1)
    return true
  }

  // Order operations
  getOrders() {
    return this.orders?.orders || []
  }

  updateOrderStatus(orderId, newStatus) {
    if (!this.orders) return false
    
    const orderIndex = this.orders.orders.findIndex(order => order.id === orderId)
    if (orderIndex === -1) return false
    
    this.orders.orders[orderIndex].status = newStatus
    this.orders.orders[orderIndex].updatedAt = new Date().toISOString()
    return true
  }

  addOrder(orderData) {
    if (!this.orders) return false
    
    // Generate new order ID
    const maxOrderNum = Math.max(...this.orders.orders.map(order => 
      parseInt(order.id.split('-')[1])))
    
    const newOrder = {
      ...orderData,
      id: `ORD-${String(maxOrderNum + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
    
    this.orders.orders.unshift(newOrder)
    return newOrder
  }

  // User operations
  getUsers() {
    return this.users?.users || []
  }

  authenticateUser(username, password) {
    if (!this.users) return null
    
    return this.users.users.find(user => 
      user.username === username && 
      user.password === password && 
      user.active
    )
  }

  updateUser(userId, updates) {
    if (!this.users) return false
    
    const userIndex = this.users.users.findIndex(user => user.id === userId)
    if (userIndex === -1) return false
    
    this.users.users[userIndex] = { ...this.users.users[userIndex], ...updates }
    return true
  }

  // Settings operations
  getSettings() {
    return this.menuData?.settings || {}
  }

  updateSettings(updates) {
    if (!this.menuData) return false
    
    this.menuData.settings = { ...this.menuData.settings, ...updates }
    return true
  }

  getRestaurantInfo() {
    return this.menuData?.restaurant || {}
  }

  updateRestaurantInfo(updates) {
    if (!this.menuData) return false
    
    this.menuData.restaurant = { ...this.menuData.restaurant, ...updates }
    return true
  }

  // Export data (for backup/download)
  exportData() {
    return {
      menuData: this.menuData,
      orders: this.orders,
      users: this.users,
      exportDate: new Date().toISOString()
    }
  }

  // Statistics
  getStatistics() {
    if (!this.orders || !this.menuData) return {}
    
    const orders = this.orders.orders
    const today = new Date().toISOString().split('T')[0]
    
    return {
      totalOrders: orders.length,
      todayOrders: orders.filter(order => 
        order.timestamp.split('T')[0] === today).length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: orders.length > 0 ? 
        orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
      popularItems: this.getPopularItems(),
      recentOrders: orders.slice(0, 5)
    }
  }

  getPopularItems() {
    if (!this.orders) return []
    
    const itemCounts = {}
    
    this.orders.orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity
      })
    })
    
    return Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))
  }
}

// Create singleton instance
const dataService = new DataService()

export default dataService
