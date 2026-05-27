import sys
import json

def grade_code():
    # Next.js will pass the student code and the test cases as JSON strings
    student_code = sys.argv[1]
    test_cases = json.loads(sys.argv[2]) # Converts JSON string to Python list
    
    passed = 0
    total = len(test_cases)
    feedback_details = []

    for i, case in enumerate(test_cases):
        test_input = case["input"]
        expected = case["expectedOutput"]
        
        # Inject the test input into the student's code and evaluate it
        # Note: eval() is fine for a local demo, but a cloud version uses safer isolation!
        try:
            # We append a function call to the student's function definition
            execution_string = f"{student_code}\nprint(add({test_input}))"
            
            # Simulated environment execution
            local_vars = {}
            exec(student_code, {}, local_vars)
            user_result = str(local_vars['add'](*eval(f"({test_input},)")))
            
            if user_result == expected:
                passed += 1
                feedback_details.append(f"Test {i+1}: Passed ✅")
            else:
                feedback_details.append(f"Test {i+1}: Failed ❌ (Expected {expected}, got {user_result})")
        except Exception as e:
            feedback_details.append(f"Test {i+1}: Error 💥 ({str(e)})")

    # Print final summary back to Next.js
    print(f"Score: {passed}/{total}")
    print("\n".join(feedback_details))

if __name__ == "__main__":
    grade_code()