import {BrowserRouter,Route,Routes} from'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/mulearn-intern-todo-api' element = {< Home />} />
        <Route path ='/mulearn-intern-todo-api/signup' element = {< Signup />} />
        <Route path ='/mulearn-intern-todo-api/signin' element = {< SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
