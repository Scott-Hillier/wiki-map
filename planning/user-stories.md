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
