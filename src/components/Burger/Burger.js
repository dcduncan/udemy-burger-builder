import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {

    let burgerIngredients =
        Object
            .keys(props.ingredients)
            .map(ingredientKey =>
                [...Array(props.ingredients[ingredientKey])]
                    .map((_, index) => <BurgerIngredient key={ingredientKey + index} type={ingredientKey}/>)
            ).reduce((previousValue, currentValue) => {
                return previousValue.concat(currentValue);
                }, []
            );

    if (burgerIngredients.length === 0) {
        burgerIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {burgerIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;