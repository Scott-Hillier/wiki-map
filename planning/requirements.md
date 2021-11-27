# Option 1: Wiki Map
A web app that allows users to collaboratively create maps which list multiple "points". 
For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

# Requirements
- users can see a list of the available maps
- users can view a map
- a map can contain many points
- each point can have: a title, description, and image
- authenticated users can create maps
- authenticated users can modify maps (add, edit, remove points)
- users can favourite a map
- users have profiles, indicating their favourite maps and maps they've contributed to
- use http://leafletjs.com/ or https://developers.google.com/maps/

Stretch:
- user can determine if map is modifiable

# Stack Requirements
- ES6 for server-side (NodeJS) code
- NodeJS
- Express
  - RESTful routes
- One or more CSS or UI "framework"s:
- jQuery
- A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
- PostgreSQL and pg (with promises) for DBMS
- git for version control
