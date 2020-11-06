# All Issues Page Testing
This component provide a interface allow the librarian to check all issues form submitted by users.

## Test cases
### Test case 1
- Description: Check all issues display in table
- Pre-Conditions: Logged in as librarian
- Action: Click view issues button in setting under dashboard
- Expect Behavior: All issues are listed base on priority
- Actual Behavior: All issues are listed base on priority

### Test case 2
- Description: Check if the newest submit issue appear
- Pre-Conditions: Logged in as librarian
- Action: Submit a issue form, click view issues button in setting under dashboard
- Expect Behavior: The newest issue appear in the table
- Actual Behavior: The newest issue appear in the table

### Test case 3
- Description: Check view link for issue detail
- Pre-Conditions: Logged in as librarian
- Action: click view issues button in setting under dashboard, click view link at a random issue
- Expect Behavior: Redirect page to issue form detail for the selected issue
- Actual Behavior: Redirect page to issue form detail for the selected issue