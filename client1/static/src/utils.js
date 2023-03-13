export function getUserData(){
return JSON.parse(localStorage.getItem('userData'))
}

export function setUserData(data){
    localStorage.setItem('userData',JSON.stringify(data))
}

export function clearUserData(){
    localStorage.removeItem('userData')
}

export function stringifyDates(data) {
    if (data.length > 0) {
      data.forEach(element => {
        element.statusIncomingDate = dateToString(element.statusIncomingDate);
        element.deadlineDate = dateToString(element.deadlineDate);
        element.comments.forEach((comment)=>{
          comment.commentDate=dateToString(comment.commentDate);
        })
      });
    }
    return data
  }

  function dateToString(date){
    let mom=moment(date).format('DD-MM-YYYY');
    return moment(date).format('DD-MM-YYYY');
  }
  