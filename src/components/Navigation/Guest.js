import { Link } from "react-router-dom";

export default function Guest(){
    return (
        <div className="guest">
        <Link to="/login">Вписване на потребител</Link>
        <Link to="/register">Регистрация</Link>
      </div>
    )
}