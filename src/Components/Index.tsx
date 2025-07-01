import { useState } from "react"
import Settings from "./common/Settings"
import logo from "../../public/logo.png"
import Welcome from "./common/logpages/Logo_Slogan"
import BulkMailer from "./tools/BulkMailer"

const Index = () => {
  const [renderMenu, setRenderMenu] = useState(<Welcome />)

  const renderMenuFunction = (str: string) => {
    switch (str) {
      case "settings":
        setRenderMenu(<Settings />)
        break
      case "bulkmailer":
        setRenderMenu(<BulkMailer />)
        break

      default:
        setRenderMenu(<Welcome />)
        break
    }
  }

  return (
    <>
      <div>
        <div
          className="left-bar no-drag"
          style={{
            height: "100vh",
            zIndex: 99,
            overflow: "scroll",
          }}
        >
          <img
            className="logo"
            style={{
              width: "70px",
              borderRadius: "50%",
            }}
            src={logo}
          />
          <strong style={{ fontSize: "13px" }}>Creative Toolkit</strong>
          <p style={{ marginTop: "-15px" }}></p>

          <div>
            <p style={{ marginTop: "3px" }}></p>
            <small style={{ color: "#FF2DBF" }}>General Profile</small>
            <li onClick={() => renderMenuFunction("")}>Home</li>
            <li onClick={() => renderMenuFunction("settings")}>
              General Settings
            </li>
            <p style={{ marginTop: "3px" }}></p>
            <small style={{ color: "#FF2DBF" }}>Toolkits</small>
            <li onClick={() => renderMenuFunction("bulkmailer")}>BulkMailer</li>

            <p style={{ marginTop: "3px" }}></p>

            <p style={{ marginTop: "30px" }}></p>
          </div>
        </div>
      </div>

      <div className="content-menu">{renderMenu}</div>
    </>
  )
}

export default Index
