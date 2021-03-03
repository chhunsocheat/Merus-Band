import React from 'react';
import { NavLink, useHistory } from "react-router-dom";

const EachCategory = ({category}) => {
    return (
        <div>
            <NavLink 
            style={{textDecoration:"none",color:"#7A7D85"}}
            to={`/category/${category}`}>
            <p>{category}</p>
            </NavLink>
        </div>
    );
};

export default EachCategory;