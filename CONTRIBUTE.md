# Contribute
Informations for developper willing to contribute this project.

## Requirements

For development, you will only need Node.js and a node packet manager.

### Node

- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.

- #### Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

    $ sudo apt install nodejs
    
    $ sudo apt install npm

- #### Other Operating Systems

You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    
    v8.11.3
    
    $ npm --version
    
    6.1.0

## Install

    $ git clone https://github.com/ThomLlobEce/nh

    $ cd nh

Then run the following command in order to install both client-side and server-side packages :

    $ npm install
    $ cd Client
    $ npm install
    $ cd ..

## Running the project

    $ npm start

## Simple build for production

The following command builds both ReactJS client app and typescript server app

    $ npm run build

## Project Architecture
```
nh
│   README.md
|   CONTRIBUTE.md
|   LICENSE.md
│   procfile // Used for deployment in Heroku
|   package.json
|   package-lock.json
|   .env // User for deployment in Heroku
|   user.ts // Defining the class User
|   event.ts // Defining the class Event
|   function.ts // Defining & Implementing functions useful for server-side.
|   server.ts // Main app
│
└───Client
│   └───src
|   │   │   package.json
│   |   │   package-lock.json
|   |   |   App.js
|   |   |   App.test.js
|   |   |   index.js
|   |   |   logo.svg
|   |   |   serviceWorker.js
|   |   |   README.md 
|   |   |
│   |   └─── Components
│   |   │   Account.js // Components for route /dashboard
│   |   │   FormSignIn.js // Components for the registration form
|   |   |   FormSignUp.js // Components for the login form
|   |   |   Home.js // Components for route /
|   |   |   HomeInformationItem.js // Components for the pre-footer informations
|   |   |   NavBar.js // Components for the navigation bar
|   |   |   SignUp.js // Components managing the sign up (whether it is for a needer or helper account)
|   |   |
|   |   └─── Images
|   |   |   logo.png
```

