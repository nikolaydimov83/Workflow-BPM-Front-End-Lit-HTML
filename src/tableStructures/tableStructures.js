import { Link } from "react-router-dom";
import { compareDates } from "../utils/handleDates";

export const userTableStrucure=[
    { Header: 'Създател', accessor: 'requestCreatorEmail' },
    { Header: 'Апликация номер', accessor: 'iApplyId' },
    { Header: 'Име на клиента', accessor: 'clientName' },
    { 
      Header: 'ЕГН/ЕИК', 
      accessor: 'clientEGFN',
      sortType: (rowA, rowB) => (Number(rowA.original.clientEGFN)-Number(rowB.original.clientEGFN))  
    },
    { 
      Header: 'ФЦ', 
      accessor: 'finCenter',
      sortType: (rowA, rowB) => (Number(rowA.original.finCenter)-Number(rowB.original.finCenter)) 
    },
    { 
      Header: 'Рефериращ', 
      accessor: 'refferingFinCenter',
      sortType: (rowA, rowB) => (Number(rowA.original.refferingFinCenter)-Number(rowB.original.refferingFinCenter))
    },
    { 
      Header: 'Статус', 
      accessor: (row)=>row.status.statusName
    },
    { 
      Header: 'Subject',
      accessor: (row)=>row.subjectId.subjectName
    },
    { 
        Header: 'Дата на постъпване', 
        accessor: 'statusIncomingDate',
        sortType: (rowA, rowB) => compareDates(rowA.original.statusIncomingDate, rowB.original.statusIncomingDate)
    },
    { 
        Header: 'Краен срок', 
        accessor: 'deadlineDate',
        sortType: (rowA, rowB) => compareDates(rowA.original.deadlineDate, rowB.original.deadlineDate) 
    },
    {
      Header: 'Action',
      accessor: (row) => (
        <Link to={`/dashboard/${row._id}`}>Покажи</Link>
      ),
    }
  ]

  export const adminTableStructure=[
    { 
      Header: 'Клон номер', 
      accessor: 'branchNumber',
      sortType: (rowA, rowB) => (Number(rowA.original.branchNumber)-Number(rowB.original.branchNumber))
    },
    { Header: 'Име на клон', accessor: 'branchName' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Роля', accessor: 'role' },
    { Header: 'Финална Роля', accessor: 'roleName' },
    { Header: 'Статус на потребител', accessor: 'userStatus' },
    { Header: 'Потребител Id', accessor: '_id' },

    {
      Header: 'Action',
      accessor: (row) => (
        <Link to={`/admin/${row._id}`}>Покажи</Link>
      ),
    }
  ]

  export const workFlowTableStructure={
    roles:[
    
      { Header: 'Final Role', accessor: 'role' },
      { Header: 'Role Name', accessor: 'roleName' },
      { Header: 'Role Type', accessor: 'roleType' },
      { 
        Header: 'Role Create Date',
        accessor:'roleCreateDate',
        sortType: (rowA, rowB) => compareDates(rowA.original.roleCreateDate, rowB.original.roleCreateDate) 
      },
      {
        Header: 'Action',
        accessor: (row) => (
          <Link to={`/roles/${row._id}`}>Покажи</Link>
        ),
      }
    ],
    statuses:[
      { Header: 'Status Name', accessor: 'statusName' },
      { 
        Header: 'Status Type', 
        accessor: (row)=>row?.statusType?.role
      },
      { 
        Header: 'Next Statuses', 
        accessor: (row)=>row?.nextStatuses?.map((status,index)=><p key={status._id}>{index+1}. {status.statusName}</p>)
      },
      { 
        Header: 'Status Create Date', 
        accessor: 'statusCreateDate',
        sortType: (rowA, rowB) => compareDates(rowA.original.statusCreateDate, rowB.original.statusCreateDate) 
    },
    {
      Header: 'Action',
      accessor: (row) => (
        <Link to={`/statuses/${row._id}`}>Покажи</Link>
      ),
    }
    ],
    workflows:[
      {Header:'Workflow Name', accessor:'workflowName'},
      {
        Header:'Allowed Statuses',
        accessor: (row)=>row?.allowedStatuses?.map((status,index)=><p key={status._id}>{index+1}. {status.statusName}</p>)
      },
      {
        Header:'Special Statuses',
        accessor: (row)=>row?.rolesAllowedToFinishRequest?.map((role,index)=><p key={role._id}>{index+1}. {role.role}</p>)
      },
      { 
        Header: 'Workflow Create Date', 
        accessor: 'workflowCreateDate',
        sortType: (rowA, rowB) => compareDates(rowA.original.workflowCreateDate, rowB.original.workflowCreateDate) 
    },
    {
      Header: 'Action',
      accessor: (row) => (
        <Link to={`/workflows/${row._id}`}>Покажи</Link>
      ),
    }
    ],
    subjects:[
      {Header:'Subject Name',accessor:'subjectName'},
      {
        Header:'Workflow',
        accessor: (row)=>row?.assignedToWorkflow?.workflowName
      },
      { 
        Header: 'Subject Create Date', 
        accessor: 'subjectCreateDate',
        sortType: (rowA, rowB) => compareDates(rowA.original.subjectCreateDate, rowB.original.subjectCreateDate) 
    }
    ]
  }

