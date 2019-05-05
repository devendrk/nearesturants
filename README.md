#### neaResturants
- This app is made as an assignment while learning ajax.
- It shows the Resturant Name, how far it is from you and menus if available.
- you might need to enable  gps on your device to  see all its feature.

 

 ## Below is Error logs and way how it was solved.
-  In case of ERROR like below 
```js 
error: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://internet.derp' is therefore not allowed access.
```
Then Add this before url
``` 
'https://cors.io/?HTTP://URL
```