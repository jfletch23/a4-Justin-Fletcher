import './Card.css'

function Card({data, onDeleteSuccess}) {
    const deleteRequest = async (id) => {
        try {
            const response = await fetch(`/delete/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            await onDeleteSuccess()
        } catch (error) {
            console.log(error.message)
        }
    }

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
            <button onClick={() => deleteRequest(data._id)}>Delete Player</button>
        </div>
    )
}

export default Card