
export const loadItems = async () => {
    const items = await fetch('/items').then(res=>res.json())
    return items;
};

export const addItem = async item => {
    try {
        const res = await fetch('items/addItem',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(item)
        });
         if(res.status !== 201){
            return false
        }
        else{
            return true;

        }
    } catch(e) {
        return false;    
    }
 
};

export const removeItem = async itemId => {
    try {
       const res =  await fetch('items/deleteItem',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({id:itemId})
        })
        if(res.status !== 200){
            return {isSuccess: false}
        }
        else{
            const savedItems = await res.json();
            return {isSuccess:true,products:savedItems};    
        }
    } catch(e) {
        return {isSuccess:false};
    }
    
};

export const editItem = async (itemId, fields) => {
    try{
        const res = await fetch('items/changeItem',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({id:itemId,name:fields.name,category:fields.category})
        })
        if(res.status !== 200){
            return false
        }
        else{
            return true;

        }       
    } catch(e) {
        return false;    
    }
};
