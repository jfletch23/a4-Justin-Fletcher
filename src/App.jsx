import MLBLogo from './assets/MLB_Logo.png'
import Form from './Form.jsx'
import './App.css'
import {useState, useEffect} from 'react'
import Card from './Card.jsx'

function App() {
  const [players, setPlayers] = useState([])

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/players')
      const result = await response.json()
      setPlayers(result)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])


  return (
    <>
      <header>
        <img src={MLBLogo} alt="MLB Logo" />
        <h1>Baseball Prospects Database</h1>
      </header>
      <div className="container">
        <Form onSubmitSuccess={fetchPlayers} />
        <div className="wrapper">
          {players.map((player) => (
            <Card key={player._id} data={player} onDeleteSuccess={fetchPlayers} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
