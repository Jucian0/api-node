import { app, bodyParser, routes } from './const';

//here routes defined
import { databaseConfig } from './database.config';
import mongoose from 'mongoose';

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json())

routes(app)

/** conecting database */
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.url, { useNewUrlParser: true })
  .then(() => console.log("Sucessfully connected to the database"))
  .catch(
    (error) => {
      console.log("Could not connect to databaseConfig. EDxiting networkInterfaces.apply.apply.");
      process.exit();
    }
  )

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});