# Landing Page Testing
This component check if the jwt token exist in user browser that allow them to access certain page, if not redirect to login

## Test cases
### Test case 1
- Description: Allow user to access certain page after login
- Pre-Conditions: User logged in
- Action: Access page that is using privateRoute component
- Expect Behavior: Redirect to the request page
- Actual Behavior: Redirect to the request page

### Test case 2
- Description: Redirect user to login page
- Pre-Conditions: User are not login
- Action: Access page that is using privateRoute component
- Expect Behavior: Redirect to login page
- Actual Behavior: Redirect to login page