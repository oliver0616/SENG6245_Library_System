# Login Page Testing
This component handle login authentication

## Test cases
### Test case 1
- Description: Direct to Signup page
- Pre-Conditions: None
- Action: Click Register Link
- Expect Behavior: Direct to Signup page
- Actual Behavior: Direct to Signup page

### Test case 2
- Description: Login with exist email address and correct password
- Pre-Conditions: None
- Action: Fill out email address field, Fille out corresponding password, Click Submit button
- Expect Behavior: Login token created successfully, Redirect page to bookshelf page
- Actual Behavior: Login token created successfully, Redirect page to bookshelf page

### Test case 3
- Description: Login with exist email address and incorrect password
- Pre-Conditions: None
- Action: Fill out email address field, Fille out incorrect password, Click Submit button
- Expect Behavior: Login token created Failed, Password incorrect message display
- Actual Behavior: Login token created Failed, Password incorrect message display

### Test case 4
- Description: Login with random email address and random password
- Pre-Conditions: None
- Action: Fill out email address field, Fille out password, Click Submit button
- Expect Behavior: Warning message display, email not found
- Actual Behavior: Warning message display, email not found

### Test case 5
- Description: Login with email, leave password field blank
- Pre-Conditions: None
- Action: Fill out email address field, Click Submit button
- Expect Behavior: Password field highlight in red, notify user for unfilled field
- Actual Behavior: Password field highlight in red, notify user for unfilled field