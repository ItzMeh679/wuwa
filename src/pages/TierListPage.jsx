import { useState } from 'react'
import { Link } from 'react-router-dom'
import tierData from '../data/tier-list.json'
import characters from '../data/characters.json'
import './TierListPage.css'

const roles = [
    { key: 'dps', label: 'DPS' },
    { key: 'sub-dps', label: 'Sub-DPS' },
    { key: 'support', label: 'Support' }
]
const tiers = ['SS', 'S', 'A', 'B', 'C']
const tierColors = { SS: '#ff4757', S: '#ffa502', A: '#7c3aed', B: '#3b82f6', C: '#6b7280' }
const elementIcons = { fusion: '🔥', glacio: '❄️', aero: '🌪️', electro: '⚡', spectro: '✨', havoc: '💀' }

export default function TierListPage() {
    const [activeRole, setActiveRole] = useState('dps')

    const tierList = tierData[activeRole]

    return (
        <div className="tierlist-page">
            <div className="container">
                <h1 className="page-title gradient-text">Tier List</h1>
                <p className="page-subtitle">Current meta rankings — updated {tierData.lastUpdated}</p>

                <div className="role-tabs">
                    {roles.map(r => (
                        <button key={r.key} className={`role-tab ${activeRole === r.key ? 'active' : ''}`}
                            onClick={() => setActiveRole(r.key)}>
                            {r.label}
                        </button>
                    ))}
                </div>

                <div className="tier-table">
                    {tiers.map(tier => {
                        const charIds = tierList[tier] || []
                        if (charIds.length === 0) return null
                        return (
                            <div key={tier} className="tier-row">
                                <div className="tier-label" style={{ background: tierColors[tier] }}>
                                    {tier}
                                </div>
                                <div className="tier-chars">
                                    {charIds.map(id => {
                                        const ch = characters.find(c => c.id === id)
                                        if (!ch) return null
                                        return (
                                            <Link key={id} to={`/characters/${id}`} className={`tier-char r${ch.rarity}`} title={ch.name}>
                                                <span className="tier-char-icon">{elementIcons[ch.element]}</span>
                                                <span className="tier-char-name">{ch.name}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
