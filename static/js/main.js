window.addEventListener('load', function() {
    $("#headers").load("../templates/navigation.html");


    show_product_list()
});

pageNum = 1


async function show_product_list() {
    const response = await fetch(`${BACK_END_URL}/products/?page=${pageNum}`, {
        headers: {
            "Access-Control-Allow-Origin" : BACK_END_URL,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Expose-Headers": Authorization,
            'content-type': 'applycation/json',
        },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        var products = document.getElementById("products");
        $("#products").empty();
        for (i = 0; i < data["data"].length; i++) {
            const product = document.createElement('article')
            product.setAttribute("class", "card")
            product.innerHTML = `<a href="detail.html?id=${data["data"][i]['id']}">
                                    <figure class="thumbnail">
                                        <img src="${BACK_END_URL}${data["data"][i]["image"]}" alt="${data["data"][i]["user"]}">
                                    </figure>
                                    <div class="card-content">
                                        <h2>${data["data"][i]["user"]}</h2>
                                    </div>
                                </a>`
            products.appendChild(product)
            total_page = data["max_page"]
        }
    })
}
function pageNext1() {
    console.log(total_page)
    if (pageNum > 0 && pageNum < total_page) {
        ++pageNum
        show_product_list()
    }
}

function pagePreview1() {
    if (pageNum > 1) {
        --pageNum
        show_product_list()
    }
}
