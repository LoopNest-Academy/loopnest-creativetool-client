import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Admin = () => {
  const [moderator, setModerator] = useState("")
  const navigate = useNavigate()
  const userJoinedTime: Date = new Date()

  const submitInstitution = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const response = await axios.post(import.meta.env.VITE_API + "/api/login", {
      email: moderator,
    })

    const { auth, name, role } = response.data
    if (auth) {
      localStorage.setItem("moderator", name)
      localStorage.setItem("role", role)

      localStorage.setItem(
        "joinDate",
        userJoinedTime.toLocaleDateString() +
          " " +
          userJoinedTime.toLocaleTimeString()
      )
      navigate("/home")
    } else {
      alert("Wrong data!")
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <big style={{ textAlign: "center" }}>
        {moderator !== ""
          ? `${moderator} — LoopNest CreativeToolkit 🦋👊`
          : null}
      </big>
      <input
        className="input weex-input"
        type="text"
        style={{ height: "40px", width: "600px" }}
        placeholder="Toolkit Admin Key"
        onChange={(e) => setModerator(e.target.value)}
      />

      <button id="submit" onClick={submitInstitution}>
        Get Started
      </button>
    </div>
  )
}

export default Admin
