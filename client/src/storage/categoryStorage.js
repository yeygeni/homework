export const loadCategories  = async () => {
    const res = await fetch('/category');
    if(res.status !== 200){
        return []
    }
    else{
         const categories = await res.json();
         return categories;
    }
};
export const loadCategoriesName  = async () => {
    const categories = await loadCategories();
    console.log(categories)
    const categoriesName = categories.map(category=>category.name);
    return categoriesName;
};


export const addCategory = async category => {
    try {
        const res = await fetch('/category/addCategory',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({category})
        });
        if(res.status !== 201){
            console.log('status',res.status)
            return false
        }
        else{
            return true;

        }
    } catch(e) {
        return false;
    }
  
};

export const removeCategory = async removeCategory => {
    try {
        const res = await fetch('/category/deleteCategory',{
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({removeCategory})
        });
        if(res.status !== 200){
            console.log('2000000000')
            return {isSuccess: false}
        }
        else{
            const savedCategories = await res.json();
            return {isSuccess: true,categories:savedCategories};
        }
    } 
    catch(e) {
        return {isSuccess: false}
    }
    
};

export const editCategory = async (oldCategory,newCategory) => {
    try {
        const res = await fetch('/category/changeCategory',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({oldCategory,newCategory})
        });
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
