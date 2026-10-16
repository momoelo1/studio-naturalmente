import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/Header'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import CoursesPage from './pages/CoursesPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corsi" element={<CoursesPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
