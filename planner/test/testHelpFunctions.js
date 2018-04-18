/**Functions used for better testing*/
const _ = require("lodash");

/**
 * returns true if all objects in array are unique
 * @param arr
 */
function isUniqInArr(arr){
    const uniqArrLen = _.uniq(arr).length;
    return uniqArrLen === arr.length;
};



module.exports = {isUniqInArr};