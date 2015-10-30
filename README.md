# alang-web
Real-time (React / Redux / Socket.io / Express) API and interface for our HackingEDU hackathon project

*[Winner, Coolest Pebble Hack!](http://devpost.com/software/alang)*

# About Alang
![](http://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/312/730/datas/gallery.jpg)

# How it works
API requests are funneled through Ginger Software's API for grammar correction and sent to all connected web clients via SocketIO.

On the client, Redux's store is initialized using the data from SocketIO and used to render the components in the main application view.

# Things I learned
  * Express and SocketIO can run on the same port using the same connection, and they need to in order to run on Heroku.
  * Dealing with XHRs in Redux is an order of magnitude more difficult than managing state over SocketIO
  * Webpack hot reloading speeds up development substantially
  * Immutable.js has a shallow learning curve, and is worth using even if only for the peace-of-mind that you're not mutating application state.
  
# Usage
```
npm install
webpack -p
npm start
```

_caveats: the Hackathon was almost over when we realized we needed to deploy in the cloud (bad networking was preventing local communication from phone to server), so the Webpack dev server and hot reloading were taken out at the last minute very ungracefully.  Until I add a separate dev/prod config, you'll have to manually add a port 5000 to index.jsx's SocketIO server and run the app as specified above, from the built production JS._


