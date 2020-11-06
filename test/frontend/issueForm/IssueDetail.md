# IssueDetail Page Testing
This component display details of the selected issue, which contain issue id, issue title, submitted username, user email, priority and issue description. This page is only accessible by librarian

## Test cases
### Test case 1
- Description: Show all detail of the selected issue
- Pre-Conditions: User logged in as Librarian, pick a specific issue
- Action: Click view for a specific issue in allIssue page, check and see if all fields are getting what it suppose to get
- Expect Behavior: All fields are corresponding to the submitted form
- Actual Behavior: All fields are corresponding to the submitted form

### Test case 2
- Description: Check solved button functionality
- Pre-Conditions: User logged in as Librarian
- Action: Click solved button and click yes in the warning box
- Expect Behavior: The selected issue disappear in the all issue page
- Actual Behavior: The selected issue disappear in the all issue page