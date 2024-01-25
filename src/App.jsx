import { Routes, Route } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage";


function App() {


  return (
    <>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage page="login" />} />
          <Route path="/register" element={<LoginPage page="register" />} />
        </Routes>
      </main>
    </>
  )
}

export default App
