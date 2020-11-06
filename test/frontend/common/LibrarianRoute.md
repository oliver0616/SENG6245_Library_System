# Landing Page Testing
This component control librarian access only pages. If user is not librarian it will redirect them to dashboard page

## Test cases
### Test case 1
- Description: Allow librarian to access the page
- Pre-Conditions: Logged in as librarian
- Action: Access any librarian only page
- Expect Behavior: Redirect to request page
- Actual Behavior: Redirect to request page

### Test case 2
- Description: Block regular user from access librarian only page
- Pre-Conditions: Logged in as regular user
- Action: Access any librarian only page
- Expect Behavior: Redirect to dashboard page
- Actual Behavior: Redirect to dashboard page
