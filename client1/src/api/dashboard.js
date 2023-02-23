

export function setTableCriteriaSortIndex(sortCriteria, sortIndex){

    sessionStorage.setItem(sortCriteria,sortIndex)

}

export function getTableCriteriaSortIndex(sortCriteria){
    return sessionStorage.getItem(sortCriteria)
}