# Signup Page Testing
This component handle sign up new account

## Test cases
### Test case 1
- Description: Direct to Login page
- Pre-Conditions: None
- Action: Click Login Link
- Expect Behavior: Direct to Login page
- Actual Behavior: Direct to Login page

### Test case 2
- Description: Signup account with name, unique email address, and password
- Pre-Conditions: None
- Action: Fill out name field, Fill out email address field, Fille out password, Click Submit button
- Expect Behavior: Signup successfully, Redirect page to login page
- Actual Behavior: Signup successfully, Redirect page to login page

### Test case 3
- Description: Signup with exist email address
- Pre-Conditions: None
- Action: Fill out name field, Fill out duplicate email address field, Fille out password, Click Submit button
- Expect Behavior: Signup Failed, Email already exist message display
- Actual Behavior: Signup Failed, Email already exist message display

### Test case 4
- Description: Signup with name, email, leave password field blank
- Pre-Conditions: None
- Action: Fill out email address field, Fill out name field, Click Submit button
- Expect Behavior: Password field highlight in red, notify user for unfilled field
- Actual Behavior: Password field highlight in red, notify user for unfilled field