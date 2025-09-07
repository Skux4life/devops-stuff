# Potential interview type questions

## AWS

### What are the key differences between EC2, ECS, EKS and Lambda and when would you choose each for deploying applications.

- EC2 - virtual servers
  -- When you need full control over the infrastructure
  -- Legacy applications that need specific OS configurations
- ECS - managed container orchestration service (AWS native)
  -- You want to run containers on AWS but you don't want to deal with Kubernetes
  -- Mostly for microservices
- EKS - managed kubernetes service
  -- Complex microservices
  -- When you have a multi-cloud setup
  -- Portability is important (don't want to be locked into AWS)
- Lambda - serverless functions (FaaS)
  -- Event driven apps that integrate various AWS services together
  -- You don't care about managing the infrastructure/servers

### Describe how you would design a highly available, scalable API infrastructure on AWS. What services would you use and why?

I would want to utilise availablity zones with automated scaling. Monitoring and security are important considerations

#### Traffic management

- API Gateway
  -- Can provide throttling and rate limiting
  -- Request/Response transformation and validation (if needed)
  -- Caching can be configured
- Route 53
  -- Health checks for API gateway endpoints
  -- DNS-based failover between regions

#### Compute Layer

- Lambda
  -- Auto-scaling capability
  -- Cold starts can be mitigated with Provisioned Concurrency
  -- Easy to integrate with other AWS services

#### Data layer

- DynamoDB
  -- Single digit millisecond latency at any scale (performant)
  -- Point in time recovery and on demand backups
  -- DynamoDB streams can be used for real time data processing
- S3
  -- Massive scalability for file storage
  -- Cross region replication for disaster recovery
  -- Aurora Serverless v2
  -- If relational data is needed
  -- Multi AZ deployment for high availability

#### Monitoring

- AWS CloudWatch
  -- provide a lot of metrics
- AWS X-ray
  -- Helpful for request tracing across services
- CloudWatch Dashboards & Alarms
  -- Proactive alerts
  -- Integrates with SNS for notifications

#### Security

- AWS WAF
  -- Provides a lot of security features, can provided rate based rules for DDoS attacks
  -- Geo-blocking and IP Whitelisting/Blacklisting

## CI/CD

## Security

### What is the difference between SAST and DAST and how would you implement them to improve the software development process?

These testing methods are helpful for identifying and resolving potential security vulnerabilities in software applications. Using them in a CI/CD pipeline enables catching these issues before they can be exploited.

#### SAST

- Static Application Security Testing
- Static meaning that the test is performed on the source code and not on the running application
- Bad (from security perspective) coding patterns can be caught early. Possible even before commit or PR.
- Forcing the updating of out of date libraries or changing to use a different package without any known vulnerabilities

Examples of tools
[Snyk Code](https://snyk.io/articles/application-security/static-application-security-testing/)
[Klocwork](https://www.perforce.com/products/klocwork)
[Checkmarx](https://checkmarx.com/)

#### DAST

- Dynamic Application Security Testing
- Dynamic meaning that the test is performed on the running application and not on the source code
- Helpful for detecting misconfiguration in servers/dbs. Can also detect auth and encryption issues. Gives more of an e2e view.
- Requires a full working app so will likely be added post PR merging as one of the automated test phases

Examples of tools
[Snyk](https://snyk.io/product/dast-api-web/)

### How do you implement secrets management in your CI/CD pipelines and cloud infrastructure?

#### DON'T

- Store in code repo
- As plain text in env vars
- In your CI/CD pipeline

#### AWS native options

- AWS Secrets Manager
  -- This is best for app secrets, api keys, db connection strings etc (rotating secrets)
- AWS Systems Manager Parameter Store
  -- This is for config parameters and non-rotating secrets

#### Implementation

This can be done in Github Actions with OIDC

- use the action to configure AWS credentials
- then you can use the aws cli to fetch the secret(s), mask them and potentially add them to env vars
- there is even an github action for getting secrets

## Monitoring and Observability

### What's the difference between monitoring, logging and observability? How do you implement each?

- Monitoring
  -- Collecting and analyzing metrics (System, App, Business)
  -- Answers "What is happening?", "Is it broken?"
  -- Reactive (alerts when something goes wrong)
  -- AWS CloudWatch, Prometheus + Grafana, DataDog
- Logging
  -- Records events and errors (System, App, Access)
  -- Answers "What exactly occured?", "What was the sequence of events?"
  -- Should be structured and include a Correlation ID
  -- AWS CloudWatch Logs, ELK Stack, Splunk
- Observability
  -- Builds on top of monitoring and logging to help you discover unknown problems
  -- 3 Pillars are Metrics, Logs and Traces
  -- Answers "Why did this happen?", "How are all the pieces connectd?"
  -- Distributed Tracing tools - AWS X-Ray, Jaeger, OpenTelemtry
  -- Platforms - Honeycomb, DataDog

## Soft Skills
