
window.onload=()=>{
  $("#headers").load("../templates/navigation.html");
  
}

function statusButton() {
  console.log("상태 변경 버튼 눌림")
  var status_str = document.getElementById('status_select');
  var status_text = document.getElementById('order_status');

  orderstatus = status_str.options[status_str.selectedIndex].text
  value = status_str.options[status_str.selectedIndex].value

  console.log(orderstatus, value)
  if (value >= 0){
    status_text.innerText = orderstatus
    if (value==1){
      status_text.style.border = "2px solid green"
      status_text.style.color = "green"
    } else if (value==2){
      status_text.style.border = "2px solid black"
      status_text.style.color = "black"

    } 
    alert("상태를 변경 완료")

  } else{
    alert("상태를 선택해 주세요")
  }
}