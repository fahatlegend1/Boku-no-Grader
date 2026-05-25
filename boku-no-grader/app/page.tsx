'use client';
import { useState } from 'react';

export default function Home() {
  // We track what the student types and the feedback we get back
  const [code, setCode] = useState('print("Hello World")');
  const [feedback, setFeedback] = useState('');

  const submitCode = async () => {
    setFeedback('Grading...');
    
    // We send the code to our backend API route (/api/grade/route.ts)
    const response = await fetch('/api/grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    
    const data = await response.json();
    setFeedback(data.feedback);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>📝 Code Grader Demo</h1>
      <p>Task: Write a Python program that outputs "Hello World".</p>
      
      <textarea 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        rows={10} 
        style={{ width: '100%', fontFamily: 'monospace', padding: '10px', fontSize: '16px' }}
      />
      <br /><br />
      
      <button onClick={submitCode} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}>
        Submit Code
      </button>
      
      <h2>Results:</h2>
      <pre style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap', color: '#111111', backgroundColor: '#ffffff'}}>
        {feedback}
      </pre>
    </div>
  );
}