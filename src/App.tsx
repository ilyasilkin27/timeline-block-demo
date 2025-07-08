import React from 'react';
import './App.css';
import { TimelineBlock } from './components/TimelineBlock/TimelineBlock';
import { timelineData } from './data/timelineData';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', background: '#f6f7fa', padding: 32 }}>
      <TimelineBlock periods={timelineData} />
    </div>
  );
}

export default App; 