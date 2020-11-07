# Add Book Page Testing
This component provide the functionality of edit exist book for librarian

## Test cases
### Test case 1
- Description: Edit exist book with all fields fill out
- Pre-Conditions: Logged in as librarian
- Action: Edit out book name, Edit out author name, Edit out keywords, Edit out description, Upload new book cover, Upload new book pdf, Click submit button
- Expect Behavior: Book updated into database and appear in bookshelf, Notification confirm book edited
- Actual Behavior: Book updated into database and appear in bookshelf, Notification confirm book edited

### Test case 2
- Description: Edit exist book with partial fields blank
- Pre-Conditions: Logged in as librarian
- Action: Edit out book name, Edit out author name, Upload new book cover, Upload new book pdf
- Expect Behavior: Browser highlight empty fields and notify those are required
- Actual Behavior: Browser highlight empty fields and notify those are required

### Test case 3
- Description: Edit exist book with partial book cover and pdf blank
- Pre-Conditions: Logged in as librarian
- Action: Edit out book name, Edit out author name, Edit out keywords, Edit out description
- Expect Behavior: Browser highlight book cover and book pdf fields and notify those are required
- Actual Behavior: Browser highlight book cover and book pdf fields and notify those are required

### Test case 4
- Description: Delete Book
- Pre-Conditions: Logged in as librarian
- Action: Click delete Book button, Click yes for warning box
- Expect Behavior: Book got deleted, disappear on the bookshelf
- Actual Behavior: Book got deleted, disappear on the bookshelf