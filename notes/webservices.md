# Service Oriented Architecture (SOA)
An application designed to be accessed by another application as a service. Primarily a Business to Business (B2B) use case.
ex. Grubhub exposing an API for China Express to consume. Equifax exposing an API so a car dealership can access your credit score.
## Properties of SOA
1. It represents a business outcome 
    1. Trying to access a functionality of the business (ex. Claiming an order/Calculating a credit score)
2. It is self-contained. (the client only sends one request to one server.)
3. A Black-box to consumers.
   1. Input comes in (you know what input it needs, somehow. ex. your ssn)
   2. Output comes out (you know roughly what kind of thing is going to come out. ex. credit score)
   3. You don't know what happens in between (how the score was calculated)
4. It may consist of other underlying services. (the credit score service can call another service for information it needs.)

# Web Services
An application designed to be accessed by another application as a service over the internet.
SOA over the internet.

## SOAP
Simple Object Access Protocol

THIS IS A PROTOCOL
Defines a way to request and recieve responses for accessing resources on the service.

Rigidly defined (in XML) service that communicates in XMl.

Envelope (a message written in XML) that we send using a transport protocol of our choice (BEEP, HTTP, SMTP, FTP, etc), the server then can respond with it's own Envelope as defined in the WSDL. 

The WSDL (Web Service Definition Language/ Web Service Description Language) is an XML document that defines everything about the service. It defines what messages can be received, what the responses to those messages will look like, what will happen in the event of errors, what the resources that the server controls looks like, and etc.

The WSDL is so detailed that you can complete generate a SOAP client application just by reading it.

The WSDL is required and necessary for SOAP, and it must be able to be read from the service.

## REST
REpresentational State Transfer

IS AN ARCHITECTURE

Defines a way to build an application utilizing HTTP to access the "representational state" of an entity.

### Representational State

A copy of the state of an entity.

Not necessarily (and usually not) the entity itself, as that only exists on the server or the database.

We can use this copy to mutate or replace or create entities in the service.

### Interface

HTTP/S: We access the application by sending GET, PUT, POST, DELETE, PATCH, OPTIONS, CONNECT, HEAD, and TRACE methods.

Data can be transmitted in any language agnostic format. We can transfer application state in XML, JSON, or other languages.

### Constraints of a RESTful Architecture
1. Client-Server Architecture
   1. Separated the user interface from the data.
2. Statelessness
   1. The server should not maintain any state. (Grubdash currently keeps login data, this is not stateless)
   2. How do we get around this, though, because we still want to "stay logged in, right?"
      1. We can save session data in a db.
      2. We can use a third-party authentication service like Cognito
      3. We can utilize web tokens (cookies that contain encoded (usually encrypted) information that when processed, can identify you.) (ex. JWT)
3. Cacheability
   1. The ability to cache the data retrieved by the server. Each response ideally would implicitly or explicitly define whether or not it is safe to cache (or save) that data in the client.
4. Layered System
   1. The service can consist of underlying services.
5. Code on Demand (optional)
   1. The service can serve executable code. (sending JS to be run by the client, or serving a Java Applet to be run by the client, or serving a flash program to be run by the client, or even like serving up a c program to be run by the client (which isn't a browser obviously))
6. Uniform Interface
   1. Resource Identification in Requests
      1. We identify our resources through the use of a URI
      2. In the request itself, the uri for the resource can be found
      3. ex. GET to /cats/1 | GET to /restaurants/McDonalds
   2. Resource Manipulation through representations
      1. When we try to update a resource we send a representation of that resource witht he changes we're trying to make to the server. The server then updates the corresponding entity.
      2. ex. PUT to /restaurants/McDonalds but *our version* has an extra menu item.
   3. Self-descriptive messages
      1. GET request should retrieve something
      2. a POST request should create a new entity on the server.
      3. If the `application/json` header is present, the body shoul dbe parsed as JSON
      4. etc.
   4. Hypermedia as the engine of application state (HATEOAS)
      1. we can represent other entities in the service within an entity by providing hyperlinks.

### RESTful API Design

### Collections
https://localhost:3000/restaurants

`/restaurants` is a collection. Any operation on that URI affects the collection as a whole.

#### GET
Returns a representation of all entities in the collection.
#### POST
Create a member entity of the collection. Receive the URI after, usually.
#### PUT
Replaces the ENTIRE collection. (often not allowed)
#### DELETE
Removes the ENTIRE collection. (often not allowed)
#### PATCH
Update the collection with the parts of the collection included in the request.

### Resources
https://localhost:3000/restaurants/McDonalds

`/restaurants/McDonalds` is a specific resource. Any operation done on that URI affects *only* that resource.

#### GET
Returns a representation of that resource.
#### POST
Creates an entity inside of that resource.
ex. Specific thread in a message board `/board/1` has a collection of messages. If I send a post request with a message it will be added to the thread.
#### PUT
Replaces that resource or creates one if it doesn't exist.
#### DELETE
Remove the specific resource
#### PATCH
Update the parts of the resouce with the parts included in the request.

### Guidelines
* Pluralize collections
  * /cats
  * /books
  * /restaurants
  * /octopi
* Don't use verbs
  * Your methods are verbs, don't add them to your uris
  * /cats/1/add-cat is bad
  * /cats/1/kittens is good
  * /restaurants/McDonalds/menu (I can send a post here to add a menu item)
* Make your endpoints descriptive
  * /z/3 is bad (This is something with an id of 3, I think)
  * /cats/3 is fine (This is the cat with id 3)