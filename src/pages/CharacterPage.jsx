import { useParams, Link } from 'react-router-dom'
import { getCharacterPortrait, getCharacterIcon, getFuzzyImage, ELEMENT_COLORS, ELEMENT_ICONS } from '../utils/images'
import characters from '../data/characters.json'
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

    const color = ELEMENT_COLORS[char.element.toLowerCase()] || '#ffffff'
    const colorDim = color + '40'
    const colorGlow = color + '80'
    const portraitUrl = getCharacterPortrait(char.name) || getCharacterPortrait(id)
    const iconUrl = getCharacterIcon(id)

    // Weapon
    const topWeapon = char.recommendedWeapons?.[0]?.w || 'Unknown Weapon'
    let weaponImageUrl = getFuzzyImage(topWeapon)
    if (!weaponImageUrl && char.weaponType) {
        weaponImageUrl = getFuzzyImage(char.weaponType + '_icon') || getFuzzyImage('weapon_icon')
    }

    // Echo
    const topEchoSet = char.recommendedEchoSets?.[0]?.s || 'Unknown Echo Set'

    // Synergy members (from synergy or teams)
    const synergyMembers = char.synergy
        ? char.synergy.flatMap(s => s.members)
        : char.teams?.[0]?.members?.filter(m => m !== char.name) || []

    // Dedupe synergy
    const uniqueSynergy = [...new Set(synergyMembers)]

    return (
        <div className="char-showcase-wrapper" style={{
            '--char-color': color,
            '--char-color-dim': colorDim,
            '--char-color-glow': colorGlow
        }}>

            {/* ===== TOP NAV ===== */}
            <nav className="char-nav">
                <Link to="/" className="char-nav-left fade-in">
                    <div className="app-title">
                        <span>Wuthering</span>
                        <span>Waves</span>
                    </div>
                </Link>

                <div className="char-nav-links fade-in">
                    <Link to="/">Home</Link>
                    <span>Resonator ▾</span>
                    <span>Gallery</span>
                    <Link to="/echoes">Echo</Link>
                    <span>News</span>
                </div>

                <div className="char-nav-right fade-in">
                    <button className="login-btn">Login</button>
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer', fontSize: '28px' }}>account_circle</span>
                </div>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <section className="char-hero-section">
                {/* Background Layers */}
                <div className="char-bg-layer">
                    <div className="char-bg-gradient-element" style={{
                        background: `radial-gradient(circle at 30% 50%, ${colorDim} 0%, transparent 70%)`
                    }}></div>
                    {portraitUrl && (
                        <div className="char-bg-image-wrapper">
                            <img src={portraitUrl} alt={char.name} className="char-bg-image fade-in"
                                referrerPolicy="no-referrer" />
                        </div>
                    )}
                    <div className="char-bg-gradient-bottom"></div>
                </div>

                {/* Hero Content Grid */}
                <div className="char-hero-content">
                    <div className="char-hero-spacer"></div>

                    <div className="char-hero-text-area fade-in" style={{ animationDelay: '0.2s' }}>
                        {/* Subtitle */}
                        <span className="char-subtitle">{char.rarity === 5 ? 'New Resonator' : 'Resonator'}</span>

                        {/* BIG NAME */}
                        <h1 className="char-title-name">{char.name}</h1>

                        {/* Stars */}
                        <div className="char-stars">
                            {Array.from({ length: char.rarity }, (_, i) => (
                                <span key={i} className="material-symbols-outlined char-star">kid_star</span>
                            ))}
                        </div>

                        {/* Metadata */}
                        <div className="char-hero-metadata">
                            <div className="meta-row">
                                <span className="meta-label">Genre</span>
                                <span className="meta-value">: Female</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Birthday</span>
                                <span className="meta-value">: Unknown</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Birth Place</span>
                                <span className="meta-value">: Unknown</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Affiliation</span>
                                <span className="meta-value">: {char.title || 'Unknown'}</span>
                            </div>
                        </div>

                        {/* Element & Weapon Badges */}
                        <div className="char-element-weapon-row">
                            <div className="element-badge">
                                <span className="element-dot"></span>
                                {char.element.charAt(0).toUpperCase() + char.element.slice(1)}
                            </div>
                            <div className="weapon-badge">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>swords</span>
                                {char.weaponType.charAt(0).toUpperCase() + char.weaponType.slice(1)}
                            </div>
                        </div>

                        {/* Small Icon Thumbnail */}
                        {iconUrl && (
                            <img src={iconUrl} alt={char.name} className="char-icon-thumb fade-in"
                                style={{ animationDelay: '0.5s' }} referrerPolicy="no-referrer" />
                        )}
                    </div>
                </div>
            </section>


            {/* ===== SCROLLING CONTENT ===== */}
            <div className="char-content-sections">

                {/* COMBAT SECTION */}
                <section className="combat-section fade-in">
                    <h2 className="section-title">Combat</h2>

                    {/* Combat Role Icons */}
                    <div className="combat-roles">
                        <div className="combat-role-item">
                            <div className="combat-role-icon">
                                <span className="material-symbols-outlined">swords</span>
                            </div>
                            <span className="combat-role-label">{char.role || 'Main Damage Dealer'}</span>
                        </div>
                        <div className="combat-role-item">
                            <div className="combat-role-icon">
                                <span className="material-symbols-outlined">bolt</span>
                            </div>
                            <span className="combat-role-label">Concerto Efficiency</span>
                        </div>
                        <div className="combat-role-item">
                            <div className="combat-role-icon">
                                <span className="material-symbols-outlined">target</span>
                            </div>
                            <span className="combat-role-label">Basic Attack Damage</span>
                        </div>
                    </div>

                    {/* Skills Panels (Monochrome Film Look) */}
                    <div className="skills-showcase">
                        <div className="skill-panel">
                            {portraitUrl && <img src={portraitUrl} alt="" className="skill-panel-bg" referrerPolicy="no-referrer" />}
                            <div className="skill-panel-overlay"></div>
                            <div className="skill-panel-content">
                                <div className="skill-icon-wrap">
                                    <span className="material-symbols-outlined">attack</span>
                                </div>
                                <span className="skill-type-label">Normal Attack</span>
                                <span className="skill-name">Basic Combo</span>
                            </div>
                        </div>
                        <div className="skill-panel has-color">
                            {portraitUrl && <img src={portraitUrl} alt="" className="skill-panel-bg" referrerPolicy="no-referrer"
                                style={{ objectPosition: 'right center' }} />}
                            <div className="skill-panel-overlay"></div>
                            <div className="skill-panel-content">
                                <div className="skill-icon-wrap">
                                    <span className="material-symbols-outlined">auto_awesome</span>
                                </div>
                                <span className="skill-type-label">Resonance Skill</span>
                                <span className="skill-name">Resonance</span>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ARSENAL SECTION (Weapons + Echoes) */}
                <section className="arsenal-section fade-in">
                    <h2 className="section-title">Arsenal</h2>

                    <div className="arsenal-grid">
                        {/* Weapon Card */}
                        <div className="arsenal-card">
                            <div className="arsenal-card-title">Armament Protocol</div>
                            <div className="weapon-card">
                                <div className="weapon-img-wrap">
                                    <div className="weapon-glow"></div>
                                    {weaponImageUrl ? (
                                        <img src={weaponImageUrl} alt={topWeapon} className="weapon-img" referrerPolicy="no-referrer" />
                                    ) : (
                                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}>swords</span>
                                    )}
                                </div>
                                <div className="weapon-info">
                                    <span className="weapon-name">{topWeapon}</span>
                                    <span className="weapon-desc">Optimal Signature Weapon</span>
                                </div>
                            </div>
                            {char.recommendedWeapons?.length > 1 && (
                                <div className="weapon-alternatives">
                                    <span className="alt-label">Alternatives: </span>
                                    {char.recommendedWeapons.slice(1, 4).map((w, i) => (
                                        <span key={i} className="alt-weapon">{w.w}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Echo Card */}
                        <div className="arsenal-card">
                            <div className="arsenal-card-title">Terminal Configuration (Echoes)</div>
                            <div className="echo-set-name">{char.recommendedEchoSets?.[0]?.a || topEchoSet}</div>
                            <div className="echo-stats-row">
                                <span className="echo-pill primary">4C: {char.statPriority?.main?.echo4 || 'Crit Rate'}</span>
                                <span className="echo-pill">3C: {char.statPriority?.main?.echo3 || 'Element DMG'}</span>
                                <span className="echo-pill">1C: {char.statPriority?.main?.echo1 || 'ATK%'}</span>
                            </div>
                            {char.statPriority?.sub && (
                                <p className="substats-text">
                                    <strong>Substats: </strong>
                                    {char.statPriority.sub.join(' > ')}
                                </p>
                            )}
                        </div>
                    </div>
                </section>


                {/* SYNERGY SECTION (Black Shores Carousel) */}
                <section className="synergy-section fade-in">
                    <h2 className="section-title">Synergy Network</h2>

                    <div className="synergy-carousel-wrap">
                        <div className="synergy-label-area">
                            <div className="synergy-label-icon">
                                <span className="material-symbols-outlined">hub</span>
                            </div>
                            <span className="synergy-label-text">Team Comp</span>
                        </div>

                        <div className="synergy-cards" id="synergyScroll">
                            {uniqueSynergy.map((member, i) => {
                                const mChar = characters.find(c => c.name === member || c.id === member)
                                const mPortrait = mChar ? (getCharacterPortrait(mChar.name) || getCharacterPortrait(mChar.id)) : null
                                return (
                                    <Link to={mChar ? `/character/${mChar.id}` : '#'} key={i} className="synergy-card" style={{ textDecoration: 'none' }}>
                                        {mPortrait ? (
                                            <img src={mPortrait} alt={member} className="synergy-card-bg" referrerPolicy="no-referrer" />
                                        ) : (
                                            <div className="synergy-card-bg" style={{ background: '#1a1a1a' }}></div>
                                        )}
                                        <span className="synergy-card-name">{member}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="carousel-nav">
                        <button className="carousel-btn" onClick={() => {
                            const el = document.getElementById('synergyScroll')
                            if (el) el.scrollBy({ left: -240, behavior: 'smooth' })
                        }}>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="carousel-btn" onClick={() => {
                            const el = document.getElementById('synergyScroll')
                            if (el) el.scrollBy({ left: 240, behavior: 'smooth' })
                        }}>
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </section>


                {/* SEQUENCES SECTION */}
                {char.sequences && (
                    <section className="sequences-section fade-in">
                        <h2 className="section-title">Notable Sequences</h2>
                        <div className="sequences-list">
                            {char.sequences.map((seq, i) => (
                                <div key={i} className="sequence-item">
                                    <span className="sequence-node">{seq.node}</span>
                                    <span className="sequence-desc">{seq.desc}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>

        </div>
    )
}
