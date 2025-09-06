# Potential interview type questions

## AWS

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

## Soft Skills
