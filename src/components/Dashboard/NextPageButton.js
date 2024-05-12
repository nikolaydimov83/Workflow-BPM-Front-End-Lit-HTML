import React, { useContext } from 'react';
import {DashboardContext} from '../../contexts/DashboardContext';
import styles from './PageButton.module.css';
const pageLength=500
const NextButton = () => {
    const { page, setPage,dashboardState } = useContext(DashboardContext);
    const totalPages=Math.ceil(dashboardState.collectionLength/pageLength)
    const handleClick = () => {
        if (page+1<=totalPages){
        setPage(page + 1);
        }
        
        
    };
    return (
        <button disabled={page+1>totalPages} onClick={handleClick} className={styles["page"]}> {/* Add the className prop */}
            Next
        </button>
    );
};
export default NextButton;