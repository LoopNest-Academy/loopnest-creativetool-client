import { useState } from "react"
const Home = () => {
  const [generalHook, setGeneralHook] = useState({
    moderatorName: localStorage.getItem("moderator"),
  })

  return (
    <div className="no-drag">
      <div style={{ textAlign: "center" }}>
        <h1>LoopNest Toolkit - Home</h1>
        <small style={{ marginTop: "10px", fontSize: "30px" }}>
          {localStorage.getItem("moderator")}
        </small>
      </div>
      <div className="container general-container">
        <label>Toolkit Admin : {localStorage.getItem("moderator")} </label>
        <label>Logged : {localStorage.getItem("joinDate")} </label>

        <label>
          🔌 Connection :{" "}
          <span style={{ color: "#00ff4c" }}>
            {navigator.onLine === true ? (
              <span style={{ color: "#00ff4c" }}> Online</span>
            ) : (
              <span style={{ color: "#fff" }}>Offline</span>
            )}
          </span>{" "}
        </label>
      </div>
      <div className="container information-container"></div>
      <div className="profile no-drag">
        <details>
          <input
            style={{
              marginTop: "20px",
              height: "30px",
              width: "270px",
              fontSize: "17px",
            }}
            className="weex-input"
            onChange={(e) =>
              setGeneralHook({
                ...generalHook,
                moderatorName: e.target.value,
              })
            }
          ></input>
          <p></p>
          <summary>Rename Local User</summary>
          <button
            style={{
              height: "5%",
              width: "270px",
            }}
            id="submit"
            type="submit"
          >
            ➿ Rename
          </button>
        </details>
      </div>

      <div
        style={{
          marginTop: "10px",
        }}
      >
        <h2>Functionalities and Shortcuts</h2>
        <strong>Zoom In</strong>: <code>CTRL +</code>
        <p style={{ marginTop: "-10px" }}></p>
        <strong>Zoom Out</strong>: <code>CTRL -</code>
        <p style={{ marginTop: "-10px" }}></p>
        <strong>Reset Zoom</strong>: <code>CTRL 0</code>
      </div>
    </div>
  )
}

export default Home
