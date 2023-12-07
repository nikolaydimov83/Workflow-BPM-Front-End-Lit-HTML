import { Link } from "react-router-dom"

export default function TableRow({request}){
    return (
        <tr>
            <td>{request.requestCreatorEmail}</td>
            <td>{request.iApplyId}</td>
            <td>{request.clientName}</td>
            <td>{request.clientEGFN}</td>
            <td>{request.finCenter}</td>
            <td>{request.refferingFinCenter}</td>
            <td>{request.subjectId.subjectName}</td>
            <td>{request.status.statusName}</td>
            <td>{request.statusIncomingDate}</td>
            <td>{request.deadlineDate}</td>
            <td><Link href={`/dashboard/${request._id}`}>Покажи</Link></td>
    </tr>
    )
}