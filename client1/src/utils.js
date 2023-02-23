export function getUserData(){
return JSON.parse(sessionStorage.getItem('userData'))
}

export function setUserData(data){
    sessionStorage.setItem('userData',JSON.stringify(data))
}

export function clearUserData(){
    sessionStorage.removeItem('userData')
}

export function stringifyDates(data) {
    if (data.length > 0) {
      data.forEach(element => {
        element.statusIncomingDate = new Date(element.statusIncomingDate).toLocaleDateString('bg-BG');
        element.deadlineDate = new Date(element.deadlineDate).toLocaleDateString('bg-BG');
      });
    }
    return data
  }