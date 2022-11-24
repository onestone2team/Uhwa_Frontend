var num = 0
var size = 0
var money = 30000
var amount_money = 0
var inputnum = document.getElementById("countNum");
var moneynum = document.getElementById("amout_money");


window.addEventListener('load', function() {
    $("#headers").load("../templates/navigation.html");
    inputnum.innerText = num;
    moneynum.innerText = 0;
});

function selectButton(){
    const select_form = document.getElementById("select_form")
    if(select_form.style.display=='none'){ 		
    	select_form.style.display = 'block'; 	
    }else{ 		
    	select_form.style.display = 'none'; 	
    } 
}

function changeValue(){
    var value_str = document.getElementById('select_value');
    size = value_str.options[value_str.selectedIndex].text
    // size 값 전달
    var size_text = document.getElementById('size_select');
    size_text.innerText = size;
}

function upButton(){
    num += 1;
    inputnum.innerText = num;
    amount_money = money *num;
    moneynum.innerText = amount_money;
    console.log(amount_money)
}

function downButton(){
    if (num > 0 ){
        num -= 1;
        inputnum.innerText = num;
        amount_money = money *num;
        moneynum.innerText = amount_money;
        console.log(amount_money)
    }

}

function orderButton(){
    console.log("주문 버튼 클릭")
    console.log(num, size, amount_money)
}

function addcommend(){
    const commentText = document.getElementById('comment_input').value;
    const query = document.querySelector('input[name="rating"]:checked');
    console.log(commentText, query.value)

}

function deleteComment(){
    console.log("댓글 삭제")
}

function editComment(){
    console.log("댓글 수정")
    const editBox = document.getElementById('edit_box')
    if(editBox.style.display=='none'){ 		
    	editBox.style.display = 'block'; 	
    }else{ 		
    	editBox.style.display = 'none'; 	
    } 

}

function putComment(){
    const editBox = document.getElementById('comment_edit').value
    console.log(editBox)
    alert("댓글 저장")
    location.reload()
}