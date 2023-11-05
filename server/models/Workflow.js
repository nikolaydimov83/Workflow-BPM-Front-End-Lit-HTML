const { Schema, model,Types } = require("mongoose");
const Status = require("./Status");


const workflowSchema=new Schema({
    workflowName:{type:String, require:true, unique:true},
    allowedStatuses:{type:[Types.ObjectId],ref:'Status'},
    workflowCreateDate:{type:Date,default:Date.now,immutable:true},
    rolesAllowedToFinishRequest:{type:[Types.ObjectId], ref:'Role'},
    initialStatus:{type:Types.ObjectId,ref:'Status'}
});

workflowSchema.index({workflowName:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

workflowSchema.pre('save', async function (next) {
    // If the `initialStatus` field has been modified or allowedStatuses is not set
    let initialStatusId;
    if (this.isNew||!this.isModified('initialStatus') ){
        initialStatusId = this.initialStatus;
        
    }else {
        initialStatusId = this.getUpdate().$set.initialStatus;
      
    }
      const childStatuses = await getAllChildStatuses(initialStatusId);
  
      // Assign the childStatuses to the allowedStatuses property
      this.allowedStatuses = childStatuses;
    
  
    // Continue with the save operation
    
  });

async function getAllChildStatuses(statusId) {
    let a=1;
    const result = new Set(); // Using a Set to ensure unique statusIds
  
    async function traverse(statusId) {
        a++;
      const status = await Status.findById(statusId);
      
      if (!status||status.nextStatuses.length==0||!status.nextStatuses){
        result.add(statusId.toString());
        return;
      } 
      if(a>100){
        console.log()
      }
      result.add(statusId.toString());
      console.log(statusId.toString())
  
      for (const nextStatusId of status.nextStatuses) {
        if (!result.has(nextStatusId.toString())) {
          await traverse(nextStatusId);
        }else{
            return
        }
      }
    }
  
    await traverse(statusId);
  
    return Array.from(result); // Convert the Set to an array
  }
const Workflow=model('Workflow', workflowSchema);

module.exports=Workflow;