const path = require('path');
const csv=require('csvtojson');
const IApply = require('../models/IApply');
const mongoose=require('mongoose');

async function replaceIapplyTable(){
const csvFilePath=path.join(__dirname,'csv','iApply.csv');
let array=[]
try {
    array=await csv().fromFile(csvFilePath)
} catch (error) {
    console.log(error.message);
    return
}
try {
await performTransaction(array)
} catch (error) {
    console.log(error.message);
}


}
async function performTransaction(newData) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      await IApply.deleteMany({}, { session });
      await IApply.insertMany(newData, { session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
module.exports={replaceIapplyTable}