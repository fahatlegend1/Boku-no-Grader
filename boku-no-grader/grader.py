import sys

def grade_code():
    # Read the code passed from Next.js
    student_code = sys.argv[1]
    
    # For a simple demo, let's see if they printed "Hello World"
    if 'print("Hello World")' in student_code:
        print("Success: 100%")
    else:
        print("Failed: Your code must print 'Hello World'")

if __name__ == "__main__":
    grade_code()