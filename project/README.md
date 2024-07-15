# Build React Native App to manage a library.

## Assume that you are using `json-server` with the following `db.json`. Please refer to the directory `server` for details

## Please implement the React Native application that has the following features

1. CRUD Authors

- Create Author: A form to input author details. Ensure no duplicate authors by checking existing records before submission.
- Read Authors: Display a list of all authors. A detail view may be useful for more information.
- Update Author: Allow editing author details through a form, possibly accessed by tapping on an author in the list.
- Delete Author: Provide a method to remove an author, with a confirmation prompt.

2. CRUD Publishers

- Similar to CRUD for authors

3. CRUD Books

- Create Book: A form to add a book including title, genre, category, and selecting authors and publishers from dropdown lists populated with existing entries.
- Read Books: A list or grid view of books with options to filter by various attributes.
- Update Book: Allow modifications to book details via a detailed edit page.
- Delete Book: Enable book removal with confirmation.

4. CRUD Members

- Similar to CRUD operations described above, but include validation to ensure unique ID for each member.

5. Search Book by Title

- Implement a search bar that filters the list of books as the user types, based on the book title.

6. Borrow a Book

- Display a list of books and a list of members. The user selects a book and a member, then confirms the borrowing transaction. Decrease the availableCopies by 1 for the selected book. Prevent borrowing if no copies are available.

7. Return a Book

- Similar to borrowing, but increase the availableCopies by 1 when a book is returned.

8. Develop a Login screen where users can sign in with their email addresses. If the email exists in the database, grant the users access to the library. If not, display a Wrong email message. Implement a feature that keeps users logged in even when they reopen the app. Also, include a function to log out.

## Technical requirements:

1. Utilize react-navigation to structure your application.
2. Use context to share your data if needed
3. Use this component for picking a option in a list: https://docs.expo.dev/versions/latest/sdk/picker/.
4. Leverage CSS with Flex box to ensure responsive and aesthetically pleasing layout throughout the application
5. Provide error handlers or validation if needed.

## Project Requirement

1. It is an individual project; therefore your code should be solely your own.
2. Each person will have 15 minutes to show off your project with me. You only need to run your application and answer my question. You do not need to make any document like PowerPoint. I will send out the specific time later.
3. Submit the final and stable version to Github by 10:00 PM the day before the presentation day.
4. If you have any question, please send me messages on Teams. I will connect with you ASAP from 10:00 AM - 12:00 PM or 1:30 PM - 3:00 PM.
