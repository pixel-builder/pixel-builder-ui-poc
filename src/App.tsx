import React from 'react';
import './App.css';
import Canvas from './components/Canvas'

function App() {

  return (
    <main className='App-main'>

      <div style={{
        display: 'flex'
      }}>

        <Canvas x={150} y={150} />
        <Canvas x={150} y={150} />
        
        <div style={{
              display: 'flex'
            }}>
              <div>Red</div>
              <div>Green</div>
              <div>Blue</div>
              <div>Black</div>
            </div>
            
      </div>
      
    </main>
  );
}

export default App;

// study functional programming
// blend of oop and functional is best