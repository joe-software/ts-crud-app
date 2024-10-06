let submitCarData = document.getElementById("submit-car-data")
interface CarDataInterface  {
    brand: string, 
    model: string,
    date: Date, 
    colour: string
}

if(submitCarData == null){
    console.log('error - formtest variable not found')
} else {
    submitCarData.addEventListener('click', function(){
        let data: any = document.getElementById("car-form-data")
        let dataSubmissionObject: CarDataInterface
        if( data == null){
            console.log("No data found")
        } else {
            dataSubmissionObject = {
                'brand': data[0].value,
                'model': data[1].value,
                'date': new Date(data[2].value), 
                'colour': data[3].value
            }
             
             console.log(dataSubmissionObject)
        }
    })
}
    
