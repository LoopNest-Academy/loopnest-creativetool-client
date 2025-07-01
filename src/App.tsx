import { MemoryRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import WelcomePage from "./Components/WelcomePage"
import Index from "./Components/Index"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Index />} />
        </Routes>
      </Router>
    </>
  )
}
