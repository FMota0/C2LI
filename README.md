# C2LI

> A simple cli tool to help during codeforces and atcoder contests.

## Installation

To install c2li you can use npm. <br>
> `npm i -g c2li`

## Basic commands

### Init 
C2li is structured with contests as main purpose. Based on it, when you want to use c2li you have to initialize a contest, using the following command:

> `c2li init contest <judge> <contestId>`

For example:

> `c2li init contest cf 1195`

Creates the following directory structure;

````
1195/
  A/
    .test.json
  B/
    .test.json
  ...
````

The tests are stored in `.tests.json`

### Create

As only Codeforces and AtCoder are supported you can use create to generate the tests structure. 

> `c2li create <name> -p <number_of_problems>`

For example:

> `c2li create unk001 -p 6`

Creates the following directory structure;

```
unk001
  0/
    .tests.json
  1/
    .tests.json
  ...
  5/
    .tests.json
```


### Test

To test a code you need to put your code under the correct problem directory having the desired tests. For testing you can use the following command:

> `c2li test`

Your code need to follow the extensions .cpp (For C++ codes) or .py (for Python codes). You can receive the following verdicts `Correct`, `TLE`, `RTE`, `UNKNOWN` and `Incorrect`.

### Run

If you want to test your code with a test that you are developing: You can use the following command:

> `c2li run`

You just need to type the input and wait for the output. In this mode `TLE` will not be handled.

### Show

To see all the current tests in the directory you can use the following command:

> `c2li show`


### Add

The following command allow the addition of a testcase:

> `c2li add`

You just need to type the input and output in the respective sections. Type two times a new endline to finalize a section.

### Remove

The following command allow to remove a testcase:

> `c2li remove <caseId>`

caseId is the number of the testcase 0-indexed as shown in the show command.

### Change Time Limit

Initiallly the time limit is setted to be 2000 ms (2 seconds). You can change it, using:

> `c2li config set tl <time_limit>`

Where <time_limit> is the desired new time limit in milliseconds. To check the current time limit you can use:

> `c2li config get tl`