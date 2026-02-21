import { useState, useMemo } from 'react'
import characters from '../data/characters.json'
import sonataEffects from '../data/sonata-effects.json'
import './BuildPlannerPage.css'

export default function BuildPlannerPage() {
    const [selectedChar, setSelectedChar] = useState(null)
    const [echoSlots, setEchoSlots] = useState([null, null, null, null, null])

    const char = characters.find(c => c.id === selectedChar)

    // Build suggestion logic
    const suggestion = useMemo(() => {
        if (!char) return null
        return {
            weapons: char.recommendedWeapons,
            sets: char.recommendedEchoSets,
            stats: char.statPriority
        }
    }, [char])

    return (
        <div className="builder-page">
            <div className="container">
                <h1 className="page-title gradient-text">Build Planner</h1>
                <p className="page-subtitle">
                    Plan your builds. Select a character to see recommended weapons, echo sets, and stat priorities.
                    <br /><em>Screenshot OCR coming soon — upload echo screenshots to auto-fill stats!</em>
                </p>

                <div className="builder-layout">
                    <div className="builder-select">
                        <h3>Select Character</h3>
                        <div className="char-select-grid">
                            {characters.map(c => (
                                <button key={c.id}
                                    className={`char-select-btn ${selectedChar === c.id ? 'active' : ''}`}
                                    onClick={() => setSelectedChar(c.id)}
                                    title={c.name}>
                                    <span className="select-element">{getIcon(c.element)}</span>
                                    <span className="select-name">{c.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {char && suggestion && (
                        <div className="builder-result fade-in">
                            <div className="builder-header">
                                <h2>{char.name}</h2>
                                <span className={`element-badge ${char.element}`}>{char.element}</span>
                                <span className="role-badge">{char.role}</span>
                            </div>

                            <div className="builder-sections">
                                <div className="builder-card glass-card">
                                    <h3>⚔️ Weapons</h3>
                                    {suggestion.weapons.map((w, i) => (
                                        <div key={i} className="builder-item">
                                            <span className="rank">{i + 1}.</span>
                                            <span className="item-name">{w.w}</span>
                                            <span className={`item-rarity r${w.r}`}>{w.r}★</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="builder-card glass-card">
                                    <h3>🔮 Echo Sets</h3>
                                    {suggestion.sets.map((s, i) => (
                                        <div key={i} className="builder-item">
                                            <span className="rank">{i + 1}.</span>
                                            <span className="item-name">{s.s}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="builder-card glass-card">
                                    <h3>📊 Main Stats</h3>
                                    <div className="builder-item"><span className="stat-slot">4-Cost:</span> {suggestion.stats.main.echo4}</div>
                                    <div className="builder-item"><span className="stat-slot">3-Cost:</span> {suggestion.stats.main.echo3}</div>
                                    <div className="builder-item"><span className="stat-slot">1-Cost:</span> {suggestion.stats.main.echo1}</div>
                                </div>

                                <div className="builder-card glass-card">
                                    <h3>🎯 Substats Priority</h3>
                                    <div className="substat-order">
                                        {suggestion.stats.sub.map((s, i) => (
                                            <span key={s} className="substat-item">
                                                {i > 0 && <span className="substat-arrow">›</span>}
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Echo Slots */}
                                <div className="builder-card glass-card echo-slots-card">
                                    <h3>🎵 Echo Slots</h3>
                                    <div className="echo-slots">
                                        {echoSlots.map((slot, i) => (
                                            <div key={i} className="echo-slot">
                                                <span className="slot-cost">{i === 0 ? '4' : i <= 2 ? '3' : '1'}</span>
                                                <span className="slot-label">Slot {i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="ocr-hint">📸 Screenshot OCR scan coming soon</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!char && (
                        <div className="builder-empty">
                            <span className="empty-icon">👆</span>
                            <p>Select a character to view build recommendations</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function getIcon(el) {
    const icons = { fusion: '🔥', glacio: '❄️', aero: '🌪️', electro: '⚡', spectro: '✨', havoc: '💀' }
    return icons[el] || '?'
}
