# Add Book Page Testing
This component provide the functionality of adding new book for librarian

## Test cases
### Test case 1
- Description: Add new book with all fields fill out
- Pre-Conditions: Logged in as librarian
- Action: Fill out book name, Fill out author name, Fill out keywords, Fill out description, Upload book cover, Upload book pdf, Click submit button
- Expect Behavior: Book added into database and appear in bookshelf, Notification confirm book added
- Actual Behavior: Book added into database and appear in bookshelf, Notification confirm book added

### Test case 2
- Description: Add new book with partial fields blank
- Pre-Conditions: Logged in as librarian
- Action: Fill out book name, Fill out author name, Upload book cover, Upload book pdf
- Expect Behavior: Browser highlight empty fields and notify those are required
- Actual Behavior: Browser highlight empty fields and notify those are required

### Test case 3
- Description: Add new book with partial book cover and pdf blank
- Pre-Conditions: Logged in as librarian
- Action: Fill out book name, Fill out author name, Fill out keywords, Fill out description
- Expect Behavior: Browser highlight book cover and book pdf fields and notify those are required
- Actual Behavior: Browser highlight book cover and book pdf fields and notify those are required