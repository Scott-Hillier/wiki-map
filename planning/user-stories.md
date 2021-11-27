User Stories

According to Andy Lindsay:
- Any logged-in user can edit anyone else's maps
- If you're not logged in, you can't edit, create, or favorite a map, but you can view them

**Logged-in users**
POST /maps/
- can create maps
POST /maps/:id
- can modify (add, edit, remove points) maps
GET /profile/
- can see their profile showing list of favourite maps, and maps they contributed to

**NON-logged-in users**
GET /maps/
  - can view a list of all available maps
GET /maps/:id
  - can view a single map
