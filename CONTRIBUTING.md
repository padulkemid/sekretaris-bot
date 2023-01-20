## General Guidelines

- Make sure all the commands you create passed the unit tests.
- Branches and stuff are set to be 90% passing score, this will ensure code
    functionality to be the best.
- Please make sure your code is **DRY** as possible and keep **Separation of
    Concern** as you develop. 
- Please write all the codes, comments, PRs, Issues, and anything related here
    in english.

## Commands

- All commands are registered in `./configs/commands.yaml`.
- All commands are created in `./src/command/action/`, use this folder to place
    the commands you needed. It'll be automatically registered once the server
    starts.
- Pay attention to the `key` in `commands.yaml` as you required to have `name`
    and `description` so the commands are in par with the usage.

## Workflow

- For a feature branch, it should be named e.g: `feature/list-addon` -> as in
    `feature` then followed by a `/` (slash) then a minimum brief about the
    feature.
- Anything other than feature (e.g: bugfix, techdebt, tech, etc.) also could be
    stated in the branch. (e.g: `bugfix/fix-commands`).
- Address any Issues or PRs by using the template and add @padulkemid as
    reviewer, or dm @padulkemid in discord (`padulkemid#0001`) to address any concern that you had
    been doing.

## Structure

- We're using ***Clean Architecture*** as our guidelines to add features and as
    we develop, this should be our structure. Keep in mind you need to separate
    the concern between functions as one function should only do one thing.
- We could put `__mocks__` as our mocked unit test data inside your feature and
    `__tests__` as the example of available code right now.

## Pull Requests

- We're using a template which is you should follow in order to ease reviewer
    about what code should merge and run.

