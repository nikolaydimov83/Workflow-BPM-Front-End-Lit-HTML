import moment from "moment";
const format = 'DD-MM-YYYY';
const dateToString=(date)=>{
  let mom=moment(date).format(format);
  return moment(date).format(format);
}
export const stringifyDates=(data)=> {

    if (data.length > 0) {
      data.forEach(element => {
        if (element.statusIncomingDate){
          element.statusIncomingDate = dateToString(element.statusIncomingDate);
        }
        if (element.deadlineDate){
          element.deadlineDate = dateToString(element.deadlineDate);
        }
        if (element.comments){
            element.comments.forEach((comment)=>{
              comment.commentDate=dateToString(comment.commentDate);
        })
        }
        if (element.roleCreateDate){
          element.roleCreateDate=dateToString(element.roleCreateDate)
        }
        if (element.statusCreateDate){
          element.statusCreateDate=dateToString(element.statusCreateDate)
        }
        if (element.workflowCreateDate){
          element.workflowCreateDate=dateToString(element.workflowCreateDate)
        }
        if (element.subjectCreateDate){
          element.subjectCreateDate=dateToString(element.subjectCreateDate)
        }
      });
    }
    return data
  }
  

export const compareDates = (dateA, dateB) => {
    

const parsedDateA = new Date(moment(dateA, format));
const parsedDateB = new Date(moment(dateB, format));

    return parsedDateA.getTime() - parsedDateB.getTime();
};