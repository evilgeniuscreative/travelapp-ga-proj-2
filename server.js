const express = require('express');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');



//--------------  Construction  ----------------//

const hbs = expressHandlebars.create({
  defaultLayout: null,
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//--------------  Import Models  ----------------//


//--------------  Import CSS &/or JSON ----------------//

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------  Start Server  ----------------//

const startServer = async () => {
  // connect to to DB
  await mongoose.connect(DATABASE_URL);

  // Connection statuses
  // app.on('error', (err) => console.log(err.message + 'is MongoDB not running?'));
  mongoose.connection.on('connected', () => {
    console.log('Connected to ' + DATABASE_URL);
  });

  // after connect, turn on server
  app.listen(PORT, function () {
    console.log('Your app is listening on port: ' + PORT);
  });
}

 //--------------  Routes Middleware  ----------------//

  const dashboardRouter = require('./routes/dashboardRouter.js');

  
  app.use('/', dashboardRouter);

  app.on('connected', () => {
    console.log('MongoDB connected on:', DATABASE_URL);
  });