import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

const navLinks = [
    { path: '/', label: 'Characters', icon: '👤' },
    { path: '/weapons', label: 'Weapons', icon: '⚔️' },
    { path: '/echoes', label: 'Echoes', icon: '🔮' },
    { path: '/builder', label: 'Builder', icon: '🛠️' },
    { path: '/tier-list', label: 'Tier List', icon: '📊' },
]

export default function Navbar() {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🌊</span>
                    <span className="logo-text">WuWa<span className="logo-accent">DB</span></span>
                </Link>

                <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="nav-icon">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>

                <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
                        <span></span><span></span><span></span>
                    </span>
                </button>
            </div>
        </nav>
    )
}
