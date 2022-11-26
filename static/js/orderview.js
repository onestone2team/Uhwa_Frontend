
window.onload = async function ViewProfile() {
  $("#headers").load("../templates/navigation.html");

  const response_orderlist = await fetch(`${BACK_END_URL}/order/list/admin/`, {
    headers: {
        'content-type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("access")
    },
    method: 'GET',
})
let none_check = 0
let total_price = 0
orderlist = await response_orderlist.json()
console.log(orderlist)
order_frame = document.getElementById('container')
orderlist.forEach(element => {
  const order = document.createElement('div')
  order.setAttribute("class", "product")

  let object_price = element.count * element.price
  let status_innerText = "주문 미확인"
  let status_border = "2px solid red"
  let status_color = "red"
  if (element.order_status==0){
    none_check += 1
  }

  if (element.order_status==1){
      status_innerText = "주문 확인"
      status_border = "2px solid green"
      status_color = "green"

  } else if (element.order_status==2){
      status_innerText = "배송 시작"
      status_border = "2px solid black"
      status_color = "black"
  }

  total_price += object_price
  
  order.innerHTML = `<header>
                          <a class="remove">
                              <img src="${BACK_END_URL}${element.product.image}" alt="">
                              <h3>Remove product</h3>
                          </a>
                      </header>

                      <div class="content">
                      <a href="${FRONT_BASE_URL}/detail.html?id=${element.product.id}"><h1 >셔츠</h1></a>
                          <h6>사이즈 : ${element.size}</h6>
                          <h6>주문일자 : ${element.created_at}</h6>
                          <div class="select-form">
                            <div>
                              <label for="pet-select">배송 상태 변경:</label>
                              <select name="status" id="status_select${element.id}">
                                <option value="-1" id="" disabled selected>--상태 선택--</option>
                                <option value="0">주문 미확인</option>
                                <option value="1">주문 확인</option>
                                <option value="2">배송 시작</option>
                              </select>
                            </div>
                            <div class="order-save">
                              <button onclick="statusButton(${element.id})">상태변경</button>
                            </div>
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

  const check = document.getElementById("none_check")
  check.innerText = none_check

  const total_input = document.getElementById("total_input")
  total_input.innerText = total_price

}

async function statusButton(order_id) {
  console.log("상태 변경 버튼 눌림")
  var status_str = document.getElementById(`status_select${order_id}`);
  var status_text = document.getElementById('order_status');

  orderstatus = status_str.options[status_str.selectedIndex].text
  value = status_str.options[status_str.selectedIndex].value

  console.log(orderstatus, value)
  if (value >= 0){
    const response_status = await fetch(`${BACK_END_URL}/order/list/admin/${order_id}/`, {
      headers:{
      "content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access")
      },
      method: "PUT",
      body: JSON.stringify({
          "order_status": value
      })
    })
    alert("상태를 변경 완료")
    location.reload()

  } else{
    alert("상태를 선택해 주세요")
  }
}