import './Card.css'

function Card({data}) {
    return (
        <div className="card">
            <h3>{data.player_name}</h3>
            <ul>
                <li>{data.player_age}</li>
                <li>{data.player_position}</li>
                <li>Bats: {data.batting}</li>
                <li>Throws: {data.throwing}</li>
                <li>Overall: {data.overall}</li>
            </ul>
        </div>
    )
}

export default Card