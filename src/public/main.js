"use strict";
// send POST request server with car data
let submitCarData = document.getElementById("submit-car-data");
// - TS required a function to handle the occasion which submitCarData is null
if (submitCarData == null) {
    console.log('error - form element not found');
}
else {
    let data = document.getElementById("car-form-data");
    let dataSubmissionObject;
    submitCarData.addEventListener('click', function () {
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
        }
        // fetch request
        fetch("car-data-post", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dataSubmissionObject)
        });
    });
}
// send delete request - to delete a post
let deletePost = document.getElementById("delete-post");
// - TS required a function to handle the occasion which deletePost is null
if (deletePost == null) {
    console.log('error - delete post element not found');
}
else {
    let deletePostData = {
        'mongoid': deletePost.dataset.mongoid
    };
    fetch("delete-post", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(deletePostData)
    });
}
