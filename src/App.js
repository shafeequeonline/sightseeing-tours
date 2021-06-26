import React from 'react';
import './App.scss';
import Header from "./components/Header";
import Search from "./components/Search/Search";
function App() {
  return (
    <div className="container">
        <Header></Header>
        <Search></Search>
    </div>
  );
}

export default App;
