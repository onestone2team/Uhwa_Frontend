window.addEventListener('load', function() {
    $("#headers").load("../templates/navigation.html");
});

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

function ReadURL(input) {
    const previewButton = document.getElementById('style_preview')
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

function imageStart(){
    const imageView = document.getElementById('image_position')
    imageView.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png')"
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
    var image_list = ["https://contents.lotteon.com/itemimage/_v230836/LE/12/08/81/50/56/_1/24/77/61/86/6/LE1208815056_1247761866_1.jpg/dims/optimize/dims/resizemc/400x400","https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2020%2F07%2Fwhite-cap-nike-nasaseasons-helly-hansen-heron-preston-a-cold-wall-off-white-moncler-versace-vetements-05.jpg?w=1600&cbr=1&q=90&fit=max", "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg", "https://contents.lotteon.com/itemimage/_v234846/LO/18/31/61/67/19/_1/83/16/16/72/0/LO1831616719_1831616720_1.jpg/dims/optimize/dims/resizemc/400x400"]

    document.getElementById("show_picture").src = image_list[category_value];

    imageView.style.backgroundImage = `url(${image_list[category_value]})`

    

    console.log(category_value)
}