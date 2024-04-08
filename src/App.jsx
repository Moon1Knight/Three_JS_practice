import './App.css';
import React, { lazy, Suspense } from 'react';

// Lazy load the My3dComp component
const My3dComp = lazy(() => import('./3Dcomp/cube'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Use Suspense to wrap the lazy-loaded component */}
        <Suspense fallback={<div>Loading...</div>}>
          <My3dComp />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
