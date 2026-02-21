import { useState } from 'react'
import weapons from '../data/weapons.json'
import './WeaponsPage.css'

const types = Object.keys(weapons)

export default function WeaponsPage() {
    const [activeType, setActiveType] = useState('broadblade')

    return (
        <div className="weapons-page">
            <div className="container">
                <h1 className="page-title gradient-text">Weapons</h1>
                <p className="page-subtitle">All weapons organized by type with stats and passives.</p>

                <div className="weapon-type-tabs">
                    {types.map(t => (
                        <button key={t} className={`weapon-tab ${activeType === t ? 'active' : ''}`}
                            onClick={() => setActiveType(t)}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="weapons-list">
                    {weapons[activeType].map(w => (
                        <div key={w.id} className={`weapon-card glass-card r${w.rarity}`}>
                            <div className="weapon-header">
                                <div>
                                    <h3 className="weapon-name">{w.name}</h3>
                                    <div className="weapon-rarity">
                                        {Array.from({ length: w.rarity }, (_, i) => (
                                            <span key={i} className={`star r${w.rarity}`}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="weapon-stats-mini">
                                    <span className="weapon-atk">ATK {w.atk}</span>
                                    <span className="weapon-sub">{w.stat}</span>
                                </div>
                            </div>
                            <p className="weapon-passive">{w.passive}</p>
                            <div className="weapon-best-for">
                                <span className="best-label">Best for:</span>
                                {w.bestFor.map(id => (
                                    <span key={id} className="best-char">{id.replace(/-/g, ' ')}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
