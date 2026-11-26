import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx'

function Layout() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
