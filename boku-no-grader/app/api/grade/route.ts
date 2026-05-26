import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  // We now receive BOTH the student code AND the problemId from the frontend
  const { code, problemId } = await request.json();

  try {
    // 1. Find the path to our local json database file
    const filePath = path.join(process.cwd(), 'problems-db.json');
    
    // 2. Read the file contents
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const database = JSON.parse(fileContents);

    // 3. Look up the specific problem the student submitted
    const problem = database[problemId];

    if (!problem) {
      return NextResponse.json({ feedback: `Error: Problem '${problemId}' not found in database.` }, { status: 404 });
    }

    // 4. Pull the specific test cases for this problem
    const testCases = problem.testCases;

    return new Promise((resolve) => {
      // 5. Spin up Python, passing the code and our dynamically fetched test cases
      const pythonProcess = spawn('python', [
        'grader.py', 
        code, 
        JSON.stringify(testCases)
      ]);

      let result = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.on('close', () => {
        resolve(NextResponse.json({ feedback: result.trim() }));
      });
    });

  } catch (error) {
    return NextResponse.json({ feedback: "Database error occurred." }, { status: 500 });
  }
}