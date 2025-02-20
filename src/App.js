import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Coins from './components/Coins'
import CoinDetails from './components/CoinDetails'
import Exchanges from './components/Exchanges'
import Footer from './components/Footer'



function App() {
  return (
<Router>
<Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/coins" element={<Coins/>}/>
    <Route path="/exchanges" element={<Exchanges/>}/>
    <Route path="/coins/:params" element={<CoinDetails/>}/>
    <Route path="/coindetails" element={<CoinDetails/>}/>
  </Routes>
  <Footer />
</Router>
  );
}

export default App