import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
