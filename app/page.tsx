'use client';
import { useState } from 'react';

export default function Home() {
  // 1. Keep track of which problem is currently selected
  const [problemId, setProblemId] = useState('multiply');
  const [code, setCode] = useState('Type the code\nor Paste the code here!');
  const [feedback, setFeedback] = useState('');

  // Local helper to change static UI descriptions depending on selection
  // Can be pulled from problem-db.json, though use this for now.
  const instructionsMap: Record<string, { title: string; desc: string }> = {
    'two-sum': {
      title: '➕ Add Two Numbers',
      desc: "Write a function named 'add(a, b)' that accepts two inputs and returns their sum.",
    },
    'multiply': {
      title: '✖️ Multiply Two Numbers',
      desc: "Write a function named 'add(a, b)' that multiplies two numbers.",
    }
  };

  const submitCode = async () => {
    setFeedback('Grading against database test cases...');
    
    // 2. Send both the code AND the selected problemId to the backend
    const response = await fetch('/api/grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, problemId }),
    });
    
    const data = await response.json();
    setFeedback(data.feedback);
  };

  return (
  <div style={{ 
    padding: '40px', 
    maxWidth: '800px', 
    margin: '0 auto', 
    backgroundColor: 'var(--background)', 
    color: 'var(--foreground)',
    minHeight: '100vh',
    boxSizing: 'border-box'
  }}>
    <h1>📝 Code Grader Prototype</h1>
    
    <div style={{ marginBottom: '20px' }}>
      <label style={{ fontWeight: 'bold' }}>Select Assignment: </label>
      <select 
        value={problemId} 
        onChange={(e) => setProblemId(e.target.value)}
        style={{ 
          padding: '8px', 
          fontSize: '16px', 
          backgroundColor: 'var(--card-bg)', 
          color: 'var(--foreground)', 
          border: '1px solid var(--border-color)',
          borderRadius: '4px'
        }}
      >
        <option value="two-sum">Problem 1: Add Two Numbers</option>
        <option value="multiply">Problem 2: Multiply Two Numbers</option>
      </select>
    </div>

    <hr style={{ borderColor: 'var(--border-color)' }} />

    <h2>{instructionsMap[problemId].title}</h2>
    <p>{instructionsMap[problemId].desc}</p>
    
    <textarea 
      value={code} 
      onChange={(e) => setCode(e.target.value)} 
      rows={12} 
      style={{ 
        width: '100%', 
        fontFamily: 'monospace', 
        padding: '12px', 
        fontSize: '16px', 
        color: 'var(--foreground)', 
        backgroundColor: 'var(--card-bg)', 
        border: '2px solid var(--border-color)', 
        borderRadius: '6px',
        boxSizing: 'border-box'
      }}
    />
    <br /><br />
    
    <button 
      onClick={submitCode} 
      style={{ 
        padding: '12px 24px', 
        cursor: 'pointer', 
        fontSize: '16px', 
        backgroundColor: '#0070f3', 
        color: '#ffffff', 
        border: 'none', 
        borderRadius: '4px',
        fontWeight: 'bold'
      }}
    >
      Submit Code
    </button>
    
    <h2>Results:</h2>
    <pre style={{ 
      background: 'var(--card-bg)', 
      color: 'var(--foreground)', 
      padding: '15px', 
      borderRadius: '6px', 
      whiteSpace: 'pre-wrap', 
      border: '1px solid var(--border-color)', 
      minHeight: '60px',
      fontFamily: 'monospace'
    }}>
      {feedback}
    </pre>
  </div>
  );
}