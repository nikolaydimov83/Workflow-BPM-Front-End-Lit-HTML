const authController = require("./controllers/authController");
const changeStatusController = require("./controllers/changeStatusController");
const createController = require("./controllers/createController");
const dataController = require("./controllers/dataController");
const iApplyConroller = require("./controllers/iapplyDataController");

module.exports=(app)=>{
    app.use('/users',authController);
    app.use('/data/catalog',dataController);
    app.use('/data/create',createController);
    app.use('/iApply',iApplyConroller);
    app.use('/data/changeStatus',changeStatusController);
    

}