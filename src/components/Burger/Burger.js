import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {

    const burgerIngredients =
        Object
            .keys(props.ingredients)
            .map(ingredientKey =>
                [...Array(props.ingredients[ingredientKey])]
                    .map((_, index) => <BurgerIngredient key={ingredientKey + index} type={ingredientKey}/>)
            );

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {burgerIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;