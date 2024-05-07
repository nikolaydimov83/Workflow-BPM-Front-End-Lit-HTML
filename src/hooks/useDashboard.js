import { useState,useMemo } from "react";
import { stringifyDates } from "../utils/handleDates";
import { useTable, useSortBy, useFilters } from 'react-table'


export function useDashboard(initialTableStructure){
    const [dashboardState,setDashboardState]=useState(
        {
            result:[],
            searchContextString:'',
            collectionLength:0
        });
    const [spinnerActive, setSpinnerActive]=useState(true);
    //state for filter
    const [filterText, setFilterText] = useState('');
  
    //state for sort  
    const [sortConfig, setSortConfig] = useState({});
    //chosen table structure    
    const [tableStructure,setTableStructure]=useState(initialTableStructure)

    const columns = useMemo(() => tableStructure, [tableStructure]);
    
    
    const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
          } = useTable(
            {
              columns: columns,
              data: useMemo(() => {
                // Filter the data based on the filterText
                return getSortedFilteredState(dashboardState, columns, filterText, sortConfig);
              }, [filterText, sortConfig,dashboardState,columns]),
            },
            useFilters,
            useSortBy
    );
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        // Reset sort configuration when filter changes
        setSortConfig({});
      };

    function setNewTableStructure(newTableStructure){
        setTableStructure(newTableStructure)
    }
    function loadDashboardInfo(apiFunc,inputData){
        setSpinnerActive(true)
        apiFunc(inputData)
            .then((data)=>{
                if (!data.result){
                    const items=stringifyDates(data)
                    setDashboardState({result:items,searchContextString:''});
                }else{
                    const items=stringifyDates(data.result)
                    let collectionLength=0
                    if (data.collectionLength){
                        collectionLength=data.collectionLength;
                    }
                    setDashboardState({result:items,searchContextString:data.searchContextString,collectionLength});                    
                }
                setSpinnerActive(false)
            })
            .catch((err)=>{
                throw err
            })
    }
    const filteredState=getSortedFilteredState(dashboardState, columns, filterText, sortConfig)
    return (
        {
            loadDashboardInfo,
            dashboardState,            
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            handleFilterChange,
            filterText,
            filteredState,
            setNewTableStructure,
            spinnerActive,
            tableStructure
        }
        )
}

function getSortedFilteredState(dashboardState, columns, filterText, sortConfig) {
    const filteredData = dashboardState.result.filter((row) => {
        return columns.some((column) => {
            let value;

            if (typeof column.accessor === 'function') {
                value = String(column.accessor(row)||'').toLowerCase();
            } else {
                value = String(row[column.accessor]||'').toLowerCase();
            }

            const filterTextLower = filterText.toLowerCase();
            return value.includes(filterTextLower);
        });
    });

    // Sort the filtered data based on sortConfig
    /*if (sortConfig.column) {
        filteredData.sort((a, b) => {
            const columnId = sortConfig.column.id;
            return sortConfig.direction === 'asc'
            ? (a[columnId] || '').localeCompare(b[columnId] || '')
            : (b[columnId] || '').localeCompare(a[columnId] || '');
        });
    }*/
    
    return filteredData;
}
