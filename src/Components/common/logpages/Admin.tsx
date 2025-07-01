import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Admin = () => {
  const [moderator, setModerator] = useState("")
  const navigate = useNavigate()
  const userJoinedTime: Date = new Date()

  const submitInstitution = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    localStorage.setItem("moderator", moderator)
    localStorage.setItem(
      "joinDate",
      userJoinedTime.toLocaleDateString() +
        " " +
        userJoinedTime.toLocaleTimeString()
    )

    if (moderator !== "") {
      navigate("/home")
    } else {
      setModerator("LoopNest_Admin")
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
        placeholder="Toolkit Admin Name"
        onChange={(e) => setModerator(e.target.value)}
      />

      <button id="submit" onClick={submitInstitution}>
        Get Started
      </button>
    </div>
  )
}

export default Admin
