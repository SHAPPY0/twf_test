## NOTE
Before run this app please read this carefully.


API URL: http://localhost:3000/api/getcost
Method: POST
Request Format:
 [{
	"product":"A",
	"quantity":1
}]

If multiple orders:
[{
	"product":"A",
	"quantity":1
},{
	"product":"B",
	"quantity":2
}]

OUTPUT Format:
{ 
    "success": true,
    "minimum_cost": 44
}

## How to run app

1. After unzip folder open terminal.
2. cd to the root path of this application in terminal.
3. Run `npm install` to download required dependecies.
4. Now run `node app.js` to start Node server.
5. Now you can test the above given api with given reqeuest format.


## NOTE
In this api I just considered some part as static because its a demo test, i.e center's indexing and products details.
