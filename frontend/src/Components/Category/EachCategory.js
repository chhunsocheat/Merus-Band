import React from 'react';
import { NavLink } from "react-router-dom";

const EachCategory = ({category}) => {
    return (
        <div>
            <NavLink 
            onClick={()=>alert("Implementing Soon!")}
            style={{textDecoration:"none",color:"#7A7D85"}}
            to={`/explore`}
            >
            <p>{category}</p>
            </NavLink>
        </div>
    );
};

export default EachCategory;