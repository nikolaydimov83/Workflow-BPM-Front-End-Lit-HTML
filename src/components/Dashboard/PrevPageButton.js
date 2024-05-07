import React, { useContext } from 'react';
import {DashboardContext} from '../../contexts/DashboardContext';

const PrevButton = () => {
    const { page, setPage } = useContext(DashboardContext);

    const handleClick = () => {
        if (page>1){
           setPage(page - 1); 
        }
        
    };

    return (
        <button onClick={handleClick}>
            Previous
        </button>
    );
};

export default PrevButton;