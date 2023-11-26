# WebFrameTech-AssignmentApi

TO RUN THE CODE
•	Npm install
 •Mongo Url is present in db.js in Database folder kindly replace it accordingly the function provided
•	Replace JWT_SECRET with your own secret key by providing .env file
•	Change mongo url with your own local url and empty Connection function argument or replace DB_USERNAME and DB_PASSWORD with your own mongoAtlas info.
•RUN	Node index.js in terminal 


User SignUp-
Api EndPoint  -  127.0.0.1:3000/api/v1/user/signup
Required Field-
•	Name,email,password,passwordConfirm
Output Generated
•	Json output 
•	token
Jsonweb token is generated which is valid for an hour

User Login-
Api EndPoint  -  127.0.0.1:3000/api/v1/user/login
Required Field-
•	email,password
Output Generated
•	Json output 
•	token
Jsonweb token is generated which is valid for an hour




createTask 
API end point- 127.0.0.1:3000/api/v1/task/createtask
User need to  authenticated to create task = ProvidedProtect route middleware
So bearer token is required
Required Field-
•	title ,description,duedate,assigneduser
Output Generated
•	Json output 


GetAll task 
API end point- 127.0.0.1:3000/api/v1/task/getAllTask
Output Generated
•	Json output 


Get task by id- 
API end point -127.0.0.1:3000/api/v1/task/getOneTask/:id
Output Generated
•	Json output 

Update task
API end point -
127.0.0.1:3000/api/v1/task/updateTask/:id
Output Generated
•	Json output 

Delete Task-
API end point -
127.0.0.1:3000/api/v1/task/deleteTask/:id
Output Generated
•	Json output 

Task Stats

API end point -

127.0.0.1:3000/api/v1/task/lastSevenDayCompleted
Output Generated
•	Json output 
