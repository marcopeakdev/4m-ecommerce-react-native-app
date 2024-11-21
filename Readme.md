# 4m Ecommerce App

## Features

TBD and more TBD

## Setup Local Environment

This project requires **expo**, **react-native** and **@aws-amplify/cli** to be installed globally:

`npm install -g expo-cli react-native @aws-amplify/cli`

This project uses **yarn** as the package manager.

Run the following command to install all the project dependencies:

`yarn`

Run the following command to install project-level additional packages needed for react-native and async storage:

`yarn add aws-amplify @react-native-community/netinfo @react-native-async-storage/async-storage`

## Android Studio and XCode

In order to review the project on an actual Android Simulator, you will need to download and install [Android Studio](https://developer.android.com/studio).

In order to review the project on an actual iOS device, you will need to download and install Xcode from the app store.

## Backend Environment

This project requires a nodejs application called the "4m Orchestrator" to be running. [More info on the 4m Orchestrator here](https://gitlab.com/4m-apps/4m-orchestrator)

## Connecting to AWS via Amplify

For authentication services and APIs, the AWS Ampify service needs to be initilized and setup:

`amplify init`

```
[Yes] for existing environment
[dev] for the environment
[AWS Access Keys] for the authentication method
Please request the Access Key ID and Secret Access Key
[us-east-1] for the region
```

Running the following command should show you the different Amplify services:

`amplify status`

Run the following command to build your local backend:

`amplify push`

```
Do you want to update code for your updated GraphQL API [Yes]
This will overwrite your current graphql queries, mutations and subscriptions [Yes]
```

This process may take some time and should complete without any errors.

## Running the Application

### expo

Run the following command to start up the application:

`expo start`

Once Expo starts up, you will be prompted to select a simulator (you may also run the application via the expo installed app on your phone by scanning the QR code)

### Android Studio

TBD

### XCode

TBD

## Jira/Gitlab Integration

Adding the jira issue number either in the commit message or description, will automatically display the Gitlab MR in the Jira issue development panel.

For example: `docs(readme): REQ-122 updated readme details`

## Scanning with Sonarqube

SonarQube empowers all developers to write cleaner and safer code. On command, it'll scan the code base and highlight:

- bugs
- code smells (which typically lead to bugs)
- vulnerabilities

The scan will also highlight:

- code coverage based on existing (or not existing unit tests)
- technical debt
- code duplication

Here are the steps to get SonarQube up and running:

- Download and Install Docker
- Download and Install SonarQube (Community Edition)
- Download and INstall SonarScanner
- Be sure to add the bin directory path to your environment variable (keeping in mind that you may or may not need an ending slash or dollar sign):
  '/path-to/sonar-scanner-4.2.0.1873-macosx/bin'

Run the following command to pull the latest docker image of Sonarqube:  
`docker pull sonarqube`

M1 chip macosx:  
`docker pull --platform linux/x86_64 sonarqube`

Run the following command to startup SonarQube:  
`yarn run sonar-start`

Log into Sonarqube at localhost:9000 with admin as the username and the password. Here, you'll want to ensure you you go to Administration > Security > and turn off "Force user authentication"

Click the Create New Project button and following the prompts. For consistency:

Project Name - 4m-Ecommerce-App

Display Name - 4m-Ecommerce-App

When finished, click Setup to continue

Generate a token with whatever name you prefer, and save for safe keeping

Run analysis on your project:

What is your project's main language? "Other"

What is your OS? "Choose which ever is appropriate"
Download and unzip the Scanner for your OS, and add the bin directory to the PATH environment variable. (\*Requires a pre-installed JVM - with the same requirements as the SonarQube server.)

Run the following command to scan the codebase:  
`yarn run sonar-scan`
