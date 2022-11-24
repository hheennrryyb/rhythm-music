
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Rhythm Music
https://rhythmmusic.netlify.app/

Rhythm music app was created to discover, share and curate playlists! The app is a full-fledged music app with all the core features of a modern music app, such as account authentication, the ability to save and create shareable links, and most importantly discover tunes from a plethora of genres. Rhythm is also fully responsive for all screen sizes with an intuitive and beautifully sleek UI. The project proved to be an incredible undertaking to build out such a feature-rich application with many moving parts. **(1.5 months to develop)**

![Rhythm](https://user-images.githubusercontent.com/79873814/203249486-3794e86f-7cc8-425d-938f-952430830632.gif)


Tech Stack Frontend

-   React JS
    
-   Redux Took Kit – Redux was a treat to use to manage states around the complexities of handling music player functionality and user session data after authentication. RTK query was also used to automate data fetching & caching for CRUD playlist functionality. Although I’ve used useContext API before, RTK will be my go-to for state management for every future project for its amazing features.
    
-   Tailwind – Was entirely done with tailwind, creating the amazing-looking UI.
    

Backend

-   NodeJS, Express - Entire backend was built to handle charts/ genre data, user accounts, shareable links, and many more features.
    
-   MongoDB, Mongoose – MongoDB/mongoose is used to handle storing all user, playlists, and song data. Users are able to register for an account, save playlists, and many more features using this excellent document oriented database.
    
-   Becrypt, JWT – Used to help hashing, comparing, and authenticating users.
