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