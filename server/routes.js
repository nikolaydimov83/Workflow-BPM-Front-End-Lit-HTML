const authController = require("./controllers/authController");
const createController = require("./controllers/createController");
const dataController = require("./controllers/dataController");
const iApplyConroller = require("./controllers/iapplyDataController");

module.exports=(app)=>{
    app.use('/users',authController);
    app.use('/data/catalog',dataController);
    app.use('/data/create',createController);
    app.use('/iApply',iApplyConroller);
    

}