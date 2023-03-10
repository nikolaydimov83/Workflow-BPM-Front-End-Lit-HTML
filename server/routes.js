const authController = require("./controllers/authController");
const changeStatusController = require("./controllers/changeStatusController");
const commentsController = require("./controllers/commentsController");
const createController = require("./controllers/createController");
const dataController = require("./controllers/dataController");
const editController = require("./controllers/editController");
const iApplyConroller = require("./controllers/iapplyDataController");
const reportsContoller = require("./controllers/reportsController");
const searchController = require("./controllers/searchController");

module.exports=(app)=>{
    app.use('/users',authController);
    app.use('/data/catalog',dataController);
    app.use('/data/create',createController);
    app.use('/data/edit',editController);
    app.use('/iApply',iApplyConroller);
    app.use('/data/changeStatus',changeStatusController);
    app.use('/comments',commentsController);
    app.use('/search',searchController);
    app.use('/reportsController',reportsContoller);
    

}