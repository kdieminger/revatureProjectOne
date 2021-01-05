# Rendering a Web Application
Where are we running code and generating our views?

## Server-side rendering
### Pros
* Easier to secure as we can process data before we send it.
* Doesn't care about client's processing potential.
### Cons
* Because it is running on the server, we need more processing power.
* Can be slow.
### Templating Engine
Code that creates a dynamic view on the server and then sends it to the user.
## Client-side rendering
### Pros
* Fast - the server does less processing, and the client just gets the data it needs and processes it.
* Cheap - I'm not paying for the beefiest servers, saving me money.
### Cons
* Client must enable JS, and must be able to run the code I have created.
* Hard to secure - Need more server-side checks of data
### Client-side application
Code that creates a dynamic view running in the client's browser.