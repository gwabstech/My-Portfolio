import { Outlet, ScrollRestoration } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Nav />
      <div className="flex-1"><Outlet /></div>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
