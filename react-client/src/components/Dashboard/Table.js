import { useContext } from "react"
import { Link } from "react-router-dom"
import { DashboardContext } from "../../contexts/DashboardContext"
import styles from './Table.module.css'
import { exportToExcel } from "../../utils/handleExcel"
export default function Table(){
    const 
    {

        handleFilterChange,
        filterText,
        filteredState,
        dashboardContextState,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }=useContext(DashboardContext)
    
    function handleOnClickExcel(e){
      exportToExcel(filteredState,dashboardContextState)
  }
    return (
      <div>
        <div className={styles.tableOpsWrapper}>

        <input
        
        className={styles["filterInput"]}
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter..."
        />
      
       <button className={styles["excel"]} onClick={handleOnClickExcel}>Excel</button>
        </div>

        <table {...getTableProps()} id="dashboard" className={styles["tableLarge"]} role="grid" aria-describedby="dashboard_info">

        

        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  //onClick={() => handleSort(column)}
                >
                  {column.render('Header')}
                  {/* Display sort direction arrow */}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      ' 🔽'
                    ) : (
                      ' 🔼'
                    )
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>

           {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                    </tr>
                );
                })}
        </tbody>
        </table>
      </div>

    )
}