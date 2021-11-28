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

## Get all user

PUBLIC GET

## Sign in user

PUBLIC GET /:userId/sign-in --> GET request, since we minimize sign-in/up features

## Sign out user

PRIVATE GET /:userId/sign-out

---

# MAPS ROUTES; api/maps

## Get all maps

PUBLIC GET /

## Get a registered user's maps

PUBLIC GET /:userId

## create a map

PRIVATE POST /new-map

## edit a map by auth user

PRIVATE PUT /:mapId

## delete a map by auth user

PRIVATE POST /:mapId

---

# PROFILE ROUTES; api/profiles

## Get a registered user's profiles

PUBLIC GET /:userId
