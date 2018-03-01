class Helpers {
    constructor(){

    }
    
    static addName(gender, name){
        if(gender == 'male'){
            return 'Mr. '+ name
        }
        else if(gender == 'female'){
            return 'Mrs. '+ name
        }
    }
}


module.exports = {
    addName: Helpers.addName
}