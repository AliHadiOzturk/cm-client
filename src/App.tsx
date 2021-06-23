import React from 'react';
import './App.css';
import { Customers } from './components/Customers';

function App() {
  return (
    <div className="flex h-screen w-screen mx-auto items-center justify-center">
      <Customers></Customers>
    </div>
  );
}

export default App;
