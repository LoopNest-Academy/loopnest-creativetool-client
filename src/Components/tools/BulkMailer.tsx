import axios from "axios"
import { useState, useEffect, type JSX } from "react"

const BulkMailer = () => {
  const [collection, setCollection] = useState<{
    emails: string
    name: string
  }>({
    emails: "",
    name: "",
  })

  const [loopedJSXCLASS, setLoopedJSXCLASS] = useState<JSX.Element[]>([])
  const [emailToSend, setEmailToSend] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")

  // Function to update looped JSX from storage
  const updateLoopedJSX = () => {
    const getCollection = localStorage.getItem("collections")
    if (!getCollection) {
      localStorage.setItem("collections", "[]")
      setLoopedJSXCLASS([])
      return
    }

    const parsed = JSON.parse(getCollection)
    const jsx = parsed.map(
      (item: { name: string; emails: string }, index: number) => (
        <div key={index} className="adjust-columns">
          <button
            style={{ width: "170px" }}
            className="onclick-highlight"
            id="submit"
            onClick={() => setEmailToSend(item.emails)} // ✅ set email on click
          >
            {item.name}
          </button>
          <button
            onClick={() => {
              const updated = [...parsed]
              updated.splice(index, 1)
              localStorage.setItem("collections", JSON.stringify(updated))
              updateLoopedJSX()
            }}
            style={{
              alignItems: "center",
              textAlign: "left",
              margin: " 0px -20px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            id="submit"
          >
            ❌
          </button>
        </div>
      )
    )

    setLoopedJSXCLASS(jsx)
  }

  // Run once when component mounts
  useEffect(() => {
    updateLoopedJSX()
  }, [])

  function generateSheet(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const { emails, name } = collection

    const collectionString = localStorage.getItem("collections") ?? "[]"
    const collectionArray = JSON.parse(collectionString)

    collectionArray.push({ name, emails })
    localStorage.setItem("collections", JSON.stringify(collectionArray))

    updateLoopedJSX()

    setCollection({ emails: "", name: "" })
  }

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const payload = {
        email: emailToSend,
        subject: emailSubject,
        body: emailBody,
      }

      const response = await axios.post(
        "http://127.0.0.1:4000/api/mailer",
        payload
      )
      console.log("Email sent successfully:", response.data)
      alert("Email sent successfully!")
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Failed to send email.")
    }
  }

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header">
          <h1>LoopNest Creative Toolkit — BulkMailer</h1>
          <strong>{localStorage.getItem("moderator")} 👊 BulkMailer</strong>
          <small>
            — a powerful LoopNest toolkit utility designed to effortlessly send
            emails to large datasets with speed, reliability, and ease.
          </small>
        </div>

        {/* Render Saved Collections */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {loopedJSXCLASS}
        </div>

        {/* Sheet Generator */}
        <form className="sheet-form no-drag" onSubmit={generateSheet}>
          <input
            type="text"
            className="weex-input"
            name="name"
            value={collection.name}
            style={{ height: "40px", width: "220px" }}
            onChange={(e) =>
              setCollection({ ...collection, name: e.target.value })
            }
            placeholder="Collection Name"
          />{" "}
          <input
            type="text"
            className="weex-input"
            name="emails"
            value={collection.emails}
            style={{ height: "40px", width: "220px" }}
            onChange={(e) =>
              setCollection({ ...collection, emails: e.target.value })
            }
            placeholder="Email Collections"
          />{" "}
          <button type="submit" id="submit">
            Generate
          </button>
        </form>

        <div className="collections"></div>

        {/* Email Form */}
        <form className="email-form" id="emailForm" onSubmit={sendEmail}>
          <div className="left-column">
            <input
              type="text"
              className="weex-input"
              style={{ height: "50px", width: "320px" }}
              placeholder="Emails"
              value={emailToSend}
              onChange={(e) => setEmailToSend(e.target.value)}
            />{" "}
            <input
              type="text"
              className="weex-input"
              style={{ height: "50px", width: "320px" }}
              placeholder="Subject"
              value={emailSubject} // ✅ ADD THIS
              onChange={(e) => setEmailSubject(e.target.value)}
            />{" "}
          </div>

          <div className="right-column">
            <textarea
              className="weex-input"
              style={{
                height: "200px",
                width: "520px",
                textAlign: "left", // ✅ aligns text to the left
                verticalAlign: "top", // ✅ for cross-browser sanity
                padding: "10px", // ✅ optional: better text spacing
                resize: "none", // optional: disable resize
              }}
              placeholder="__ Email Body goes Here"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
            />
          </div>
        </form>

        <div className="send-button">
          <button id="submit" type="submit" form="emailForm">
            Send Email
          </button>
        </div>
        {/* Send Button */}

        <strong>Email Body:</strong>
        <div
          className="rendered-output"
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f7f7f7",
            color: "black",
          }}
          dangerouslySetInnerHTML={{ __html: emailBody }}
        />
      </div>
    </div>
  )
}

export default BulkMailer
