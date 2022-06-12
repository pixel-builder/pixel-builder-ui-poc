import React from 'react';
import './App.css';
import Canvas from './components/Canvas'

function App() {

  return (
    <main className='App-main'>

      <Canvas x={150} y={150} />
      <Canvas x={150} y={150} />
      
    </main>
  );
}

export default App;
