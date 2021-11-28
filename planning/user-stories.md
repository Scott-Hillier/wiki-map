User Stories

According to Andy Lindsay:

- Any logged-in user can edit anyone else's maps
- If you're not logged in, you can't edit, create, or favorite a map, but you can view them

**Logged-in users**

GET /profile/

- can see their profile showing list of favourite maps, and maps they contributed to

GET /maps/

- can view a list of all available maps
  GET /maps/:id
- can view a single map
  POST /maps/:id
- can modify (add, edit, remove points) map
  - if not creator, becomes contributor
- can favourite map
  GET /maps/new
  POST /maps/
- can create maps
  POST /maps/:id/delete
- can delete map (if creator)

POST /logout

**NON-logged-in users**
GET /maps/

- can view a list of all available maps
  GET /maps/:id
- can view a single map

GET /login
GeT /register

# USER ROUTES; api/users

## Sign in user

PUBLIC GET /:userId/sign-in --> GET request, since we minimize sign-in/up features

## Sign out user

PRIVATE GET /:userId/sign-out

---

# MAPS ROUTES; api/maps

## get all maps

PUBLIC GET /

## get user's maps with user ID

PUBLIC GET /:userId

## get a map with map ID

PRIVATE GET /:mapId

## auth user creates a map

PRIVATE POST /new-map

## auth user deletes a map

PRIVATE DELETE /:mapId

---

# POINTS ROUTES; api/points

## auth user adds a poin in a map with map ID

PRIVATE POST /:mapId/new-point

## get all points from a map with map ID

PUBLIC GET /:mapId

## get a point with map ID && point ID

PUBLIC GET /:mapId/:pointId

## auth user deletes a point with map ID && point ID

PRIVATE DELETE /:mapId/:pointId

---

# PROFILES ROUTES; api/profiles

...
