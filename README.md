## Intro
Before run this app please read this carefully.

I used ``` Node.js ``` to create the server and ``` Express.js``` as framework to create the api.

**API**: ``` http://localhost:3000/api/getcost ```

**Method**: ```POST```

**Request Format**:
 ```
 [{
	"product":"A",
	"quantity":1
}]
```

**If multiple orders**:
```
[{
	"product":"A",
	"quantity":1
},{
	"product":"B",
	"quantity":2
}]
```

**OUTPUT Format**:
```
{ 
    "success": true,
    "minimum_cost": 44
}
```

## How to run app

1. Download the source code from this github link and unzip.
2. After unzip folder open terminal.
3. Change Directory to the root of this source code in terminal.
4. Run `npm install` to download required dependecies.
5. Now run `node app.js` to start Node server.
6. Now you can test the above given api with given request format in postman.


## NOTE
In this api I just considered some part as static because its a demo test, i.e center's indexing and products details.
