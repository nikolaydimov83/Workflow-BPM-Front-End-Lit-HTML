import { useContext, useEffect } from "react";
import SearchForm from "./SearchForm";
import { DashboardContext } from "../../contexts/DashboardContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import TableRow from "./TableRow";

export default function Dashboard(){
    const ctxDashboard=useContext(DashboardContext)
    const ctxGlobal=useContext(GlobalContext)
    useEffect(()=>{

        try {
            ctxDashboard.loadDashboardInfo()
        } catch (error) {
            ctxGlobal.handeleError()
        }
        
    },[])
    return (
    <>

        <div className="search-wrapper-div">
        <SearchForm/>
        <button className="pre-set-report">На мой екран</button>
        <button className="pre-set-report">Забавени</button>
        <button className="pre-set-report">Всички Активни</button>
        <button className="pre-set-report">Всички</button>
        </div>
        <h2>{/*searchContextString*/}</h2>
        <div className="tableLarge">
        <table id="dashboard" className="no-footer dataTable" role="grid" aria-describedby="dashboard_info">
        <thead >
        <tr >
        <th ><a id="creator"href="javascript:void(0)">Създател</a></th>
            <th ><a id="iApplyId"href="javascript:void(0)">Апликация номер</a></th>
            <th ><a id="clientName"href="javascript:void(0)">Име на клиента</a></th>
            <th ><a id="clientEGFN"href="javascript:void(0)">ЕГН/ЕИК</a></th>
            <th ><a id="finCenter"href="javascript:void(0)">ФЦ</a></th>
            <th ><a id="refferingFinCenter"href="javascript:void(0)">Рефериращ</a></th>
            <th ><a id="subjectId"href="javascript:void(0)">Subject</a></th>
            <th ><a id="status"href="javascript:void(0)">Статус</a></th>
            <th ><a id="statusIncomingDate"href="javascript:void(0)">Дата на постъпване</a></th>
            <th ><a id="deadlineDate"href="javascript:void(0)">Краен срок</a></th>
            <th ><a id="details"href="javascript:void(0)">Детайли</a></th>
        </tr>
        </thead>
        <tbody>
            {ctxDashboard.dashboardState?.result.length>0?ctxDashboard.dashboardState.result.map((item)=><TableRow key={item._id} request={item}/>):''}
       
        </tbody>
        </table>
        </div>
    </>

    )
}