import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/NavComponent';
import { Route, Routes } from 'react-router-dom';
import CifraPage from './pages/CifraPage';
import LetraPage from './pages/LetraPage';


function App() {

  return (
    <>
      <Routes>
        <Route path='/cifra' element={<CifraPage />} />
        <Route path='/letra' element={<LetraPage />} />
      </Routes>
      <Nav />
    </>
  )
}

export default App
