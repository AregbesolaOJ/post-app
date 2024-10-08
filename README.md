# Post App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Objective:

Develop a small webpage that displays posts along with their respective user (creator of the post) and the associated comments. No design or styling is required; focus solely on the functionality.

## Requirements:

Use the following APIs to fetch the necessary data:

- Posts: GET https://jsonplaceholder.typicode.com/posts
- Comments: GET https://jsonplaceholder.typicode.com/comments
- Users: GET https://jsonplaceholder.typicode.com/users

## Instructions:

##### Fetch Data:

- Retrieve posts from the posts API.
- Retrieve comments from the comments API.
- Retrieve user information from the users API.

##### Display Data:

- Display a list of posts.
- For each post, display the user who created the post.
- For each post, display the comments associated with that post.

## Considerations:

- Ensure the app is functional and correctly links posts to their respective users and comments.
- Code quality and structure are important. Organize your code logically and clearly.
- No need to focus on UI/UX design. Simple text representation is enough.

## How to Run Project

To run the app locally:

1. pull this repo
2. install dependencies
   1. Node: use at least Node 16 or version listed in `.node-version`.
   2. Packages: using NPM: `npm install`
3. run the app in dev mode: `npm start`
4. you can now access the app on [localhost:3000](http://localhost:3000)

## User Experience Flow

The `main` branch contains a flow that lets you view all posts with it's respective comments on page load, while the `with-comments-lazyload` branch implements an alternate experience with comments for each post getting fetched per button trigger. Feel free to check out that branch as well.
