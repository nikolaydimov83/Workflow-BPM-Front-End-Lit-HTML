import { useState,useMemo } from "react";
import { compareDates, stringifyDates } from "../utils/handleDates";
import { useTable, useSortBy, useFilters } from 'react-table'
import { Link } from "react-router-dom";

export function useDashboard(tableStructure){
    const [dashboardState,setDashboardState]=useState(
        {
            result:[],
            searchContextString:''
        });

    //state for filter
    const [filterText, setFilterText] = useState('');
  
    //state for sort  
    const [sortConfig, setSortConfig] = useState({});

    const columns = useMemo(() => tableStructure, []);
    
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
              }, [dashboardState.result, filterText, sortConfig]),
            },
            useFilters,
            useSortBy
    );
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        // Reset sort configuration when filter changes
        setSortConfig({});
      };

    
    function loadDashboardInfo(apiFunc,inputData){
        
        apiFunc(inputData)
            .then((data)=>{
                const items=stringifyDates(data.result)
                setDashboardState({result:items,searchContextString:data.searchContextString});
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
            filteredState
        }
        )
}

function getSortedFilteredState(dashboardState, columns, filterText, sortConfig) {
    const filteredData = dashboardState.result.filter((row) => {
        return columns.some((column) => {
            let value;

            if (typeof column.accessor === 'function') {
                value = String(column.accessor(row)).toLowerCase();
            } else {
                value = String(row[column.accessor]).toLowerCase();
            }

            const filterTextLower = filterText.toLowerCase();
            return value.includes(filterTextLower);
        });
    });

    // Sort the filtered data based on sortConfig
    if (sortConfig.column) {
        filteredData.sort((a, b) => {
            const columnId = sortConfig.column.id;
            return sortConfig.direction === 'asc'
                ? a[columnId].localeCompare(b[columnId])
                : b[columnId].localeCompare(a[columnId]);
        });
    }

    return filteredData;
}
