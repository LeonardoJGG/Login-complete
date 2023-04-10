import './App.css'
import ProtectorRouter from './components/auth/ProtectorRouter'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>

        <Route path='/dashboard' element={
          <ProtectorRouter>
            <Dashboard />
          </ProtectorRouter>
        }/>
        
      </Routes>
      
    </div>
  )
}

export default App
