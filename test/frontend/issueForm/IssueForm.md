# IssueForm Page Testing
This component allow user to submit a Issue using the created form

## Test cases
### Test case 1
- Description: Submit the issue form with all fields fill out
- Pre-Conditions: User logged in
- Action: Fill out title field, Select priority, Fill out issue description, click submit
- Expect Behavior: Reset the form, check if the request go through correctly if so display the notification
- Actual Behavior: Reset the form, check if the request go through correctly if so display the notification

### Test case 2
- Description: Submit the issue form with title blank
- Pre-Conditions: User logged in
- Action: Select priority, Fill out issue description, click submit
- Expect Behavior: The browser stop user from submit the form and highlight the title field red
- Actual Behavior: The browser stop user from submit the form and highlight the title field red

### Test case 3
- Description: Submit the issue form with description blank
- Pre-Conditions: User logged in
- Action: Select priority, Fill out issue title, click submit
- Expect Behavior: The browser stop user from submit the form and highlight the description field red
- Actual Behavior: The browser stop user from submit the form and highlight the description field red