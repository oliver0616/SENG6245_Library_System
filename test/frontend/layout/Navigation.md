# Navigation Bar Testing
This component provide the simple search, navigate to Bookshlef, Dashboard and logout function

## Test cases
### Test case 1
- Description: Log user out of the web application
- Pre-Conditions: User logged in
- Action: Click logout button
- Expect Behavior: Remove jwt token in local storage, redirect page to login page
- Actual Behavior: Remove jwt token in local storage, redirect page to login page

### Test case 2
- Description: Direct to Dashboard page
- Pre-Conditions: User logged in
- Action: Click Dashboard button
- Expect Behavior: Direct to Dashboard page
- Actual Behavior: Direct to Dashboard page

### Test case 3
- Description: Direct to BookShelf page
- Pre-Conditions: User logged in
- Action: Click Dashboard button
- Expect Behavior: Direct to BookShelf page
- Actual Behavior: Direct to BookShelf page

### Test case 4
- Description: Store user input search query and pass it, direct to search page
- Pre-Conditions: User logged in, provide search query
- Action: Input search keywords query, and click search button or enter
- Expect Behavior: Direct to Search page with the query
- Actual Behavior: Direct to Search page with the query