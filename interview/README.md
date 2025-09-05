# Interview stuff

## Possible questions

### What is the distinction between CI and CD?

CI: Continuous Integration
CI is to ensure that code is always in a deployable state.
It focuses on the merging and automated testing of each code change.

CD: Continuous Deployment
CD builds on top of the above and takes it further by automating the production deployment.
Each code change can be merged, builds run, tests run and deployed to production automatically.

### Can you explain the difference between a callback and a promise in JavaScript, and how they relate to asynchronous programming

Async programming in JavaScript is a way of writing code that is non-blocking. JavaScript is single-threaded, so it can only execute one task at a time. However, the browser environment and Node.Js make use of an event loop to execute tasks in a non-blocking manner.

Callbacks are functions that are passed as arguments to another function and are executed when that function is called. They are the original way to handle asynchronous operations in JavaScript. One common challenge though is deeply nested code can result from needing to pass callbacks in side callbacks ie callback-hell

Promises are an object that represents the eventual completion (or failure) of an async operation. They allow the use of .then() and .catch() functions.

Async/Await the more modern approach actually makes use of promises to make async code look synchronous.

### How would you use TypeScript interfaces to define the structure of an AWS API Gateways API's request and response payloads?

For the request payload you can define an interface that represents the fields that should be present in the request body (For POST or PUT requests).

```typescript
export interface PostRequest {
  name: string;
  email: string;
  age?: number;
}
```

You could do similar for the response payload.
On top of this you could add some sort of schema validation to add additional validation on top of the interface. For example email is defined as string type but an email address has a particular format so this could be added as a validation rule using something like Zod or similar.

### Can you explain the concept of middleware in the context of an API built with Node.js?

Middleware is a essentially a function that is run at some point in the request lifecycle. From request coming in to response being returned. Happens somewhere in the middle.

If we are talking about Node.js then I have used middleware in a limited fashion in an express app.
Middleware often runs on the request before it gets to the route handler.
Middleware have access to the request (req) and response (res) objects and can make modifications to them.
The middleware function will typically call next() and this will pass the request to the next middleware function or route handler. However, each middleware can also "exit" the chain if you like and send a response.
This is helpful for auth, error, rate-limiting or caching scenarios where you can prevent you route handlers from ever being called.

Some common use cases for middleware would be authentiation, logging, error handling, rate limiting, etc.
In express there's even simple middleware like express.json() to parse JSON bodies.

### How would you use AWS Lambda environment variables to manage configuration settings for an API?

Env variables are helpful to separate the configuration from the code. Particularly around dev, test, prod specific configurations. It's helpful to store settings like an api-key or db-url, sqs queue name, s3 bucket etc that are needed but will differ on the environment.
Feature flags might also be a good use case for env variables. As you can change them without having to redeploy.

As part of the CDK code the lambda will have env variables passed in and access them (process.env.MY_VARIABLE)
The exact variabels that are used will be determined when building the specific CDK stack.

An alternative would be to use AWS systems manager (SSM) parameter store. It introduces extra complexity and network latency but has the benefit or encryption support for senstive data and fine grained IAM control. It also allows config values to be shared across multiple lambdas or other services. If you need to update say a DB connection string you can update it in one place rather than needing to update each env variable for each required lambda.

### Describe the principles of a RESTful API design.

REST (Representational State Transfer) is an architectural style for designing networked applications, especially HTTP-based services. A RESTful API follows these core principles:
Client–Server Architecture: The client and server are independent. The client handles the user interface, while the server manages data storage and logic. This separation allows for scalability and independent development.
Statelessness: Each request from the client must contain all the information needed for the server to process it. The server does not store client context between requests. For example, every API request includes authentication tokens in the header.
Uniform Interface: REST APIs use consistent, standardized URIs and HTTP methods. This includes:
Resource-based URIs (e.g., /users/123)
Manipulation of resources through representations (JSON, XML)
Self-descriptive messages
HATEOAS (Hypermedia As The Engine Of Application State): responses can include links to related actions
Resource-based Design: Resources (nouns) are the primary entities, not actions (verbs). Use plural nouns for endpoints (e.g., /books/45 instead of /getBook?id=45).
Representation: A resource can be represented in different formats (JSON, XML, HTML), negotiated via Content-Type and Accept headers.
Stateless Caching: Responses should indicate whether they can be cached (using Cache-Control, ETag) to improve performance.
Layered System: The client may not know whether it’s connected directly to the server, a load balancer, or a proxy, enabling scalability and security.

