import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: Request) {
  // Extract the student's code from the incoming request body
  const { code } = await request.json();

  return new Promise((resolve) => {
    // Spin up the local python process and pass the code as an argument
    const pythonProcess = spawn('python', ['grader.py', code]);

    let result = '';

    // Collect the printed text output from the python script
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    // Send the collected text back to the frontend UI once the script finishes
    pythonProcess.on('close', () => {
      resolve(NextResponse.json({ feedback: result.trim() }));
    });
  });
}