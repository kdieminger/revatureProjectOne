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