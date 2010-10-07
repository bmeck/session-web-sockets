# SessionWebSocket

## Resources

### Server Side

    require("SessionWebSocket")

### Client Side

The client side code is from within this repository

	<script "./example/static/sws.js"></script>

### Usage

* On a server with
* * Connect.session
* * Socket.io

* Get a session verifier

    var sws = require("SessionWebSocket")()

* Setup the server

    var server = connect.createServer(
      ...
      connect.cookieDecoder(),
      connect.session(...),
      sws.http //not a function
      ...
    )

* Setup socket.io

    //put our callback inside of sws.ws(...)
    io.listen(server,sws.ws(function(client){
      //normal socket.io callback
      client.on("secure",function(){
        console.log(client.session) //client.session is now available
      })
      client.on("insecure",function(){
        // fires when a message that is not the auth message arrives first
      })
    }))


### Usage Client Side

    <script "./example/static/sws.js"></script>
    <script>
      SessionWebSocket(function(socket){
        socket.send("woot!")//good to go
      })
    </script>

### Events

#### Socket.io.Client

* secure - fires when auth sucedes, __does not__ put the auth token in a "message" event
* insecure - fires when auth fails, and then fires the "message" event