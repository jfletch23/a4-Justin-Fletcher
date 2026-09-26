import MLBLogo from './assets/MLB_Logo.png'
import Form from './Form.jsx'
import './App.css'
import {useState, useEffect} from 'react'
import Card from './Card.jsx'

function App() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/players')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        console.log(result)
        setPlayers(result) 
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])


  return (
    <>
      <header>
        <img src={MLBLogo} alt="MLB Logo" />
        <h1>Baseball Prospects Database</h1>
      </header>
      <div className="container">
        <Form />
        <div className="wrapper">
          {players.map((player) => (
            <Card key={player._id} data={player} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
