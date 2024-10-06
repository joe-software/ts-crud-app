"use strict";
let submitCarData = document.getElementById("submit-car-data");
if (submitCarData == null) {
    console.log('error - formtest variable not found');
}
else {
    submitCarData.addEventListener('click', function () {
        let data = document.getElementById("car-form-data");
        let dataSubmissionObject;
        if (data == null) {
            console.log("No data found");
        }
        else {
            dataSubmissionObject = {
                'brand': data[0].value,
                'model': data[1].value,
                'date': new Date(data[2].value),
                'colour': data[3].value
            };
            console.log(dataSubmissionObject);
        }
    });
}
