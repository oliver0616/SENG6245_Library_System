# All Issues Page Testing
This component provide a interface allow the librarian to check all users exist in the application.

## Test cases
### Test case 1
- Description: Check all users display in table
- Pre-Conditions: Logged in as librarian
- Action: Click check all user button in setting under dashboard
- Expect Behavior: Redirect the page to all user page, All user display in the table
- Actual Behavior: Redirect the page to all user page, All user display in the table

### Test case 2
- Description: Check if the new user appear in the view user table
- Pre-Conditions: Logged in as librarian
- Action: Create a new user or librarian, and direct page back to view all user page
- Expect Behavior: The created user appear in the table
- Actual Behavior: The created user appear in the table

### Test case 3
- Description: Check delete user functionality in user table
- Pre-Conditions: Logged in as librarian
- Action: click Delete button at the delete column, Click yes for warning box
- Expect Behavior: Refresh page, selected user got deleted
- Actual Behavior: Refresh page, selected user got deleted