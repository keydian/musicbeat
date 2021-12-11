# Musicbeat Frontend - HCI 21/22

### FOR WINDOWS 
**Requirements**: Have Node and Google Chrome installed.  
**IMPORTANT WARNING**: In order to test our application’s frontend locally, due to the backend being deployed on Microsoft Azure, you will have to have google chrome installed, and open it using the script we will provide (developBrowser.bat). This is to (temporarily) disable the browser’s network security features, to allow the localhost frontend to send requests to the deployed backend. Otherwise, CORS protocols will block your requests and you won’t be able to test the app - the script only runs in Windows.

- Open a terminal in the project’s directory and run:  
`npm i`
- Now the project’s dependencies should be installed, and it’s now ready to run. To start the application locally run: 
`‘npm start’ OR ‘npm run start’`
- Once the development server has started, you can now use the given script to open the browser (do not use the default browser the previous command might have automatically opened), and type `“localhost:3000”` in the link/search bar to go to the app. You should now be in the app’s start page with Login & Register.

### FOR LINUX   
(TODO)
