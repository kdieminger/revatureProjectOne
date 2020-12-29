# Richard's Coding Watchwords
Things I personally think are incredibly and absolutely important when coding.

## Readability
Your code should be easy to read for yourself and for your team. Code that is difficult to read ruins a project.

Unreadable Code is:
* difficult to refactor
* difficult to optimize
* difficult to trace
* difficult to debug


## Modularity
Your code should be broken up into distinct logical pieces that each perform some discrete and well-defined function.

Unmodularized code is:
* difficult to read (Everything is in the same place.)
* difficult to reuse

## Reusability
Don't write the same code twice.

## Loose-Coupling
When we change our implementation, as little code should be affected as possible.
If our code is modularized correctly, changing the implemention of one aspect of our code should not result in many changes to the rest of the code.

Tightly-coupled code is difficult to refactor, difficult to modify to take advantage of new technology or satisfy new requirements.