import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Registration from './Pages/Registration'
import Quiz from './Pages/Quiz'
import Final from './Pages/Final'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='registration' element={<Registration/>}/>
        <Route path='quiz' element={<Quiz/>}/>
        <Route path='final' element={<Final/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
