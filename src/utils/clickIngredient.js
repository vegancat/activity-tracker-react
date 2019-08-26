import setIngColor from "./setIngColor";
import setIngConditon from "./setIngsCondition";

const clickIngredient = (ingredients, key) => {
    let updatedIngredients = [...ingredients];
    for (let index in ingredients) {
        updatedIngredients[index] = { ...ingredients[index] };
        if (key === ingredients[index].ingKey) {
            updatedIngredients[index].state = !ingredients[index].state;
        }
    }

    const updatedStateList = [];
    for (let ing of updatedIngredients) {
        updatedStateList.push(ing.state);
    }

    //
    // calculating lengths //
    //
    const lengthList = [];
    let len = updatedStateList[0] ? 1 : 0;
    for (let i = 0; i < updatedStateList.length; i++) {
        if (i === 0) {
            if (updatedStateList[0]) {
                len++;
            } else {
                lengthList.push(0);
            }
        } else {
            if (updatedStateList[i]) {
                len++;
            } else {
                if (updatedStateList[i - 1]) {
                    lengthList.push(len);
                    lengthList.push(0);
                    len = 0;
                } else {
                    lengthList.push(0);
                }
            }
        }
    }

    //
    // calculating conditions
    //
    updatedIngredients = setIngConditon(updatedStateList, updatedIngredients);

    let index = 0;
    for (let i = 0; i < updatedIngredients.length; i++) {
        if (i > 0) {
            if (updatedIngredients[i].state) {
                if (!updatedIngredients[i - 1].state) {
                    index++;
                }
                updatedIngredients[i].color = setIngColor(lengthList[index]);
            } else {
                index++;
                updatedIngredients[i].color = setIngColor(lengthList[index]);
            }
        } else {
            updatedIngredients[0].color = setIngColor(lengthList[index]);
        }
    }

    return updatedIngredients;
};

export default clickIngredient;
