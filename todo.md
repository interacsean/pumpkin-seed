- abstract common functionality to fe/be-agnostic module
- place in mono-repo situation
- enforce .catch through linting
- handleError(res) as middleware

- Transfer to TSC and eslint based system
- Allow for middleware 
- Example of usecase
- conditionally include swagger-express-middleware based on environment (not on prod)

- root relative stuff
- include linter tsconfig as per prior be
- set up debugging for webstorm / vscode

- figure out index and bootstrap.ts, what are the responsibilities of these.
  gracefully inject configuration
- for api/* structure, if a path should take a get and a post, what then for the
  file structure – maybe named exports from the route file / export an array?
- db stuff
- write example endpoint
- Write the swagger scraper

- Goals.  types work all the way through the stack
  - [_] partialing / currying / composing / pipeline
     (use lodash or ramda)
  - [_] monad functors - map/flatMap/cata
  - [_] from request params through to repo fns / service fns, back to response, type
    needs to flow through
  - [_] flow and linting watchers should enable errors to be picked up early  
