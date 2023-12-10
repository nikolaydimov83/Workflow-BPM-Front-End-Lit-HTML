import { useEffect } from "react";
import { useForm } from "../../hooks/useForm"

export default function Create(){
    const {
        onChangeUserForm,
        onSubmitUserForm,
        formData,
        updateFormFields
    }=useForm();

    useEffect(()=>{

    },[])
    
    function onChangeIAppliId(){

    }

    return (
        <section id="create">
        <div class="formLarge">
        <h2>Създай заявка</h2>
        <form /*{submit}*/ class="create-form">
            <div class="inlineDiv">
                <label for='iApplyId'>Iapply ID</label>
                <input
                type="text"
                name="iApplyId"
                id="iApplyId"
                placeholder="Апликация в I-apply"
                onBlur={onChangeIAppliId}
                onChange={onChangeUserForm}
                value={formData.iApplyId}
                />
                <label for='subjectName'>Subject</label>
                <select
                name="subjectId"
                id="subjectName">
                {/*repeat(serverResponse.subjects,(subject)=>subject._id,(subject)=>html`
                    <option value="${subject._id}" >${subject.subjectName}</option>
    `)*/}
                
                </select>
                <label for='deadlineDate'>Краен срок</label>
                <input
                type="date"
                name="deadlineDate"
                id="deadlineDate"
                placeholder="Краен срок"
                />
                <label for='clientEGFN'>ЕГН/Булстат</label>
                <input
                type="text"
                name="clientEGFN"
                id="clientEGFN"
                placeholder="ЕГН/Булстат на клиента"
    
                disabled
                />
            </div>
            <div class="inlineDiv">
            <label for='finCenter'>Клон/Рефериращ клон</label>
            <div>
            <input
                class="small"
                type="text"
                name="finCenter"
                id="finCenter"
                placeholder="Клон"
                disabled

                />
                <input
                class="verySmall"
                type="text"
                name="refferingFinCenter"
                id="refferingFinCenter"
                placeholder="Не"
                disabled
                
                />

            </div>  

                <label for='clientName'>Клиент</label>
                <input
                type="text"
                name="clientName"
                id="clientName"
                placeholder="Име на клиента"
                disabled
               
                />
                <label for='product'>Продукт</label>
                <input
                type="text"
                name="product"
                id="product"
                placeholder="Продукт"
                disabled
             
                />
                <label for='amount'>Сума</label>
                    <div>
                    <input
                    class="verySmall"
                    type="text"
                    name="ccy"
                    id="ccy"
                    placeholder="CCY"
                    disabled
                  
                    />
                    <input class="small"
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Сума"
                    disabled
             
        
                    />

                    </div>
            </div>

                <textarea
                type="textarea"
                name="description"
                id="description"
                placeholder="Описание"
                ></textarea>


            <button type="submit">Изпрати</button>
        </form>
        </div>
        </section>
    )
}