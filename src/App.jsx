import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/NavComponent';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LetraPage from './pages/LetraPage';
import CifraPage from './pages/CifraPage';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/letra' element={<LetraPage/>}/>
      <Route path='/cifra' element={<CifraPage/>}/>
    </Routes>
    <Menu/>
    
      
    </>
  )
}

export default App
