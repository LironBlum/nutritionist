

const malnutritionFactor = 2;
const weight = {
    carbs: 0.25,
    fats: 0.25,
    proteins: 0.25,
    calories: 0.25
};
const penalties = {
  carbs: 1,
  fats: 1,
  proteins: 1,
  calories: 1
};

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
        mmSum = sumPlanValByKey(plan,mm);
        mmGrade = gradeMacroMol(mmSum, goals.macroMolecules[mm], penalties[mm]);
        planGrade += mmGrade*weight[mm];
    }

    calSum = sumPlanValByKey(plan,"calories");

    const calGrade = gradeCal(calSum, goals["maxCalories"], penalties["calories"]);
    return planGrade+calGrade;
}

function gradeMacroMol(curr, goal, penalty) {

    let grade = 1 - curr/goal;

    if(curr <= goal/malnutritionFactor){
        grade += penalty;
    }
    return grade;
}


function gradeCal(curr,goal, penalty) {
    const isExceeded = curr > goal;
    let grade;
    if(isExceeded){
        grade = curr/goal;
    }else{
        grade = (curr - goal)/goal;
        if(curr <= goal/malnutritionFactor){
            grade += penalty;
        }
    }
    return grade;

}


function sumPlanValByKey(plan, key) {
    let sum = 0;
    plan.forEach(function (product) {
       sum += product[key];
    });
    return sum;
}


module.exports = {
    getPlanGrade: planFitness
}