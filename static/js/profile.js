const gallery_mypage = document.getElementById("gallery_mypage")
const gallery_bookmark = document.getElementById("gallery_bookmark")
const order_list = document.getElementById("order_list")

window.onload = async function ViewProfile() {
    $("#headers").load("../templates/navigation.html");

    //=======회원 정보 불러오기========
    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)
    
    if(!parsed_payload){
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../templates/main.html")
    }

    const response_profile = await fetch(`${BACK_END_URL}/profile/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    profile = await response_profile.json()
    
    const profilename = document.getElementById("profilename")
    const profileemail = document.getElementById("profileemail")
    const profileaddress = document.getElementById("profileaddress")
    const profilephone = document.getElementById("profilephone")
    const profileimage = document.getElementById("profileimage")
        // 텍스트 집어 넣기
    profilename.innerText = profile.profilename
    profileemail.innerText = profile.email
    profileaddress.innerText = profile.address
    profilephone.innerText = profile.phone
    profileimage.setAttribute("src", `${BACK_END_URL}${profile.profile}`)

    //=======나의 게시글 불러오기========
    
    const response_tweet = await fetch(`${BACK_END_URL}/profile/myproducts/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    tweets = await response_tweet.json()
    tweet_frame = document.getElementById('gallery_mypage')
    const post_count = document.getElementById("post_count")
    post_count.innerText = tweets.length

    tweets.forEach(element => {
        const tweet = document.createElement('div')
        tweet.setAttribute("class", "gallery-item")
        tweet.innerHTML = `<a href="${FRONT_BASE_URL}/detail.html?id=${element.id}">
                            <img src="${BACK_END_URL}${element.image}" class="gallery-image" alt="">
                        
                            <div class="gallery-item-info">

                                <ul>
                                    <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 56</li>
                                    <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
                                </ul>
                            </div>
                            </a>`
        tweet_frame.appendChild(tweet)
    })

    //=======나의 북마크 불러오기========

    const response_bookmark = await fetch(`${BACK_END_URL}/profile/bookmarklist/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    bookmarks = await response_bookmark.json()
    bookmark_frame = document.getElementById('gallery_bookmark')
    bookmarks.forEach(element => {
        const bookmark = document.createElement('div')
        bookmark.setAttribute("class", "gallery-item")
        bookmark.innerHTML = `
                            <a href="${FRONT_BASE_URL}/detail.html?id=${element.id}">
                                <img src="${BACK_END_URL}${element.image}"  class="gallery-image" alt="">
                            
                        
                            <div class="gallery-item-info">

                                <ul>
                                    <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 56</li>
                                    <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
                                </ul>

                            </div>
                            </a>`
        bookmark_frame.appendChild(bookmark)
    })

    //=======나의 주문목록 불러오기========
    const response_order = await fetch(`${BACK_END_URL}/profile/myorderlist/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    
    orders = await response_order.json()
    order_frame = document.getElementById('order_list')
    orders.forEach(element => {
        const order = document.createElement('div')
        order.setAttribute("class", "product")

        let object_price = element.count * element.price
        let status_innerText = "주문 미확인"
        let status_border = "2px solid red"
        let status_color = "red"

        if (element.order_status==1){
            status_innerText = "주문 확인"
            status_border = "2px solid green"
            status_color = "green"

        } else if (element.order_status==2){
            status_innerText = "배송 시작"
            status_border = "2px solid black"
            status_color = "black"
        }

        order.innerHTML = `<header>
                                <a class="remove">
                                    <img src="${BACK_END_URL}${element.product.image}" alt="">
            
                                    <h3>Remove product</h3>
                                </a>
                            </header>

                            <div class="content">
                            <a href="${FRONT_BASE_URL}/detail.html?id=${element.product.id}"><h1 >셔츠</h1></a>
                                <h3>사이즈 : ${element.size}</h3>
                                <div class="select-form">  
                                    <div class="order-status" id="order_status" style="
                                    border:${status_border};
                                    color:${status_color};">
                                        ${status_innerText}
                                    </div>
                                </div>
                            </div>
                            <footer class="content">
                                <span class="qt-minus">수량 :</span>
                                <span class="qt">${element.count}</span>
                                <h2 class="full-price">
                                ${object_price} <span>won</span>
                                </h2>
                                <h2 class="price">
                                ${element.price} <span>won</span>
                                </h2>
                            </footer>`
        order_frame.appendChild(order)
    })



}

function tweetMy(){
    order_list.style.display ="none";
    gallery_mypage.style.display="flex";
    gallery_bookmark.style.display="none";

}

function tweetBookmark(){
    order_list.style.display ="none";
    gallery_mypage.style.display ="none";
    gallery_bookmark.style.display ="flex";
    
}

function myOrderList(){
    order_list.style.display ="block";
    gallery_mypage.style.display ="none";
    gallery_bookmark.style.display ="none";
}

async function viewProfile(){
    console.log("viewprofile 버튼 눌림")
    const response_profile = await fetch(`${BACK_END_URL}/profile/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    user_profile = await response_profile.json()
    console.log(user_profile)

    const user_image = document.getElementById("user_image")
    const author_name = document.getElementById("author_name")
    const phone = document.getElementById("phone")
    const address = document.getElementById("address")
    const profileimage = document.getElementById("output_image")

    user_image.innerText = user_profile.email
    author_name.setAttribute("value", user_profile.profilename)
    phone.setAttribute("value", user_profile.phone)
    address.setAttribute("value", user_profile.address)
    profileimage.setAttribute("src", `${BACK_END_URL}${user_profile.profile}`)
    

}

async function editProfile(){

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

    fetch(`${BACK_END_URL}/profile/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: formData,
    })
    .then((data) => console.log(data))
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
