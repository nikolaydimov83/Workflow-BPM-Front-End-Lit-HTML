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

      });
    }
    return data
  }

  function dateToString(date){
    let mom=moment(date).format('DD-MM-YYYY');
    return moment(date).format('DD-MM-YYYY');
  }
  