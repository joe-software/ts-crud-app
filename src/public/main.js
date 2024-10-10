"use strict";
// send POST request server with car data
let submitCarData = document.getElementById("submit-car-data");
// - TS required a function to handle the occasion which submitCarData is null
if (submitCarData == null) {
    console.log('error - form element not found');
}
else {
    // create variable shortcut to access the form data array
    let data = document.getElementById("car-form-data");
    // apply interface to the object which will be sent to server
    let dataSubmissionObject;
    //add event listener to the submit button, with a function to send the POST request
    submitCarData.addEventListener('click', function () {
        // Add a conditional to run in the event that the data cant be found
        if (data == null) {
            console.log("No data found");
        }
        else {
            // create the object using data from the HTML form
            dataSubmissionObject = {
                'brand': data[0].value,
                'model': data[1].value,
                'date': new Date(data[2].value),
                'colour': data[3].value
            };
        }
        // fetch request to send the POST data to server
        fetch("car-data-post", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dataSubmissionObject)
        }).then(() => {
            window.location.reload();
        });
    });
}
// send delete request - to delete a post
// shortcut variable to access the elements in an array
let deletePost = document.querySelectorAll(".delete-post");
// - TS required a function to handle the occasion which deletePost is null
if (deletePost[0] == null) {
    // conditional to handle the event that there are no delete buttons to add the event listener to
    console.log('error - delete post element not found possibly due to no data cards in DOM');
}
else {
    // there are multiple HTML 'delete button' elements in an array - forEach is used to cycle through them and apply each with an event listener
    deletePost.forEach((item) => {
        item.addEventListener('click', () => {
            // create object using interface, to contain the mongoid to be deleted
            let deletePostData = {
                'mongoid': item.dataset.mongoid
            };
            // fetch delete request to send the id of the mongo object to be deleted
            fetch("delete-post", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify(deletePostData)
            }).then(() => {
                window.location.reload();
            });
        });
    });
}
// send update request - to update a post
// shortcut variable to access the elements in an array
let updatePost = document.querySelectorAll(".update-post");
// - TS required a function to handle the occasion which deletePost is null
if (updatePost[0] == null) {
    console.log('error - update post element not found possibly due to no data cards in DOM');
}
else {
    // use foreach to cycle through update buttons - applying event listeners 
    updatePost.forEach((item, index) => {
        //within the event listeners create an object to be sent to the server using data contained within the input element in the relevant data card
        item.addEventListener('click', () => {
            let brand = document.getElementById(`car-brand-update${[index]}`);
            let model = document.getElementById(`car-model-update${[index]}`);
            let date = document.getElementById(`car-date-update${[index]}`);
            let colour = document.getElementById(`car-colour-update${[index]}`);
            let updatePostData = {
                'brand': brand.value,
                'model': model.value,
                'date': date.value,
                'colour': colour.value,
                'mongoid': item.dataset.mongoid
            };
            // fetch request to send POST data and request to server
            fetch("update-post", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(updatePostData)
            }).then(() => {
                window.location.reload();
            });
        });
    });
}
