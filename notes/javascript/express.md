# Express
Express is a "fast unopinionated minimalist web framework for Node.js"

Why do we need a Web framework and what is it?
Well, it would be really annoying to have to build a web server from scratch and have to implement all the little bits of http, create the headers and body and deal with the network layer and all that.
A web framework is just someone has already done all of that for us.

Express is unopinionated, it only deals with the web framework, you set up your application how you see fit.

#### Quick aside into Java Space
In Java world, we have a web framework called Spring Boot. Spring Boot is a *very* opinionated framework, and what that means is that it makes a lot of decisions about how your app is set up, configured, and ran, for you. You just fill out what it can't.

## Setup
1. Navigate to project folder
2. npm init
   1. entry point: app.js
3. `npm install express --save`
4. `npm install`
5. `npx express-generator`
6. (Install all the other stuff we need, like jest, and aws-sdk and typescript)

## Middleware
Software that intercedes on your behalf to accomplish some kind of goal that the base software does not.

body-parser, cookie-parser, and express-session middleware.
body-parser will parse the body of a request as a json string into a JavaScript object for you automatically. This middleware is actually deprecated as this is now a feature of Express.js itself.

cookie-parser will parse cookies from the browser and allow you to create them.

express-session will manage a session. Can interact poorly will cookie-parser, as it does its own cookie processing.

## Sessions
A way to save state for a web-based application. Storing information for each individual user on the server itself.

http is stateless. There's no real way to save information from request to request barring some other solution.

How do we save whether or not we're logged in, and what we're doing? 

1. Uniquely identify the user
2. Save information in an object that we can look that user up in.
3. Find some way to associate the identity information with each http request.

### How to uniquely identify the user?
Create a uid that you associate with the user.
### How to have session storage?
Create some kind of map. Have all the user's session information in the map with the uid as a key.
### How to save identity information?
1. Cookies

Small piece of information stored on your browser that gets sent to the server (specifically associated with it) with every request you make. 

By default the browser only sends a cookie to the server that created it.

Stored in the browser. Doesn't go away until cookies are cleared.

2. Hidden Form Fields

Adding a hidden form field that contains the session id for the user that gets submitted whenever the user submits a form.

If the user navigates away, or doesn't submit a form, they will have to reauthenticate as the id will have been lost.

3. URL Rewriting

Physically altering the url of the webpage to include information (such as a session id) about the user.

If the user navigates away, they will have to reauthenticate as the id will have been lost.
