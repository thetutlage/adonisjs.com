---
permalink: guides/security/introduction
group: Application Security
---

# Introduction
AdonisJS has a strong emphasis on security. We make sure that the core of the framework is free all known vulnerabilities and also provide you with enough tools and recommendations to keep your applications secure.

## Web Security
Common web attacks

## Setup
All of the security guards are implemented by a first party package `@adonisjs/shield`. This package is pre-configured for Web application boilerplate created using `npx` or `yarn create`. 

Open `.adonisrc.json` file and check if `@adonisjs/shield` is registered under the providers array or not.

```json{5}
{
  "providers": [
    "@adonisjs/core",
    "@adonisjs/session",
    "@adonisjs/shield"
  ]
}
```

[note]
Shield provider relies on [Sessions](sessions#setup), so make sure that the session package is installed and configured.
[/note]


### Install the Package
Install the `@adonisjs/shield` package from npm registry using the following command.

[codegroup]
```sh{}{npm}
npm i @adonisjs/shield@alpha
```

```sh{}{yarn}
yarn add @adonisjs/shield@alpha
```
[/codegroup]

### Invoke Generator
AdonisJS packages can configure themselves by running the post install instructions. Run the following command to setup `@adonisjs/shield` package.

```sh
node ace invoke @adonisjs/shield

#    create    config/shield.ts
#    update    tsconfig.json
#    update    .adonisrc.json
# ✔  create    ace-manifest.json
```
