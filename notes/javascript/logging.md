# Logging
What is logging? The recording of events and the time in which they occurred to leave a "log" or record with which we can reconstruct problems.

## Old and Busted
Ephemeral and Impactful:
console.log(variableName); <- Checking to see what the value of something is at a certain point.
It prints to the console and then it is gone.
It exists in your code and happens when it is run no matter what environment you are in.

## New and Cool
Permanent and Configurable:
log.debug(variableName); <- Same as above
It prints to the console (if you want it to) and to a file (if you want it to).
It is configurable so that when you move to a different environment you can turn certain statements off.

## log4js
A logging utility that supports Node.

### Setup
1. `npm install --save log4js`
2. Create a `logconfig.json`.


### Logging Levels
* ALL - Everything gets logged.
* TRACE - Fine grain details of everything in the application.
* DEBUG - This is what you should turn your debug console.logs into.
* INFO - High-level alerts about changes to the application. (user stories)
* WARN - Something bad happens but it doesn't result in an error. (someone tried to log in unsuccessfully 3 times.)
* ERROR - Logging errors (that don't result in the program ending).
* FATAL - Logging situations that will result in the program terminating.
* OFF - Logging nothing.

Logging levels are cumulative. ERROR includes FATAL. DEBUG includes INFO, WARN, ERROR, and FATAL.

If TRACE includes everything why is there an ALL?
* CUSTOM - You can define your own logging levels.