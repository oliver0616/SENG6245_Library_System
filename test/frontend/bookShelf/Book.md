# Landing Page Testing
This component display specific book detail and comments relate to the book

## Test cases
### Test case 1
- Description: Display all require information for selected book
- Pre-Conditions: user logged in
- Action: Click view book button
- Expect Behavior: Direct to selected book page, display book name, author name, keywords, description, upload time
- Actual Behavior: Direct to selected book page, display book name, author name, keywords, description, upload time

### Test case 2
- Description: Like the book
- Pre-Conditions: user logged in
- Action: Click like button
- Expect Behavior: Button text went from like to liked, color went from blue to green
- Actual Behavior: Button text went from like to liked, color went from blue to green

### Test case 3
- Description: Remove the like
- Pre-Conditions: user logged in
- Action: Click liked button
- Expect Behavior: Button text went from liked to like, color went from green to blue
- Actual Behavior: Button text went from liked to like, color went from green to blue

### Test case 4
- Description: Download book
- Pre-Conditions: user logged in
- Action: Click download button
- Expect Behavior: Browser prompt user for download the book
- Actual Behavior: Browser prompt user for download the book


### Test case 5
- Description: Display all comments
- Pre-Conditions: user logged in
- Action: Click view for selected book
- Expect Behavior: Book detail loaded, all related comments loaded
- Actual Behavior: Book detail loaded, all related comments loaded

### Test case 6
- Description: Submit new comment
- Pre-Conditions: user logged in
- Action: Fill out comment box, Click submit button
- Expect Behavior: Page refresh, new comment appear in the comment section
- Actual Behavior: Page refresh, new comment appear in the comment section

### Test case 7
- Description: Delete comment
- Pre-Conditions: user logged in
- Action: Click delete button for a specific comment
- Expect Behavior: Page refresh, selected comment removed
- Actual Behavior: Page refresh, selected comment removed