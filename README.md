# assignment
to start the server first download the zip 
later type"npm i" to install all dependencies
then type "node server.js"

routes
(get) profile/ to retrive all details of the profile
(post)profile/signup to register new user
(post) profile/signin to login after sucessful login the jwt is returned which is to be placed in request header under authorization parameter
(put) profile/edit to edit profile
(delete) profile/delete to delete the user

(get) todo/ to retrive all todos of the loged in user
(get) todo/:id to retrive todo of the id passed in querey

(post) todo/add to add new todo
(put) todo/edit/:id to edit a todo
(delete) todo/delete to delete a todo
