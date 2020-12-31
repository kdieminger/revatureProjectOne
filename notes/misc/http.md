# Http
Hyper-text transfer protocol.
protocol - A set of rules for communication.
A set of rules for the transfer of hyper-text.
Originally designed for the transfer of html documents via the internet.

## Protocol
Define what you're allowed to transfer and how you transfer it. Also what happens when something goes wrong.

### Structure
To use the http protocol we need to create an http request, and the response to that request is an http response.
#### Http Request
Consists of a head and a body.
The head contains meta-data such as what method we are sending, the address of the server we are sending the request to, and optionally a bunch of other information about the request.
The body contains the actual subject of the request, usually the data we are sending to the server.
#### Http Response
Consists of a head and a body.
The head contains meta-data such as the status code of our request and some other information.
The body contains the response, usually in the form of an html document but sometimes just data.
### Http Methods
Define how we transfer information and what the receiver is meant to do with that information.

*Idempotent* - An operation that has the same result, no matter how many times you execute it.
```JavaScript
i = 5; //assignment operation in js is idempotent
i = 5;
i = 5;
i = 5; // i is still equal to five

let arr = [];
arr.push(5); // [5]
arr.push(5); // [5, 5]
arr.push(5); // [5, 5, 5] push function is not idempotent
```

[I] - Idempotent, [N] - Not Idempotent

* GET - [I] - Retrieves data from the server, and has no information in the body of the request.
* POST - [N] - Creates or appends information to a collection on the server. We don't usually know the ultimate location of a post, the response should tell us where the new resource is.
* PUT - [I] - Replaces information at a location on the server, we specify where that resource should be created.
* DELETE - [I] - Removes data from a specific location on the server.
---
* PATCH - Meant to update/replace part of a resource
* CONNECT - Trying to establish a connection.
* TRACE
* OPTIONS - Attempting to establish what methods are allowed for a resource.
* HEAD - [I] - Retrieves just header information from the server, the response will not have any information in the body.

#### Quick aside into REST
##### Collection
Is a group of like data on the server.
Usually this would look like `http://mywebsite.com/cats`
##### Resource (rest definition)
A specific piece of information on the server.
Usually this would look like `http://mywebsite.com/cats/1`
### URI/URL/URN (http definition)
URI - Uniform Resource Identifier - a string of characters that is used to identify a name or resource on the internet by location, by name, or both.
URL - Uniform Resource Location - A URI that specifies *where* a resource is available and how to retrive it. A URL has to specify the protocol and the domain. ex. `http://mywebsite.com` or `http://mywebsite.com/cats/1`
URN - Uniform Resource Name - A URI that specifies a unique name for a resource. ex. `/cats/1` or `http://mywebsite.com/cats/1`

`http://mywebsite.com/cats/cat.html`
### Status Codes - The server speaks to you.
#### 100 - Information
* 100 - Continue - I've received part of the request, continue sending the rest.
#### 200 - Success
* 200 - Ok - Nothing went wrong
* 201 - Created - I created the resource you requested
* 204 - No Content - I did what you asked, I have nothing to send back.
#### 300 - Redirect
* 301 - Moved Permanently - I'm sending you there, please go there in future instead of here.
#### 400 - Client Error - You did something wrong
* 400 - Bad Request - The request you sent me is ill-formed and/or I don't understand it.
* 401 - Unauthorized - You could have access to this document but are not authenticated (logged in).
* 403 - Forbidden - You do not have access to this document (but might be logged in).
* 404 - Not Found - I do not have this resource you asked for.
* 405 - Method Not Allowed - You can not send a request of that method to that resource (ex. You can't delete /cats)
* 409 - Conflict - This request would invalidate the state of the server. (usually you tried to add something that already exists.)
* 418* - I am a Teapot - You sent a "make coffee" request to me, but I'm a teapot, and can't make coffee.
* 451* - Unavailable For Legal Reasons - Fahrenheit 451 is a book about government censorship, so the status code is a reference to that. Content was taken down because government requested it be removed (usually copyright).
#### 500 - Server Error - I did something wrong
* 500 - Internal Server Error - Usually the code running on the server entered a error state. Maybe it threw an error or something.
* 503 - Service Unavailable - The server went down temporarily.



## Redirect vs Forward
When a browser sends in a request, many things can happen, but you get a response, most of the time.
This response can (in success situations) be either a 200 or 300 level response.
A 300 level response, tells the user to resend the same request to a different location, this is called a redirect.

Normal:
```
Browser => Request => Server => 200 => Browser
```

Redirect:

```
Browser => Request => Server => 300 => Browser => Resend to new location => Server => 200 => Browser
```

In a redirect scenario, the browser sent the request to the wrong place and the server made it resend. 2 requests get sent, 2 responses come back. The URL will change.

In a forward scenario, the browser sends the request to the wrong place, the server sends the request over to that resource itself.

Forward:
```
Browswer => Request => Server => Other part of Server => 200 => Browser
```

One request, one response, the url will not change.