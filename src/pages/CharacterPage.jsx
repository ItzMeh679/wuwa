import { useParams, Link } from 'react-router-dom'
import { getCharacterPortrait, getCharacterIcon, getFuzzyImage, ELEMENT_COLORS, ELEMENT_ICONS } from '../utils/images'
import { IMAGE_MAP } from '../utils/image_map'
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

    // ── Image resolution with IMAGE_MAP keys ──
    const charKey = char.id.toLowerCase()

    // Splash art (fullscreen BG)
    const splashUrl = IMAGE_MAP[charKey + '_splash_art']
        || IMAGE_MAP[charKey + '_splash']
        || getCharacterPortrait(char.name)
        || getCharacterPortrait(id)

    // Full sprite (right-side standing art)
    const spriteUrl = IMAGE_MAP[charKey + '_full_sprite']
        || IMAGE_MAP[charKey + '_full_body_illustration__1_']
        || null


    // Element icon image
    const elementKey = char.element.toLowerCase()
    const elementIconUrl = IMAGE_MAP[elementKey + '_icon']
        || IMAGE_MAP['attribute_' + elementKey + '_icon']

    // Weapon type icon
    const weaponTypeKey = char.weaponType?.toLowerCase()
    const weaponTypeIconUrl = IMAGE_MAP['skill_' + weaponTypeKey]
        || IMAGE_MAP[weaponTypeKey + '_icon']
        || null

    // Main weapon image
    const topWeapon = char.recommendedWeapons?.[0]?.w || 'Unknown Weapon'
    const weaponImgKey = 'weapon_' + topWeapon.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const weaponImageUrl = IMAGE_MAP[weaponImgKey]
        || getFuzzyImage(topWeapon)
        || getFuzzyImage(char.weaponType + '_icon')

    // Echo set
    const topEchoSet = char.recommendedEchoSets?.[0]?.s || 'Unknown Echo Set'
    const topEchoSetName = char.recommendedEchoSets?.[0]?.a || topEchoSet

    // Echo set icon — try fuzzy from set name
    const echoSetKey = 'icon_' + topEchoSetName.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const echoSetIconUrl = IMAGE_MAP[echoSetKey]
        || getFuzzyImage(topEchoSetName + ' icon')
        || null

    // Main echo icon — try the first recommended echo set's key
    const mainEchoKey = charKey + '_main_echo'
    // For now use a fuzzy search
    const mainEchoIconUrl = IMAGE_MAP['reminiscence_fleurdelys_icon']  // TODO: make dynamic per character
        || null

    // Echo cost layout
    const echoCostLayout = char.echoCostLayout || '4-4-1-1-1'

    // Synergy members
    const synergyMembers = char.synergy
        ? char.synergy.flatMap(s => s.members)
        : char.teams?.[0]?.members?.filter(m => m !== char.name) || []
    const uniqueSynergy = [...new Set(synergyMembers)]

    // Card image (for icon thumbnail)
    const iconUrl = IMAGE_MAP[charKey + '_card'] || getCharacterIcon(id)

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
                    <Link to="/gallery">Gallery</Link>
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
                {/* Background: Splash Art */}
                <div className="char-bg-layer">
                    {splashUrl && (
                        <img src={splashUrl} alt="" className="char-splash-bg" referrerPolicy="no-referrer" />
                    )}
                    <div className="char-bg-overlay"></div>
                    <div className="char-bg-gradient-bottom"></div>
                </div>

                {/* Hero Content Grid */}
                <div className="char-hero-content">
                    {/* Left: Text info */}
                    <div className="char-hero-text-area fade-in" style={{ animationDelay: '0.2s' }}>
                        <span className="char-subtitle">{char.rarity === 5 ? 'New Resonator' : 'Resonator'}</span>

                        <h1 className="char-title-name">{char.name}</h1>

                        <div className="char-stars">
                            {Array.from({ length: char.rarity }, (_, i) => (
                                <span key={i} className="material-symbols-outlined char-star">kid_star</span>
                            ))}
                        </div>

                        {/* Metadata */}
                        <div className="char-hero-metadata">
                            <div className="meta-row">
                                <span className="meta-label">Title</span>
                                <span className="meta-value">: {char.title || 'Unknown'}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Role</span>
                                <span className="meta-value">: {char.role || 'Main DPS'}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Weapon</span>
                                <span className="meta-value">: {char.weaponType?.charAt(0).toUpperCase() + char.weaponType?.slice(1)}</span>
                            </div>
                        </div>

                        {/* Element & Weapon Badges with real images */}
                        <div className="char-element-weapon-row">
                            <div className="element-badge">
                                {elementIconUrl ? (
                                    <img src={elementIconUrl} alt={char.element} className="badge-icon-img" referrerPolicy="no-referrer" />
                                ) : (
                                    <span className="element-dot"></span>
                                )}
                                {char.element.charAt(0).toUpperCase() + char.element.slice(1)}
                            </div>
                            <div className="weapon-badge">
                                {weaponTypeIconUrl ? (
                                    <img src={weaponTypeIconUrl} alt={char.weaponType} className="badge-icon-img" referrerPolicy="no-referrer" />
                                ) : (
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>swords</span>
                                )}
                                {char.weaponType?.charAt(0).toUpperCase() + char.weaponType?.slice(1)}
                            </div>
                        </div>

                        {/* Small card thumbnail */}
                        {iconUrl && (
                            <img src={iconUrl} alt={char.name} className="char-icon-thumb fade-in"
                                style={{ animationDelay: '0.5s' }} referrerPolicy="no-referrer" />
                        )}
                    </div>

                    {/* Right: Full Sprite */}
                    <div className="char-hero-sprite-area fade-in" style={{ animationDelay: '0.4s' }}>
                        {spriteUrl && (
                            <img src={spriteUrl} alt={char.name} className="char-full-sprite" referrerPolicy="no-referrer" />
                        )}
                    </div>
                </div>
            </section>


            {/* ===== SCROLLING CONTENT ===== */}
            <div className="char-content-sections">

                {/* COMBAT SECTION */}
                <section className="combat-section fade-in">
                    <h2 className="section-title">Combat</h2>

                    <div className="combat-roles">
                        <div className="combat-role-item">
                            <div className="combat-role-icon">
                                {weaponTypeIconUrl ? (
                                    <img src={weaponTypeIconUrl} alt="" className="combat-role-img" referrerPolicy="no-referrer" />
                                ) : (
                                    <span className="material-symbols-outlined">swords</span>
                                )}
                            </div>
                            <span className="combat-role-label">{char.role || 'Main Damage Dealer'}</span>
                        </div>
                        <div className="combat-role-item">
                            <div className="combat-role-icon">
                                {elementIconUrl ? (
                                    <img src={elementIconUrl} alt="" className="combat-role-img" referrerPolicy="no-referrer" />
                                ) : (
                                    <span className="material-symbols-outlined">bolt</span>
                                )}
                            </div>
                            <span className="combat-role-label">{char.element.charAt(0).toUpperCase() + char.element.slice(1)} Element</span>
                        </div>
                        <div className="combat-role-item">
                            <div className="combat-role-icon">
                                <span className="material-symbols-outlined">target</span>
                            </div>
                            <span className="combat-role-label">Basic Attack Damage</span>
                        </div>
                    </div>

                    {/* Skills Panels */}
                    <div className="skills-showcase">
                        <div className="skill-panel">
                            {splashUrl && <img src={splashUrl} alt="" className="skill-panel-bg" referrerPolicy="no-referrer" />}
                            <div className="skill-panel-overlay"></div>
                            <div className="skill-panel-content">
                                <div className="skill-icon-wrap">
                                    {weaponTypeIconUrl ? (
                                        <img src={weaponTypeIconUrl} alt="" className="skill-panel-icon-img" referrerPolicy="no-referrer" />
                                    ) : (
                                        <span className="material-symbols-outlined">attack</span>
                                    )}
                                </div>
                                <span className="skill-type-label">Normal Attack</span>
                                <span className="skill-name">Basic Combo</span>
                            </div>
                        </div>
                        <div className="skill-panel has-color">
                            {splashUrl && <img src={splashUrl} alt="" className="skill-panel-bg" referrerPolicy="no-referrer"
                                style={{ objectPosition: 'right center' }} />}
                            <div className="skill-panel-overlay"></div>
                            <div className="skill-panel-content">
                                <div className="skill-icon-wrap">
                                    {elementIconUrl ? (
                                        <img src={elementIconUrl} alt="" className="skill-panel-icon-img" referrerPolicy="no-referrer" />
                                    ) : (
                                        <span className="material-symbols-outlined">auto_awesome</span>
                                    )}
                                </div>
                                <span className="skill-type-label">Resonance Skill</span>
                                <span className="skill-name">Resonance</span>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ARSENAL SECTION */}
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

                            {/* Echo Set with icon */}
                            <div className="echo-set-header">
                                {echoSetIconUrl && (
                                    <img src={echoSetIconUrl} alt={topEchoSetName} className="echo-set-icon" referrerPolicy="no-referrer" />
                                )}
                                <span className="echo-set-name">{topEchoSetName}</span>
                            </div>

                            {/* Main Echo with icon */}
                            {mainEchoIconUrl && (
                                <div className="main-echo-row">
                                    <img src={mainEchoIconUrl} alt="Main Echo" className="main-echo-icon" referrerPolicy="no-referrer" />
                                    <span className="main-echo-label">Main Echo</span>
                                </div>
                            )}

                            {/* Echo cost layout */}
                            <div className="echo-cost-layout">
                                <span className="echo-cost-label">Cost Layout:</span>
                                <div className="echo-cost-pills">
                                    {echoCostLayout.split('-').map((cost, i) => (
                                        <span key={i} className={`echo-cost-pill cost-${cost}`}>{cost}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Stat pills */}
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


                {/* SYNERGY SECTION */}
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
                                    <Link to={mChar ? `/characters/${mChar.id}` : '#'} key={i} className="synergy-card" style={{ textDecoration: 'none' }}>
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
