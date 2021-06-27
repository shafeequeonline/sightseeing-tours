import React, { useState} from 'react';
import './App.scss';
import Header from "./components/Header";
import Search from "./components/Search/Search";
import Cabs from "./components/Cabs/Cabs";

/**
 * Using React context to communicate between components
 */
import { CabsContext } from "./context/cabs-context";

function App() {
    const [ offers, setOffers ] = useState([])
    const [ showCabs, setShowCabs ] = useState(false)
  return (
    <div className="container">
        <Header/>
        <CabsContext.Provider value={{offers, setOffers, showCabs, setShowCabs}}>
            <Search/>

            {showCabs ? <Cabs/>: ''}
        </CabsContext.Provider>
    </div>
  );
}

export default App;
