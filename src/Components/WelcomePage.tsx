import { useEffect } from "react"
import Welcome from "./common/logpages/Logo_Slogan"
import Search from "./common/logpages/Admin"
import { useNavigate } from "react-router-dom"

const WelcomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("moderator")) {
      navigate("/home")
    }
  }, [navigate])

  return (
    <div className="center-div">
      <Welcome />
      <Search />
    </div>
  )
}

export default WelcomePage
