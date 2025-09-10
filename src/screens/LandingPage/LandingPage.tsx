import { useNavigate } from "react-router-dom"
import { Header } from "../Header/Header"

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div onClick={() => navigate('/login')}>

      </div>
    </div>
  )
}