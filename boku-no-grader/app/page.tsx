'use client';
import { useState } from 'react';

export default function Home() {
  // 1. Keep track of which problem is currently selected
  const [problemId, setProblemId] = useState('two-sum');
  const [code, setCode] = useState('def add(a, b):\n    return a + b');
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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', color: '#111111', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <h1>📝 Code Grader Prototype</h1>
      
      {/* Problem Selector Dropdown */}
      <label style={{ fontWeight: 'bold' }}>Select Assignment: </label>
      <select 
        value={problemId} 
        onChange={(e) => setProblemId(e.target.value)}
        style={{ padding: '5px', fontSize: '16px', marginBottom: '20px' }}
      >
        <option value="two-sum">Problem 1: Add Two Numbers</option>
        <option value="multiply">Problem 2: Multiply Two Numbers</option>
      </select>

      <hr />

      <h2>{instructionsMap[problemId].title}</h2>
      <p>{instructionsMap[problemId].desc}</p>
      
      <textarea 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        rows={10} 
        style={{ width: '100%', fontFamily: 'monospace', padding: '10px', fontSize: '16px', color: '#111111', backgroundColor: '#ffffff', border: '2px solid #ccc', borderRadius: '4px' }}
      />
      <br /><br />
      
      <button onClick={submitCode} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px', backgroundColor: '#0070f3', color: '#ffffff', border: 'none', borderRadius: '4px' }}>
        Submit Code
      </button>
      
      <h2>Results:</h2>
      <pre style={{ background: '#f0f0f0', color: '#111111', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap', border: '1px solid #ddd', minHeight: '50px' }}>
        {feedback}
      </pre>
    </div>
  );
}