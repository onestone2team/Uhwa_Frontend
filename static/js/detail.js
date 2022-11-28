var num = 0
var size = 0
var money = 0
var amount_money = 0
var inputnum = document.getElementById("countNum");
var moneynum = document.getElementById("amout_money");

let urlParameter = window.location.search;
var product_id = urlParameter.split('=')[1]

//=======게시글 불러오기========
window.onload = async function ProductDetail() {

    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    if(!parsed_payload){
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../templates/main.html")
    }

    $("#headers").load("../templates/navigation.html");
    inputnum.innerText = num;
    moneynum.innerText = 0;

    const product = await fetch(`${BACK_END_URL}/products/${product_id}/detail/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })


    const user_data = await fetch(`${BACK_END_URL}/profile/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    //=====프로필 이미지 변경=======
    
    user_data_json = await user_data.json()
    user_profile = user_data_json["profile"]
    const user_image = document.getElementById("user-img")
    user_image.setAttribute("src", `${BACK_END_URL}${user_profile}`)


//========게시글 이미지 불러오기========
    product_json = await product.json()
    money = product_json["category"]

    const product_image = document.getElementById("image-form")
    product_image.setAttribute("src", `${BACK_END_URL}${product_json.image}`)

//========댓글 불러오기========
    comments = product_json.comments_set

    comment_frame = document.getElementById('comment-put')

    comments.forEach(element => {
        console.log(element)
        const comment = document.createElement('div')
        comment.innerHTML =`<!-- Comments List -->
                            <div class="comments" id="commment">
                                <!-- Comment - Dummy -->
                                <div class="comment">
                                    <!-- Comment Avatar -->
                                    <div class="comment-avatar">
                                    <img src="${BACK_END_URL}${element.user.profile}" style="height:100%">
                                    </div>
                                    <!-- Comment Box -->
                                    <div class="comment-box" >
                                        <div class="comment-text">${element.comment}</div>
                                            <div class="comment-footer">
                                                <div class="comment-info">
                                                    <span class="comment-author">
                                                    <a>${element.user.profilename}</a>
                                                    </span>
                                                    <span class="comment-date">${element.created_at}</span>
                                                    <span>|</span>
                                                    <span classs="comment-grade"> 점수 : ${element.grade}</span>
                                                </div>
                                                <div class="comment-actions" id="edit-button${element.id}">
                                                    <i onclick="editComment(${element.id})" class="bi bi-pencil-square"></i>
                                                    <span>/</span>
                                                    <i onclick="deleteComment(${element.id})" class="bi bi-trash3"></i>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <!-- Comment Edit -->
                                    <div class="comment-edit" id="edit_box${element.id}">
                                        <textarea class="input" name="comment_edit" id="comment_edit" ng-model="cmntCtrl.comment.text"
                                        placeholder="Edit Review..." required></textarea>
                                        <div class="edit_button">
                                            <button type="button" onclick="putComment(${element.id})">add Review</button>
                                        </div> 
                                    </div>
                                </div>
                            </div>`
        comment_frame.appendChild(comment)

        if (element.user.profilename != user_data_json["profilename"]){
            const comment_check = document.getElementById(`edit-button${element.id}`)
            comment_check.style.display= "none"
        }
    })

    //======북마크 되어 있는지 확인
    bookmark_list = product_json["bookmark"]
    if (bookmark_list.includes(user_data_json["id"])){
        const bookmark_icon = document.getElementById('bookmark_icon')
        bookmark_icon.className = "bi bi-heart-fill"
    }


}//window.onload 괄호

//===========댓글 생성하기===========
async function addComment(){
    const commentText = document.getElementById('comment_input').value;
    const query = document.querySelector('input[name="rating"]:checked').value;

    const response = await fetch(`${BACK_END_URL}/products/${product_id}/comment/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
            body: JSON.stringify({
                "comment": commentText,
                "grade": query
            })
        })
        comment_json = await response.json()

        if (response.status == 201) {
            alert("댓글 입력 완료")
        }
        else {
            alert(comment_json["message"])
        }
        location.reload()
    }
//==========댓글 수정하기==========
function editComment(id) {
    const editBox = document.getElementById(`edit_box${id}`)
    if (editBox.style.display == 'none') {
        editBox.style.display = 'block';
    } else {
        editBox.style.display = 'none';
    }
}

async function putComment(comment_id) {
    const new_comment = document.getElementById('comment_edit').value
        const response = await fetch(`${BACK_END_URL}/products/${product_id}/comment/${comment_id}/`, {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'PUT',
            body: JSON.stringify({
                "comment": new_comment
            })
        })
        comment_json = await response.json()

        if (response.status == 201) {
            alert("댓글 수정 완료")
        } else {
            console.log(comment_json['message'])
        }

        location.reload()

}

//==========댓글 삭제하기==========

async function deleteComment(comment_id){


    const url = `${BACK_END_URL}/products/${product_id}/comment/${comment_id}/`;
    const response = fetch(url, {
                    headers: {
                        "content-type": "application/json",
                         "Authorization": "Bearer " + localStorage.getItem("access")
                             },
                    method: "DELETE"
                    }).then(respond => {
              if (respond.status == 204) {
                    alert("댓글을 삭제 했습니다.");
                }
            else {
                    alert("댓글이 삭제되지 않았습니다. 다시 시도해주세요")
                 }

    const target = document.querySelector(".comment");
    target.remove();
    
     });
};
        
//========북마크 추가하기===========준표님???=====
async function bookmark() {
    
    const response = await fetch(`${BACK_END_URL}/products/${product_id}/bookmark/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })


    if (response.status==200 || response.status==202){
        alert("북마크 변경 완료")
        location.reload();
    }
    
   
}

async function orderButton() {
    
    if (num!=0 && size!=0 && amount_money !=0){

        const url = `${BACK_END_URL}/order/list/${product_id}/`
        console.log(url)
        const response = await fetch(url, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
            body: JSON.stringify({
                "price":String(amount_money),
                "size":size,
                "count":String(num)
            })
            })

            if (response.status == 201) {
                alert("주문 완료")
                location.replace("../templates/profile.html")
            }
            else {
                alert(response.status)
            }
    } else{
        alert("주문 옵션을 다시 확인해 주세요")
    }
    
     
}    
//==================================================================    
function selectButton() {
    const select_form = document.getElementById("select_form")
    if (select_form.style.display == 'none') {
        select_form.style.display = 'block';
    } else {
        select_form.style.display = 'none';
    }
}

function changeValue() {
    var value_str = document.getElementById('select_value');
    size = value_str.options[value_str.selectedIndex].text
    // size 값 전달
    var size_text = document.getElementById('size_select');
    size_text.innerText = size;
}

function upButton() {
    num += 1;
    inputnum.innerText = num;
    amount_money = money * num;
    moneynum.innerText = amount_money;
}

function downButton() {
    if (num > 0) {
        num -= 1;
        inputnum.innerText = num;
        amount_money = money * num;
        moneynum.innerText = amount_money;
    }

}

