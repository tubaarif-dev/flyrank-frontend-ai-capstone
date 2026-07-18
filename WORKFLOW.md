# FE-03 AI Workflow Comparison

## Overview

For this assignment, I implemented the same Settings Form feature using two different AI prompting approaches.

### Round One (Vague Prompt)

I used a very simple prompt asking the AI to create a settings form with validation. The generated code worked partially, but it lacked several important improvements. The validation was basic, accessibility features were limited, and I had to spend significant time reviewing, fixing, and improving the implementation manually.

### Round Two (Detailed Prompt)

For the second implementation, I started in a fresh AI session and used a detailed prompt that specified:

- exact file names
- reusable component structure
- accessibility requirements
- validation behavior
- responsive styling
- verification requirements

The resulting code was much cleaner and easier to review. The component included controlled inputs, reusable props, accessible labels, proper error handling, responsive CSS, and cleaner React logic.

## Comparison

The detailed prompt produced a significantly better implementation.

Compared with the vague version, it included:

- Better form validation
- Accessible labels and ARIA attributes
- Cleaner component structure
- Reusable props (`initialValues` and `onSubmit`)
- Responsive styling
- Better code organization
- Less manual fixing after generation

Although writing the detailed prompt took longer, it reduced the total review and debugging time.

## AI Mistake I Caught

The AI initially generated nested state update logic that could be simplified. I reviewed the implementation manually before committing and verified the final version locally before pushing to GitHub.

## Lessons Learned

This assignment demonstrated that prompt quality directly affects code quality.

Instead of accepting AI output immediately, I learned to:

- provide clear requirements
- specify constraints
- verify the generated code
- review accessibility
- test functionality before committing

This workflow produces more reliable code with less overall effort.