const arr = [1, 3, 5, 7, 3, 9, 8];
undefined
var dups = {};
undefined
function getFirstDup(arr) {
    for (let i = 0; i < arr.length; i++){
        if (dups[arr[i]] === undefined) {
            dups[arr[i]] = -1;
        } else if (dups[arr[i]] === -1) {
            return arr[i];
        }
    }

    return false;
}
