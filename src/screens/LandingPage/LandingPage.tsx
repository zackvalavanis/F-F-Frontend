import { useNavigate } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import './LandingPage.css'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div onClick={() => navigate('/login')}>

      </div>
      <div className="main-container">
        <h1>Hello</h1>
      </div>
      <Footer />
    </div>
  )
}