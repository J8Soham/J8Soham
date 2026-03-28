import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
