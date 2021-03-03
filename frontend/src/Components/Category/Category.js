import React from 'react';
import EachCategory from "./EachCategory"
import "./category.css"
const Category = () => {
    const category=[
        "Rock","Pop","R&B","Modern"
    ]
    return (
        <div className="categoryContainer">
            {category.map((el)=><EachCategory category={el}/>)}
        </div>
    );
};

export default Category;