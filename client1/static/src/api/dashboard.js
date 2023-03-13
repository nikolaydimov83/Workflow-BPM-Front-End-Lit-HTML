

export function setTableCriteriaSortIndex(sortCriteria, sortIndex){

    sessionStorage.setItem(sortCriteria,sortIndex)

}

export function getTableCriteriaSortIndex(sortCriteria){
    return sessionStorage.getItem(sortCriteria)
}

export function setDashBoardContext(dashboardContext){
    
    sessionStorage.setItem('dashboardContext',JSON.stringify(dashboardContext))
}

export function getDashBoardContext(){
    return JSON.parse(sessionStorage.getItem('dashboardContext'))
}