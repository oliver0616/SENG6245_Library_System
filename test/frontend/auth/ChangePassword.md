# Change Password Page Testing
This component allow user to change their password

## Test cases
### Test case 1
- Description: Change user password
- Pre-Conditions: User logged in
- Action: Fill out new password field, Fill out confirm new password field, Click Submit button
- Expect Behavior: Form reset, notification pop up password has been changed
- Actual Behavior: Form reset, notification pop up password has been changed

### Test case 2
- Description: Fill out different password in confirm password field
- Pre-Conditions: User logged in
- Action: Fill out new password field, Fill out confirm new password field with different string, Click Submit button
- Expect Behavior: The warning message appear remind user password doesn't match
- Actual Behavior: The warning message appear remind user password doesn't match
