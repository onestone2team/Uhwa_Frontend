var num = 0
var size = 0
var money = 30000
var amount_money = 0
var inputnum = document.getElementById("countNum");
var moneynum = document.getElementById("amout_money");

let url = window.location.search;
console.log(url)
let urlparam = new URLSearchParams(url);
console.log(urlparam)
// var product_id = urlParameter.split('=')[1]
var product_id = urlparam.get("id")
var comment_id = urlparam.get('comment_id')
console.log(product_id)
console.log(comment_id)

//=======게시글 불러오기========
window.onload = async function ProductDetail() {
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

//========게시글 이미지 불러오기========

    product_json = await product.json()
    console.log(product_json)

    const product_image = document.getElementById("image-form")
    product_image.setAttribute("src", `${BACK_END_URL}${product_json.image}`)

//========댓글 불러오기========
    comments = product_json.comments_set
    console.log(comments)
    console.log(comments[0].user)
    comment_frame = document.getElementById('comment-put')

    comments.forEach(element => {
        const comment = document.createElement('div')
        comment.innerHTML =`<div class="comment">
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
                                        <div class="comment-actions" id="edit-button">
                                            <i onclick="editComment(${element.id})" class="bi bi-pencil-square"></i>
                                            <span>/</span>
                                            <i onclick="deleteComment()" class="bi bi-trash3"></i>
                                        </div>
                                    </div>
                                </div>
                                </div> 
                            </div>`

        comment_frame.appendChild(comment)
    })

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

        if (response.status == 201) {
            alert(response.data)
        }
        else {
            alert(response.status)
        }

        location.reload()
    }
//==========댓글 수정하기==========
// async function editComment() {
//         console.log("댓글 수정")
//         const editBox = document.getElementById('comment_edit').value
//         const response = await fetch(`${BACK_END_URL}/products/${product_id}/comment/${comment_id}/`, {
//             headers: {
//                 "content-type": "application/json",
//                 "Authorization": "Bearer " + localStorage.getItem("access")
//             },
//             method: "Update",
//             body: JSON.stringify({
//                 "comment": editBox,
//             })
//         })
//         if (response.status == 200) {
//             alert(response.data)
//         }
//         else {
//             alert(response.status)
//         }

//         location.reload()

// }
//==========댓글 삭제하기==========
async function deleteComment(int){

    const url = `${BACK_END_URL}/products/${product_id}/comment/${int}/`;
    console.log(url)
    const response = fetch(url, {
                    headers: {
                        "content-type": "application/json",
                         "Authorization": "Bearer " + localStorage.getItem("access")
                             },
                    method: "DELETE"
                    }).then(respond => {
              if (respond.status == 204) {
                                            alert(respond.status);
                                        }
            else {
                    alert("삭제되지 않았습니다 다시해")
                 }

    const target = document.querySelector(".comment");
    target.remove();
    
     });
};
        
//========북마크 추가하기===========준표님???=====
async function bookmark(product_id) {

        const response = await fetch(`${BACK_END_URL}/detail/${product_id}/bookmark/`, {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: "POST",

        })
        if (response.status == 200) {
            alert(response.message)
        }
        else {
            alert(response.status)
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
    console.log(amount_money)
}

function downButton() {
    if (num > 0) {
        num -= 1;
        inputnum.innerText = num;
        amount_money = money * num;
        moneynum.innerText = amount_money;
        console.log(amount_money)
    }

}

function orderButton() {
    console.log("주문 버튼 클릭")
    console.log(num, size, amount_money)
}

function addcommend() {
    // const commentText = document.getElementById('comment_input').value;
    // const query = document.querySelector('input[name="rating"]:checked');
    console.log(commentText, query.value)

}

// function deleteComment() {
//     console.log("댓글 삭제")
// }

function editComment(int) {
    console.log(int)
    const editBox = document.getElementById('edit_box')
    if (editBox.style.display == 'none') {
        editBox.style.display = 'block';
    } else {
        editBox.style.display = 'none';
    }

}

function putComment() {
    const editBox = document.getElementById('comment_edit').value
    console.log(editBox)
    alert("댓글 저장")
    location.reload()
}
