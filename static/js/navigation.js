payload = localStorage.getItem("payload")
parsed_payload = JSON.parse(payload)
const loginoutUl = document.getElementById("loginout")

adminCheck = false

if(parsed_payload){
    loginoutUl.innerText="logout"
    loginoutUl.setAttribute("onclick", "handleLogout()")
    adminCheck = parsed_payload["is_admin"]
}
else{
    loginoutUl.innerText="login"
    loginoutUl.setAttribute("href", "login.html")
}

function handleLogout(){
    if (confirm("정말 로그아웃 하시겠습니까?") == true){ 
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("payload")
        console.log("로그아웃 되었습니다.");
      }else{
        // false는 취소버튼을 눌렀을 때, 취소됨
        location.replace("../templates/main.html")
      }
}

if(adminCheck == false){
    const adminpage = document.getElementById("adminbutton")
    adminpage.style.display="none"
}