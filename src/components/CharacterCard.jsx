import { Link } from 'react-router-dom'
import { getCharacterIcon, ELEMENT_COLORS, ELEMENT_ICONS } from '../utils/images'
import './CharacterCard.css'

export default function CharacterCard({ character }) {
    const { id, name, rarity, element, weaponType, role } = character
    const color = ELEMENT_COLORS[element] || '#fff'
    const rarityClass = rarity === 5 ? 'r5' : 'r4'
    const iconUrl = getCharacterIcon(id)

    return (
        <Link to={`/characters/${id}`} className={`character-card ${rarityClass}`} style={{ '--element-color': color }}>
            <div className="card-image-wrap">
                {iconUrl ? (
                    <img
                        src={iconUrl}
                        alt={name}
                        className="card-image"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                        }}
                    />
                ) : null}
                <div className="card-image-fallback" style={{ display: iconUrl ? 'none' : 'flex' }}>
                    <span className="card-element-icon" style={{ filter: `drop-shadow(0 0 20px ${color})` }}>
                        {ELEMENT_ICONS[element]}
                    </span>
                </div>
                <div className="card-rarity">
                    {Array.from({ length: rarity }, (_, i) => (
                        <span key={i} className="star">★</span>
                    ))}
                </div>
            </div>
            <div className="card-info">
                <h3 className="card-name">{name}</h3>
                <div className="card-meta">
                    <span className={`element-badge ${element}`}>{element}</span>
                    <span className="weapon-type">{weaponType}</span>
                </div>
                <span className="card-role">{role}</span>
            </div>
        </Link>
    )
}
