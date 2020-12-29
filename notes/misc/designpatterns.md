# Design Patterns
Design Patterns are a procedure or template or method for solving a problem. If you have a problem for which a design pattern exists in your language, you can use it and have it be done.

## Singleton
I have an object (maybe it represents a connection to a database, or it is meant to the single source of truth for some value) and I need to ensure that only one of these objects is ever created.

Obviously in JS we cannot prevent a deep copy from taking place using the spread operator, but we can make so that either the way we created the object either gives the same object we got the first time _or_ we can render the way we originally made it inoperable.

## Factory
I wish to create an object (probably a complicated one), and I'll probably need to do so multiple times, and I don't want to know anything about that object, I really just need something that does what that object does.

A Factory is a class/function that creates an object as a blackbox that we can just use.

### Why create a Factory Function over a class?
You can actually just go ahead and create a class to be your factory, the important part of the Factory design pattern is that the end user doesn't really know about the implementation of the class he is given.

## DAO (Data Access Object)
This design pattern modularizes all access to a data source into a single class/module.
For an example of a DAO, look no further than `InventoryService`.