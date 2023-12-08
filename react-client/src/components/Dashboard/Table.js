import { useContext } from "react"
import { Link } from "react-router-dom"
import { DashboardContext } from "../../contexts/DashboardContext"

export default function Table(){
    const 
    {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }=useContext(DashboardContext)

    return (
        <table {...getTableProps()} id="dashboard" className="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
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
    )
}