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
2. Summary information, Min and Max temperature of the day and their timings are shown for daily forecast. An icon indicating the summary    is also shown.
3. Searched result is saved into localstorage for offline usage.
4. A red information bar is show if user is not online
5. User can search for hourly forecast of selected city which will give data for next 48 hours
6. Both daily and hourly information can be searched for any place as long as goole API gives latitude and longitude information
7. User can save a city to favourites. This information is saved in localstorage
8. User can view cities in current favourites.


