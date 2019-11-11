# weather-app-pwa
This application is developed as a PWA in VueJS. On initial load, locatin of user is found and weather information is displayed for next 7 days. Weather details are retrieved from darksky API (https://darksky.net/dev). User can search for a city/place weather information as well. To get city/place latitude and longitue, google map geocode API is used (https://maps.googleapis.com/maps/api/geocode/json).  

## Project setup
```
npm install
``` 
### Customize configuration
API keys for darksky and google geocode are placed in .env file. They are excluded from commit. To run locally create a .env file at root folder and define keys VUE_APP_GEOCODE_API_CODE and VUE_APP_DARKSKY_API_CODE

### Features available
1. 7 day forecast based on current location (user has to give permission to share location)
2. Summary information, Min and Max temperature of the day and their timings are shown for daily forecast. An icon indicating the summary is also shown.
3. Searched result is saved into localstorage for offline usage.
4. A red information bar is show if user is not online
5. User can search for hourly forecast of selected city which will give data for next 48 hours
6. Both daily and hourly information can be searched for any place as long as goole API gives latitude and longitude information
7. User can save a city to favourites. This information is saved in localstorage
8. User can view cities in current favourites.

### Next steps and future features
1. To use the application without CORS issue proxy server needs to be set up (https://darksky.net/dev/docs/faq#cross-origin). 
   NodeJS and Express can be used to do this.
2. Users can select city from saved favourites which will give result for the selected city
3. Input for city can be replaced with an autocomplete box giving input for valid places from another API
4. Styling and overall design of screen can be improved

### List of open source, frameworks, APIs
1. Sample pwa with VueJS and Ionic -https://github.com/bradtraversy/zip-info-pwa 
2. To get coordinates of a location - https://maps.googleapis.com/maps/api/geocode/json 
3. To get forecast based on coordates - https://api.darksky.net/
4. NPM Package manager for vue cli, skycons, vue-offline, vetur - https://www.npmjs.com/ - 
5. https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9 - darksky API prevents      CORS error. This link explains about possible work arounds.
6. VueJS (Modern Web Framework) – https://vuejs.org 
7. VueJSCLI (CLI to create and manage project) – https://cli.vuejs.org/guide/installation.html
8. https://firebase.google.com/ -This pwa is deployed in firebase at https://weatherapp-2be90.firebaseapp.com/
9. Ionic 4 for styling - https://ionicframework.com/blog/introducing-ionic-4-ionic-for-everyone/




