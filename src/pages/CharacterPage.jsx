import { useParams, Link } from 'react-router-dom'
import { getCharacterPortrait, getCharacterIcon, ELEMENT_COLORS, ELEMENT_ICONS } from '../utils/images'
import characters from '../data/characters.json'
import sonataEffects from '../data/sonata-effects.json'
import './CharacterPage.css'

export default function CharacterPage() {
    const { id } = useParams()
    const char = characters.find(c => c.id === id)

    if (!char) return (
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h2>Character not found</h2>
            <Link to="/" style={{ color: 'var(--accent-primary)' }}>← Back to characters</Link>
        </div>
    )

    const color = ELEMENT_COLORS[char.element]
    const portraitUrl = getCharacterPortrait(id)

    return (
        <div className="character-page" style={{ '--char-color': color }}>
            {/* Hero: Left info + Right splash */}
            <div className="char-hero">
                <div className="char-hero-bg" style={{ background: `radial-gradient(ellipse at 70% 50%, ${color}22 0%, transparent 60%)` }}></div>

                <div className="char-hero-layout">
                    {/* LEFT: Character info & builds */}
                    <div className="char-left">
                        <Link to="/" className="back-link">← All Characters</Link>

                        <div className="char-rarity">
                            {Array.from({ length: char.rarity }, (_, i) => (
                                <span key={i} className={`star r${char.rarity}`}>★</span>
                            ))}
                        </div>
                        <h1 className="char-name">{char.name}</h1>
                        <p className="char-title">{char.title}</p>

                        <div className="char-badges">
                            <span className={`element-badge ${char.element}`}>
                                {ELEMENT_ICONS[char.element]} {char.element}
                            </span>
                            <span className="weapon-badge">⚔️ {char.weaponType}</span>
                            <span className="role-badge">{char.role}</span>
                        </div>

                        <div className="char-stats-grid">
                            {[
                                ['HP', char.stats.level90.hp],
                                ['ATK', char.stats.level90.atk],
                                ['DEF', char.stats.level90.def]
                            ].map(([label, value]) => (
                                <div key={label} className="stat-box">
                                    <span className="stat-label">{label}</span>
                                    <span className="stat-value">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Builds inline */}
                        <div className="char-builds">
                            <div className="build-card glass-card">
                                <h3>Best Weapons</h3>
                                <div className="build-list">
                                    {char.recommendedWeapons.map((w, i) => (
                                        <div key={i} className="build-item">
                                            <span className={`build-rank r${w.r}`}>{i + 1}</span>
                                            <span className="build-name">{w.w}</span>
                                            <span className="build-rarity">{w.r}★</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="build-card glass-card">
                                <h3>Echo Sets</h3>
                                <div className="build-list">
                                    {char.recommendedEchoSets.map((e, i) => {
                                        const sonata = sonataEffects.find(s => s.id === (e.a || '').toLowerCase().replace(/ /g, '-'))
                                        return (
                                            <div key={i} className="build-item echo-set-item">
                                                <span className="build-rank">{i + 1}</span>
                                                <div>
                                                    <span className="build-name">{e.s}</span>
                                                    {sonata && <span className="set-bonus">2pc: {sonata.pieces['2']}</span>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="build-card glass-card">
                                <h3>Stat Priority</h3>
                                <div className="stat-priority">
                                    <div className="priority-row">
                                        <span className="priority-label">4-cost Echo</span>
                                        <span className="priority-value">{char.statPriority.main.echo4}</span>
                                    </div>
                                    <div className="priority-row">
                                        <span className="priority-label">3-cost Echo</span>
                                        <span className="priority-value">{char.statPriority.main.echo3}</span>
                                    </div>
                                    <div className="priority-row">
                                        <span className="priority-label">1-cost Echo</span>
                                        <span className="priority-value">{char.statPriority.main.echo1}</span>
                                    </div>
                                    <div className="priority-row substats">
                                        <span className="priority-label">Substats</span>
                                        <div className="substat-pills">
                                            {char.statPriority.sub.map(s => (
                                                <span key={s} className="substat-pill">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Teams */}
                        <div className="char-teams">
                            <h2 className="section-title">👥 Team Compositions</h2>
                            <div className="teams-grid">
                                {char.teams.map((team, i) => (
                                    <div key={i} className="team-card glass-card">
                                        <h4>Team {i + 1}</h4>
                                        <div className="team-members">
                                            {team.members.map((member, j) => {
                                                const memberChar = characters.find(c => c.name === member || c.id === member)
                                                const memberIconUrl = memberChar ? getCharacterIcon(memberChar.id) : null
                                                return (
                                                    <div key={j} className="team-member">
                                                        <div className="member-icon" style={{
                                                            background: memberChar ? `linear-gradient(135deg, ${ELEMENT_COLORS[memberChar.element]}44, transparent)` : 'var(--bg-elevated)',
                                                            overflow: 'hidden'
                                                        }}>
                                                            {memberIconUrl ? (
                                                                <img src={memberIconUrl} alt={member} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                    referrerPolicy="no-referrer"
                                                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.textContent = ELEMENT_ICONS[memberChar?.element] || '?'; }}
                                                                />
                                                            ) : (memberChar ? ELEMENT_ICONS[memberChar.element] : '?')}
                                                        </div>
                                                        <span className="member-name">{member}</span>
                                                        {memberChar && <span className="member-role">{memberChar.role}</span>}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Full splash art */}
                    <div className="char-right">
                        {portraitUrl ? (
                            <img
                                src={portraitUrl}
                                alt={char.name}
                                className="char-splash-image"
                                referrerPolicy="no-referrer"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                            />
                        ) : null}
                        <div className="char-splash-placeholder" style={{ display: portraitUrl ? 'none' : 'flex' }}>
                            <span style={{ fontSize: '8rem' }}>{ELEMENT_ICONS[char.element]}</span>
                        </div>
                        <div className="char-breathing-aura" style={{ background: `radial-gradient(circle at center, ${color}33, transparent 70%)` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
