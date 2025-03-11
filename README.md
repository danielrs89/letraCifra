![alt text](public/icon.png)


📌 Instalación de Bootstrap 
```sh
npm install bootstrap

import 'bootstrap/dist/css/bootstrap.min.css';
```

📌 Instalación de Routes
```sh
npm i react-router-dom

# /main.jsx
import { BrowserRouter } from 'react-router-dom'

    <BrowserRouter>
      <App />
    </BrowserRouter>

# /App.jsx
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

# /NavComponent.jsx
<a href="/cifra">
<a href="/letra">
```


