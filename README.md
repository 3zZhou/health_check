# Health_Check App

## Stack

* MERN: MongoDb, Express, React, Node.js

## Compile Guide

* Download project from the git repository

* Make sure already installed Node.js

* Execute 

  ```cmd
  npm start
  ```

  under the "health_check" folder
  
* If there is an error “'react-scripts' is not recognized as an internal or external command” occurred, follow the steps:

  * cd the client folder

  * run 

    ```cmd
      npm install
    ```

    under the "client" folder

  * run 

    ```cmd
      npm start
    ```

    again under the outside "health_check" folder

## Test Cases

| Test Case   Id | Test Procedure                                               | Expected Result                                              |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1              | 1. Run the project<br/>2. Enter url http://localhost:3000/ | Raw data and events from provided API are listed             |
| 2              | 1. Click "Get Raw Data from Db" button                       | A new web tab containing empty JSON data comes up            |
| 3              | 1. Click "Get Events from Db" button                         | A new web tab containing empty JSON data comes up            |
| 4              | 1. Click "Put Raw Data to   Db" button<br/>2. Click "Get Raw Data from Db" button<br/>3. Click "Get Events from Db" button | 1. A new web tab containing one raw data in JSON comes up<br/>2. A new web tab containing three events in JSON comes up |
| 5              | 1. After test case 4, Click   "Put Raw Data to Db" button<br/>2. Click "Get Raw Data from Db" button<br/>3. Click "Get Events from Db" button | 1. A new web tab containing two raw data in JSON comes up<br/>2. A new web tab containing six events in JSON comes up |