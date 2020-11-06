# Search Page Testing
This component provide the search functionality allow user to search any book by providing the keywords. The user also have option to choose which field to search.

## Test cases
### Test case 1
- Description: Simple search using the query navigation bar passing
- Pre-Conditions: User logged in, provide search query
- Action: Click search button in navigation bar and redirect to the search page. Provide exist book name
- Expect Behavior: Redirect to search page and matched books are listed
- Actual Behavior: Redirect to search page and matched books are listed

### Test case 2
- Description: Simple search using the query navigation bar passing
- Pre-Conditions: User logged in, provide search query
- Action: Click search button in navigation bar and redirect to the search page. Provide only first word and last word of the book name
- Expect Behavior: Redirect to search page and no result display
- Actual Behavior: Redirect to search page and no result display

### Test case 3
- Description: Complex search using the search page search section
- Pre-Conditions: User logged in, provide search query, select search fields
- Action: Provide a book name search query, select book name, author name, keywords checkbox and click search button
- Expect Behavior: Refresh page, display all books match with book name search query
- Actual Behavior: Refresh page, display all books match with book name search query

### Test case 4
- Description: Complex search using the search page search section
- Pre-Conditions: User logged in, provide search query, select search fields
- Action: Provide only first word and last word of the book name, select book name, author name, keywords checkbox and click search button
- Expect Behavior: Refresh page, display all books match with book name search query, the complex search is able to fetch the book
- Actual Behavior: Refresh page, display all books match with book name search query, the complex search is able to fetch the book

### Test case 5
- Description: Complex search using the search page search section, with only selected checkbox
- Pre-Conditions: User logged in, provide search query, select search fields
- Action: Provide a book name as search query, select only book name
- Expect Behavior: Refresh page, display all books match with book name search query
- Actual Behavior: Refresh page, display all books match with book name search query


### Test case 6
- Description: Complex search using the search page search section, with only selected checkbox
- Pre-Conditions: User logged in, provide search query, select search fields
- Action: Provide a book name as search query, select only author name
- Expect Behavior: Refresh page, display no result
- Actual Behavior: Refresh page, display no result

### Test case 7
- Description: Complex search using the search page search section, with only selected checkbox
- Pre-Conditions: User logged in, provide search query, select search fields
- Action: Provide list of keywords, and check all checkbox
- Expect Behavior: Refresh page, display the list of result base on score
- Actual Behavior: Refresh page, display the list of result base on score

### Test case 8
- Description: Check view link for book result
- Pre-Conditions: User logged in, provide search query, select search fields
- Action: Search for book, click view for a specific book
- Expect Behavior: Redirect page to view selected book detail
- Actual Behavior: Redirect page to view selected book detail