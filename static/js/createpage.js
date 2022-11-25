let image_list = []
let style_name = 0
window.onload = async function ViewCreate() {
    $("#headers").load("../templates/navigation.html");

    const response_categort= await fetch(`${BACK_END_URL}/products/category/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    categories = await response_categort.json()
    console.log(categories)
    category_frame = document.getElementById('select_value')
    categories.forEach(element => {
        const category = document.createElement('option')
        image_list[element.id] = `${BACK_END_URL}${element.category_image}`
        category.value = element.id
        category.innerText = element.category_name
        category_frame.appendChild(category)
    })
}

function contentReadURL(input) {
    const previewButton = document.getElementById('content_preview')
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        previewButton.setAttribute("style", `background-image:url(${e.target.result})`)
        
        // document.getElementById('preview').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
        previewButton.setAttribute("style", `background-image:none`)
    }
}

function ReadURL() {
    const modal = document.querySelector('.modal');
    const btnOpenPopup = document.querySelector('#editButton');
    modal.style.display = 'block';


    const buttonCloseModal = document.getElementById("close_modal");
    buttonCloseModal.addEventListener("click", e => {
        modal.style.display = "none";
        document.body.style.overflowY = "visible";
    });
}

function styleClick(num, name) {
    const modal = document.querySelector('.modal');
    const imageurl = document.getElementById(`image${num}`).style.backgroundImage;
    const previewButton = document.getElementById('style_preview');
    previewButton.setAttribute("style", `background-image:${imageurl}`);
    style_name = name;
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
}

function imageStart(){
    var value_str = document.getElementById('select_value');
    category_value = value_str.options[value_str.selectedIndex].value
    const image = document.querySelector("input[type='file']");
    let formdata = new FormData
    formdata.append('image', image.files[0])
    formdata.append('model', style_name)
    formdata.append('category', category_value)

    const response = fetch(`${BACK_END_URL}/products/machinelearning/`, {
        headers:{
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5NDIzOTY1LCJpYXQiOjE2NjkzODA3NjUsImp0aSI6IjU3YzdjY2UzNGNmMjQ3ODg5ZDQ1OTBjNWIxNjUxYzgyIiwidXNlcl9pZCI6MiwiaXNfYWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiLSJ9.0qXvEDuxQI8YKA6cz1lUnGBYwNnew6xRilcMElW4Vi8",
        },
        method: 'POST',
        body: formdata
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data["data"]["image"])
        const imageView = document.getElementById('clothes_div')
        imageView.style.backgroundImage = `url(${BACK_END_URL}${data["data"]["image"]})`
    })
}

function saveButton(){
    const imageView = document.getElementById('image_position')
    if (imageView.style.backgroundImage){
        alert("게시글 저장")
    } else{
        alert("머신러닝 이미지를 만들어야 저장이 가능합니다.")
    }
}

function clotheChange(){
    var value_str = document.getElementById('select_value');
    const imageView = document.getElementById('clothes_div')
    category_value = value_str.options[value_str.selectedIndex].value
    document.getElementById("show_picture").src = image_list[category_value];
    imageView.style.backgroundImage = `url(${image_list[category_value]})`
}




