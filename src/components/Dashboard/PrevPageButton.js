import React, { useContext } from 'react';
import {DashboardContext} from '../../contexts/DashboardContext';
import styles from './PageButton.module.css'; // Import the CSS module

const PrevButton = () => {
    const { page, setPage } = useContext(DashboardContext);

    const handleClick = () => {
        if (page>1){
           setPage(page - 1); 
        }
        
    };

    return (
        <button className={styles["page"]} onClick={handleClick}>
            Prev
        </button>
    );
};

export default PrevButton;