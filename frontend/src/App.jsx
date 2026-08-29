import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Application imports and setup

import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import Categories from './pages/Categories/Categories'
import Preview from './pages/Preview/Preview'

// Main application component

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
