export const countDuplicateItem = (list, identifier)=>{
    let quantity = 0;
    list.forEach((sneaker)=>{
        if(sneaker.hasOwnProperty(identifier)){
            quantity = sneaker[identifier].quantity;
        }
    })
    return quantity;
}


export const removeItem = (list, item)=>{

        for(let i = 0; i < list.length; i++){
            let sneaker = list[i];
            let sneaker_id = Object.keys(sneaker)[0];

            if(sneaker_id === item){
                if(sneaker[item].quantity ===1){
                    let indexObj = list.indexOf(sneaker)

                    list.splice(indexObj, 1)
                    console.log(list)
                    break;
                }
                sneaker[sneaker_id].quantity--; 
                return list;
            }
        }

    return list;
}