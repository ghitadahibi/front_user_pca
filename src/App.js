import logo from './logo.svg';
import './App.css';
import Home from '../src/Pages/Home'
import Connexion from './Pages/Connexion';
import Register from './Pages/Register'
import {   Router, Route, BrowserRouter, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Home/>} /> 
     <Route path="/connexion" element={<Connexion/>} /> 
     <Route path="/compte" element={<Register/>} /> 




     </Routes>
     </BrowserRouter>

    </div>
  );
}

export default App;


   
   
   
  