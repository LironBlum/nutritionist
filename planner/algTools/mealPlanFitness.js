/*This model calculates the each plan's (chromosome) grade. LOWER = BETTER */
const weight = {
    carbs: 0.25,
    fats: 0.25,
    proteins: 0.25,
    calories: 0.25
};



//penalties are for malnutrition, less than half of the asked quantety will get penalty
const malnutritionFactor = 1.8;
const penalties = {
  carbs: 2,
  fats: 2,
  proteins: 2,
  calories: 2
};

const slimBonus = 0.1; //bonus factor for plan with less calories

const macroMolecules = ["fats", "proteins", "carbs" ];
/**
 *  // = carbs*weight.carbs + fats*weight.fats + proteins*weight.proteins + calories*weight.calories;
 * @param plan - meals plan
 * @param goals - nutrition goals received from user
 * @returns {number}
 */
function planFitness(plan, goals) {
    let calSum, mmSum, mmGrade, planGrade = 0;

    for(mm of macroMolecules ){
        mmSum = sumPlanValByKey(plan,mm); //sum all
        mmGrade = gradeNutrient(mmSum, goals.macroMolecules[mm], penalties[mm]);
        planGrade += mmGrade * weight[mm];
    }

    calSum = sumPlanValByKey(plan,"calories");
    const calGrade = gradeCal(calSum, goals.maxCalories, penalties.calories) * weight.calories;

    return planGrade + calGrade;
}

function gradeNutrient(curr, goal, penalty) {

    let grade = Math.abs(1 - curr/goal);

    if(curr <= goal/malnutritionFactor){
        grade += (grade * penalty);
    }
    return grade;
}

function gradeCal(curr, goal, penalty) {

    let grade = gradeNutrient(curr, goal, penalty);

    if(curr < goal){ //less calories is better
        grade -= (grade * slimBonus)
    }
    return grade;
}

function sumPlanValByKey(plan, key) {
    let sum = 0;
    plan.forEach( (productValues, productName) =>{
       sum += productValues[key]*productValues["amount"]["numOfUnits"];
    });
    return sum;
}



module.exports = {
    planFitness: planFitness
};