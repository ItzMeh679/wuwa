import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CharacterPage from './pages/CharacterPage'
import WeaponsPage from './pages/WeaponsPage'
import EchoesPage from './pages/EchoesPage'
import BuildPlannerPage from './pages/BuildPlannerPage'
import TierListPage from './pages/TierListPage'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/characters/:id" element={<CharacterPage />} />
                    <Route path="/weapons" element={<WeaponsPage />} />
                    <Route path="/echoes" element={<EchoesPage />} />
                    <Route path="/builder" element={<BuildPlannerPage />} />
                    <Route path="/tier-list" element={<TierListPage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
