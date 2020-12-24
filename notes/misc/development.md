# Development Methodologies

## Software Development Lifecycle (SDLC)
1. I get a little salty about this, you should never express any kind of disinterest or displeasure with the Software Development Lifecycle in an interview, because that's a good way to not get hired, and we do not like hearing that kind of feedback.

The Software Development Lifecycle is the process through which we develop software. It's the idea that software moves through phases.

1. Analysis
   1. System Investigation - We investigate the needs of and for the software. Is it feasible?
   2. Analysis - How does the software solve the problem.
2. Design - Actually plan out how the software will be developed.
   1. Some people claim that Agile skips this step, those people are doing Agile incorrectly.
3. Development - Actually writing code
   1. Set up environments: Should have a Dev, a Test, and a Prod environment at least.
4. Integration and Testing - After the code is written, we perform tests, including integration tests.
   1. Integration Tests - Unit tests test independent pieces of code, Integration tests test large portions of code working together. For example an integration test might test an entire user story.
5. Acceptance - The code is deployed to a UAT (User Acceptance Test) environment and stakeholders can approve it. Once approved the code can be deployed to production.
6. Maintenance - Bug fixes and etc.

## Waterfall
You start with analysis and then you write a huge design document and then you meticulously test and build each individual piece of the application from the ground up and at the very end of the process you put the last piece in and you start it up and it all works because you tested each piece individually.

Building a car: You can't really build half of an engine and use it, and once you're done with the engine, you can't actually do anything with it, because you need to build the rest of the car first.

We start.
A month later, we start writing code.
When do we have something to show our stakeholders? Not until the very end. This could be years.

Pros:
* The product works. Is well-tested, and it's well-designed, and it satisfies the requirements as set out originally.

Cons:
* Nothing to show stakeholders until it is done.
* If requirements change, there's no built-in way to really deal with that.

## Agile
### The wrong ways to do Agile:
* "New requirements came in, throw all the old stuff away, we're never going to commit to anything"
* "Don't waste time designing anything, this is Agile."
* "We think we need to write software to accomplish this task, but research isn't agile, so don't analyze anything"
* "We don't need to do UAT for this, it is Agile."

### What is Agile?
Agile is a software development methodology that prizes the creation of a _*minimum viable product (MVP)*_ at every stage of development.

Building a car: You slap some wheels on a board, and that skateboard isn't a car, but it does roll. We can use that skateboard and then we can develop steering and have a working scooter....

In Agile, development is broken into something called a Sprint.
* Sprint - A length of time (usually between 2 weeks and a month) at the end of which the MVP will have been developed.
* MVP - A working piece of the product, usually consisting of the most important User Stories
* User Stories - A product feature, written out as a set of requirements to consider the product working.
  * User Story Points - Each user story is assigned a point value to represent the difficulty (sometimes complexity) of the story.
    * Linear Scale - 1, 2, 3, 4, 5
    * Fibonacci - 1, 2, 3, 5, 8, 13
    * T-Shirt - xs, s, m, l, xl, xxl..
  * All Associates View
```
As a Trainer, I should have a report view that allows me to see all the usual reports that include all associates with abnormal statuses.

Given I am a Trainer with access to the reports for a batch
When I navigate to the Reports page
Then I can select Trainees(Include Dropped)
And I will see the reports page with all Dropped trainees' scores and QC Audits
And dropped associates will be indicated as such.
```

* Sprint Planning - Usually a meeting, often lasting one or two entire days, where the team plans out what user stories need to be accomplished in the sprint.
  * Sprint Zero - A sprint of just design and framework development.
* Scrumboard (or Kanban) - A graphical representation of the product in terms of user stories and their completion.
  * Product Backlog - The bank of all user stories for the project.
  * Sprint Backlog - The bank of all user stories for the sprint.
  * Dev - User stories that a developer is actively developing.
  * Testing - User stories that a developer has finished coding and is just testing to ensure completion. If testing fails, head back to Dev.
  * Peer Review - User stories that another member of the team is reviewing to ensure completion. (often finds minor typos or mistakes that the original developer just became blind to). If you fail peer review, send back to Dev.
  * Done - User Stories that are complete (have passed peer review)
* Blockers - Any circumstance _out of your control_ that is preventing you from making progress on a user story.
* Burn-down chart - A graph of your total number of outstanding user story points over time.


Agile Ceremonies
* Sprint Planning - see above
* Standup - A (15 minute) (daily) meeting in which each member of the team reports their progress since last standup, reports what they are working on, and reports any blockers 
* Retrospective - Is a meeting usually performed after each sprint, where the team discusses their results. Often you'd be analyzing what went wrong, what you could do better, what went right, why did that go so well, did you accomplish your mvp/goals? etc.

Pros:
* Product is flexible and responsive to new requirements. (new requirements are just added to the backlog)
* Product is in a usable state at the end of each sprint.
  
Cons:
* Product is never truly finished. There is always another sprint, even if the sprint is just bug fixes.
* Product is sometimes (often) extremely buggy, because _less_ time is spent designing.

