interface CarDataInterface  {
    brand: string, 
    model: string,
    date: Date, 
    colour: string
}

// send POST request server with car data
let submitCarData = document.getElementById("submit-car-data")

// - TS required a function to handle the occasion which submitCarData is null
if(submitCarData == null){
    console.log('error - formtest variable not found')
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
    
