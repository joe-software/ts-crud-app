interface CarDataInterface  {
    brand: string, 
    model: string,
    date: Date, 
    colour: string,
    id?: string
}

// send POST request server with car data
let submitCarData = document.getElementById("submit-car-data")
// - TS required a function to handle the occasion which submitCarData is null
if(submitCarData == null){
    console.log('error - form element not found')
} else {
    let data: any = document.getElementById("car-form-data")
        let dataSubmissionObject: CarDataInterface
    submitCarData.addEventListener('click', function(){
        if( data == null){
            console.log("No data found")
        } else {
            dataSubmissionObject = {
                'brand': data[0].value,
                'model': data[1].value,
                'date': new Date(data[2].value), 
                'colour': data[3].value
            }
        }
        // fetch request
    fetch("car-data-post", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(dataSubmissionObject)
    })
        
    })
}
    
interface PostDeleteInterface {
    mongoid: string
}
// send delete request - to delete a post
let deletePost: any = document.querySelectorAll(".delete-post")
// - TS required a function to handle the occasion which deletePost is null
if(deletePost[0] == null){
    console.log('error - delete post element not found possibly due to no data cards in DOM')
} else {
    deletePost.forEach((item: any) => {
        item.addEventListener('click', () =>{
            let deletePostData: PostDeleteInterface = {
                'mongoid': item.dataset.mongoid
            }
        
            fetch("delete-post", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method: 'DELETE',
                body: JSON.stringify(deletePostData)
            })
    
        })
    
    }

    )}
    

    // send update request - to update a post
let updatePost: any = document.querySelectorAll(".update-post")
// - TS required a function to handle the occasion which deletePost is null
if(updatePost[0] == null){
    console.log('error - update post element not found possibly due to no data cards in DOM')
} else {
    updatePost.forEach((item: any, index: number) => {
        item.addEventListener('click', () =>{
            let brand: any = document.getElementById(`car-brand-update${[index]}`)
            let model: any = document.getElementById(`car-model-update${[index]}`)
            let date: any = document.getElementById(`car-date-update${[index]}`)
            let colour: any = document.getElementById(`car-colour-update${[index]}`)

            
            let updatePostData: CarDataInterface = {
                'brand': brand.value,
                'model': model.value,
                'date': date.value,
                'colour': colour.value,
                'id': item.dataset.mongoid
            }

            fetch("update-post", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method: 'PUT',
                body: JSON.stringify(updatePostData)
            })
    
        })
    
    }

    )}
    