### In term of the granularity and composition of APIs, endpoints/routes and operations and how these are structured, decomposed and grouped, what patterns are you aware of to integrate to lambda?

Fine grained - one lambda per endpoint.

- Clear separation of concerns, permission management
- Can mean there's heaps of lambda functions for larger APIs

Coarse grained - one lambda for multiple endpoints (routing logic within lambda)

- Fewer lambdas to manage, easier to share code and dependencies (?)
- Can end up with a monolith in a lambda function

Resource based - one lambda per resource eg: all /users/\* routes use a lambda

- Balances the above 2 approaches

Operation based - one lambda per operation such as all reads in one lambda and all writes in another

- Useful for optimizing cold start times and scaling based on operation type

API Gateway Payload transformation - lean more heavily on API gateway to transform request/response payloads before sending to lambda (VTL templates)

- Removes payload transformation from lambda so reduces code complexity and "weight"

### In AWS Lambda, explain provisioned concurrency and reserved concurrency. How do these parameters affect the performance characteristics of API calls?

Provisioned concurrency keeps a specified number of lambda functions pre-initialized and ready to respond to requests. This helps to eliminate cold starts.

- Helpful for ensuring consistent performance and important if API is latency sensitive.

Reserved concurrency sets a maximum number of concurrent lambda functions. How many can run at once. It will guarantee capacity up to the reserved limit.

- Helpful for critical functions to guarantee capacity (preventing other lambdas in your account hogging all the concurrency available). Also can be used if you only ever want a single lambda to run at a time.

### How are Lambda functions triggered? What integrations are possible? How does the API gateway integration work?

Lambda functions can be triggered by a wide variety of AWS services such as API Gateway, Eventbridge, S3, SNS/SQS, DDB streams, Step Functions, direct invocation etc.

Lambda functions can also integrate with many AWS services to build event driven architectures.

#### API Gateway integration

You can use API gateway with a proxy integration to forward requests to a lambda function.
You can also use API gateway to do request/response payload transformations and then integrate with the lambda function.

### How would you handle cross-origin resource sharing (CORS) for an API build with node.js and AWS API gateway plus Lambda?

CORS is a browser security feature that restricts web applications running on one origin from interacting with resources from a different origin. For APIs built with Node.js⁺ on AWS Lambda behind API Gateway, you need to ensure that the correct CORS headers are returned so browsers allow cross-origin requests.

1. Use API Gateways built-in CORS
   -- This can be enabled in the console or by IaC. API Gateway will automatically add headers like `Access-Control-Allow-Origin`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods` to the response.
2. Handle CORS in the lambda function (Lambda proxy integration)
   -- Lambda function will need to return the appropriate CORS headers.

The key question is if the allowed origins is static (option 1) or dynamic per request (option 2)

### Can you explain how to use JSON Web Tokens (JWT) to authenticate and authorize API requests?

JWT consists of 3 parts

1. Header - contains algorithm and token type
2. Payload - contains claims (user id, roles, expiration etc)
3. Signature - ensures the token hasn't been altered

The steps are as follows:

1. User logs in with credentials
2. Server verifies credentials and returns a JWT token
3. Client stores JWT token (local storage or mem)
4. Client sends JWT in the auth header for each request
5. Server verifies JWT signature and claims, if valid the request proceeds
6. The server can use claims such as role-type for authorization

In Node.js the JWT library you can use is jsonwebtoken. Also bcryptjs for password hashing.

### What pros and cons have you found with CDK to describe and deploy infrastructure?

Pros are often associated with IaC and automation. Dev and Prod environments can be the same. The code and our running infrastructure should always be in sync. No manual intervention required. CDK can be used to deploy to multiple environments (dev, test, prod) and can be used to deploy multiple stacks.

Cons - see this article https://sst.dev/blog/moving-away-from-cdk/

### How would you implement a caching layer for an API built with AWS Lambda and Node.js to improve performance and reduce costs?

1. API Gateway can cache responses at the endpoint/method level reducing the number of Lambda invocations for repeated requests with the same parameters.
   -- This would actually be useful on the investments api as the data changes at most daily.

2. Redis (AWS elastic cache) to store and retrieve frequently accessed data. Lambda functions would connect to a redis cluster to check for cached data and only make expensive operations (like db calls) if no data in the cache.
   -- This introduces more complexity though (and also cost in a different way)

3. Warm lambda. This is where a lambda function stores data in memory for faster access.
   -- This only works for requests to the same lambda instance.
