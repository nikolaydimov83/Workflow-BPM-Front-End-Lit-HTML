import { useContext } from "react";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory"
import { useForm } from "../../hooks/useForm"
import { useService } from "../../hooks/useService"
import { GlobalContext } from "../../contexts/GlobalContext";
import { loadFormData } from "../../utils/handleFormData";
import { DashboardContext } from "../../contexts/DashboardContext";
import styles from './SearchForm.module.css'

export default function SearchForm(){
    const dashApi=useService(dashboardServiceFactory);
    const ctx=useContext(GlobalContext)
    const ctxDash=useContext(DashboardContext)
    const 
    { 
        onChangeUserForm,
        onSubmitUserForm,
        formData
    } = useForm({searchString:''},handleSearchFormSubmit)

    function handleSearchFormSubmit(){
        try {
            const checkedData=loadFormData(formData);
            ctxDash.setPage(1);
            ctxDash.setUserCurrentReport('searchRequest');
            ctxDash.setUserSearchInput(checkedData);
            sessionStorage.setItem('searchString',JSON.stringify(checkedData));
            ctxDash.loadDashboardInfo(dashApi.searchRequest,ctxDash.page,checkedData);
        } catch (error) {
            ctx.handleError(error);
        }
    }
    return(
        <form onSubmit={onSubmitUserForm} className={styles['search-wrapper']}>
        <input
            className={ctx.fieldStatuses?.searchString?styles['error']:''}
            onChange={onChangeUserForm}
            value={formData.searchString}
            id="#search-input"
            type="text"
            name="searchString"
            placeholder="Търсене..."
            required
        />
        <button type="submit">Search</button>
        </form> 
    )

}