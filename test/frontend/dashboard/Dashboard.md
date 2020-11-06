# Dashboard Page Testing
This component allow user to view personal history, use setting relate to account, submit a issue. Librarian setting also include in this page allow them to add new librarian, add book, check users and check issues.

## Test cases
### Test case 1
- Description: Check view book history functionality
- Pre-Conditions: User logged in
- Action: Click dashboard tab in navigation bar, Click View History tab
- Expect Behavior: All view history record appear under View History
- Actual Behavior: All view history record appear under View History

### Test case 2
- Description: Check view book history functionality, check if new record get added
- Pre-Conditions: User logged in
- Action: Click view for a random book in bookshelf page, Click dashboard tab in navigation bar, Click View History tab
- Expect Behavior: New book record appear at the top under View History
- Actual Behavior: New book record appear at the top under View History

### Test case 3
- Description: Check view book history functionality, check if exist record get updated
- Pre-Conditions: User logged in
- Action: Click view for a read book in bookshelf page, Click dashboard tab in navigation bar, Click View History tab
- Expect Behavior: Exist book record got updated and appear at the top under View History
- Actual Behavior: Exist book record got updated and appear at the top under View History

### Test case 4
- Description: Check view book history functionality, check view link for book
- Pre-Conditions: User logged in
- Action: Click view for a specific book
- Expect Behavior: Redirect page to selected book detail
- Actual Behavior: Redirect page to selected book detail

### Test case 5
- Description: Check liked book history functionality
- Pre-Conditions: User logged in
- Action: Click dashboard tab in navigation bar, Click Like History tab
- Expect Behavior: All like history record appear under Like History
- Actual Behavior: All like history record appear under Like History

### Test case 6
- Description: Check liked book history functionality, check add like
- Pre-Conditions: User logged in
- Action: Select a book liked it, Click dashboard, Click Liked history tab
- Expect Behavior: Liked book appear under liked history tab
- Actual Behavior: Liked book appear under liked history tab

### Test case 7
- Description: Check liked book history functionality, check remove liked
- Pre-Conditions: User logged in
- Action: Select a book unlike it, Click dashboard, Click Liked history tab
- Expect Behavior: Unlike book disappear under liked history tab
- Actual Behavior: Unlike book disappear under liked history tab

### Test case 8
- Description: Check liked book history functionality, check view link for book
- Pre-Conditions: User logged in
- Action: Click view for a specific book
- Expect Behavior: Redirect page to selected book detail
- Actual Behavior: Redirect page to selected book detail

### Test case 9
- Description: Check download book history functionality
- Pre-Conditions: User logged in
- Action: Click dashboard tab in navigation bar, Click Download History tab
- Expect Behavior: All download history record appear under Download History
- Actual Behavior: All download history record appear under Download History

### Test case 10
- Description: Check download book history functionality, check add new download record
- Pre-Conditions: User logged in
- Action: Select a book, Click download, Click dashboard, Click download history tab
- Expect Behavior: Downloaded book record appear under download history tab
- Actual Behavior: Downloaded book record appear under download history tab

### Test case 11
- Description: Check download book history functionality, check view link for book
- Pre-Conditions: User logged in
- Action: Click view for a specific book
- Expect Behavior: Redirect page to selected book detail
- Actual Behavior: Redirect page to selected book detail

### Test case 12
- Description: Direct page to change password page
- Pre-Conditions: User logged in
- Action: Click change password button under Setting tab in dashboard page
- Expect Behavior: Redirect page to Change password page
- Actual Behavior: Redirect page to Change password page

### Test case 13
- Description: Direct page to change password page
- Pre-Conditions: User logged in
- Action: Click change password button under Setting tab in dashboard page
- Expect Behavior: Redirect page to Change password page
- Actual Behavior: Redirect page to Change password page

### Test case 14
- Description: Delete user account
- Pre-Conditions: User logged in
- Action: Click delete account under setting in dashboard page, Click yes for warning message box
- Expect Behavior: Account deleted, Redirect to login page
- Actual Behavior: Account deleted, Redirect to login page

### Test case 15
- Description: Direct page to issue form page
- Pre-Conditions: User logged in
- Action: Click Submit issue button under Setting tab in dashboard page
- Expect Behavior: Redirect page to issue form page
- Actual Behavior: Redirect page to issue form page

### Test case 16
- Description: Direct page to add book page
- Pre-Conditions: User logged in as librarian
- Action: Click Add book button under Setting tab in dashboard page
- Expect Behavior: Redirect page to add book page
- Actual Behavior: Redirect page to add book page

### Test case 17
- Description: Direct page to signup librarian page
- Pre-Conditions: User logged in as librarian
- Action: Click Add new librarian button under Setting tab in dashboard page
- Expect Behavior: Redirect page to signup librarian page
- Actual Behavior: Redirect page to signup librarian page

### Test case 18
- Description: Direct page to all user page
- Pre-Conditions: User logged in as librarian
- Action: Click Check all user button under Setting tab in dashboard page
- Expect Behavior: Redirect page to all user page
- Actual Behavior: Redirect page to all user page

### Test case 19
- Description: Direct page to all issues page
- Pre-Conditions: User logged in as librarian
- Action: Click Check issue forms button under Setting tab in dashboard page
- Expect Behavior: Redirect page to all issues page
- Actual Behavior: Redirect page to all issues page