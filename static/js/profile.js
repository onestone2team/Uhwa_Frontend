const gallery_mypage = document.getElementById("gallery_mypage")
const gallery_bookmark = document.getElementById("gallery_bookmark")
const order_list = document.getElementById("order_list")

window.addEventListener('load', function() {
    $("#headers").load("../templates/navigation.html");

});

function tweetMy(){
    console.log("내 게시글 보기")
    order_list.style.display ="none";
    gallery_mypage.style.display="flex";
    gallery_bookmark.style.display="none";

}

function tweetBookmark(){
    console.log("내 북마크 보기")
    order_list.style.display ="none";
    gallery_mypage.style.display ="none";
    gallery_bookmark.style.display ="flex";
    
}

function myOrderList(){
    console.log("주문 목록")
    order_list.style.display ="block";
    gallery_mypage.style.display ="none";
    gallery_bookmark.style.display ="none";
}

function editProfile(){
    
    const profilename = document.getElementById("author_name").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const profile = document.querySelector("input[type='file']");
    let formData = new FormData();
    if (profile.value != "") {
        formData.append('profile', profile.files[0]);
    }
    formData.append("profilename", profilename);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);

    alert("수정 버튼 클릭");
    location.reload();
}

// 모달 팝업창 작업

const modal = document.querySelector('.modal');
const btnOpenPopup = document.querySelector('#editButton');

btnOpenPopup.addEventListener('click', () => {
    modal.style.display = 'block';
});

const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", e => {
    modal.style.display = "none";  
    document.body.style.overflowY = "visible";
});


$("#input_image").change(function(){
    readFile(this);
    
});

function readFile(input_image){
    var reader = new FileReader();
  
    reader.onload = function(e){
        $('#output_image').attr('src', e.target.result);
    }

    reader.readAsDataURL(input_image.files[0]);
} 
