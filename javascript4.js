class Product {
    constructor(id, name, img, type, detail, price, quantity, total) {
        this.pId = id,
        this.pName = name,
        this.pImg = img,
        this.pType = type,
        this.pDetail = detail,
        this.pPrice = price,
        this.pQuantity = quantity,
        this.pTotal = total
    }
}

let productList = []
const KEY_PRODUCT = 'productList'

//up data to localStorage
function upData() {
    localStorage.setItem(KEY_PRODUCT, JSON.stringify(productList))
}

//get data from localStorage
function getData() {
    let data = JSON.parse(localStorage.getItem(KEY_PRODUCT))
    if (data === null) {
        productList = []
    } else {
        productList = data;
    }
}

//find product by id
function findProductById(idFind) {
    for (let idx in productList) {
        if (productList[idx].pId === idFind) {
            return productList[idx]
        }
    }
    return null;
}

//find index product by id
function findIndexProductById(idFind) {
    for (let idx in productList) {
        if (productList[idx].pId === idFind) {
            return idx
        }
    }
    return null;
}

//update total price
function updateTotalPrice() {
    document.getElementById('productTotal').value = 
        document.getElementById('productPrice').value *
        document.getElementById('productQuantity').value
}

//change title2
function changeTitle2(title) {
    document.getElementById('title2').innerHTML = title
}

//check null
function checkNullInput() {
    let id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let img = document.getElementById('productImg').value;
    let type = document.getElementById('productType').value;
    let detail = document.getElementById('productDetail').value;
    let price = document.getElementById('productPrice').value;
    let quantity = document.getElementById('productQuantity').value;
    // let total = document.getElementById('productTotal').value;
    if (id !== '' && name !== '' && img !== '' && type !== '' &&
        detail !== '' && price !== '' && quantity !== '') {
            return true
    } else {
        return false
    }
}

//trả về null input
function nullInput() {
    document.getElementById('productId').value = ''
    document.getElementById('productName').value = ''
    document.getElementById('productImg').value = ''
    document.getElementById('productType').value = 0
    document.getElementById('productType').
        options[document.getElementById('productType').selectedIndex].text = 'Chọn loại sản phẩm'
    document.getElementById('productDetail').value = ''
    document.getElementById('productPrice').value = ''
    document.getElementById('productQuantity').value = ''
    document.getElementById('productTotal').value = ''
    document.getElementById('showImg').src = './img/applelogo.png'
}

//addBtn
let addBtn = document.getElementById('addBtn')
addBtn.onclick = function () {
    let id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let img = document.getElementById('productImg').value;
    let type = document.getElementById('productType');
    let selectedType = type.options[type.selectedIndex].text;
    let detail = document.getElementById('productDetail').value;
    let price = document.getElementById('productPrice').value;
    let quantity = document.getElementById('productQuantity').value;
    let total = document.getElementById('productTotal').value;

    if (checkNullInput()) {
        let existedProduct = findProductById(id);
        if (existedProduct === null) {
            getData()
            newProduct = new Product(
                id, name, img, selectedType, detail, price, quantity, total
            );
            productList.push(newProduct)
            upData()
            console.log(productList)
            nullInput()
            displayOneProduct(newProduct)
        } else {
            alert('id đã tồn tại!')
        }
    } else {
        alert('nhập đầy đủ thông tin!')
    }
}

//display one product
function displayOneProduct(product, trClassName) {
    let tbodyElement = document.querySelector('tbody')

    //display 1 row for 1 product
    let trElement = document.createElement('tr')
    trElement.className = trClassName;
    trElement.id = product.pId
    tbodyElement.appendChild(trElement)
    
    //display id
    let tdElementId = document.createElement('td')
    tdElementId.innerHTML = product.pId
    trElement.appendChild(tdElementId)

    //display name
    let tdElementName = document.createElement('td')
    tdElementName.innerHTML = product.pName
    trElement.appendChild(tdElementName)

    //display image
    let tdElementImg = document.createElement('td')
    let imgElement = document.createElement('img')
    imgElement.className = 'productImg'
    imgElement.src = product.pImg
    tdElementImg.appendChild(imgElement)
    trElement.appendChild(tdElementImg)

    //display type
    let tdElementType = document.createElement('td')
    tdElementType.innerHTML = product.pType
    trElement.appendChild(tdElementType)
    
    //display detail
    let tdElementDetail = document.createElement('td')
    tdElementDetail.innerHTML = product.pDetail
    trElement.appendChild(tdElementDetail)
    
    //display price
    let formatVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
    let tdElementPrice = document.createElement('td')
    tdElementPrice.innerHTML = formatVND.format(product.pPrice)
    trElement.appendChild(tdElementPrice)
    //display quantity
    let tdElementQuantity = document.createElement('td')
    tdElementQuantity.innerHTML = product.pQuantity
    trElement.appendChild(tdElementQuantity)

    //display total price
    let tdElementTotal = document.createElement('td')
    tdElementTotal.innerHTML = formatVND.format(product.pTotal)
    trElement.appendChild(tdElementTotal)

    //cancelBtn
    let cancelBtn = document.getElementById('cancelBtn')
    cancelBtn.onclick = function() {
        document.getElementById('productId').disabled = false;
        addBtn.style.display = 'inline-block'
        updateBtn.style.display = 'none'
        deleteBtn.style.display = 'none'
        cancelBtn.style.display = 'none'
        nullInput()
        changeTitle2('Thêm sản phẩm')
        // location.reload()
    }

    //deleteBtn
    let deleteBtn = document.getElementById('deleteBtn')
    deleteBtn.onclick = function() {
        let thongBaoXoa = confirm('Bạn có muốn xóa?')
        if(thongBaoXoa) {
            trElement.remove()
            getData();
            productList.splice(findIndexProductById(
                document.getElementById('productId').value
            ), 1)
            upData()
            nullInput()
            document.getElementById('productId').disabled = false;
            addBtn.style.display = 'inline-block'
            updateBtn.style.display = 'none'
            deleteBtn.style.display = 'none'
            cancelBtn.style.display = 'none'
            location.reload()
        }
    }

    //updateBtn
    let updateBtn = document.getElementById('updateBtn')
    updateBtn.onclick = function(){
        
        let pId = document.getElementById('productId').value;
        let pName = document.getElementById('productName').value;
        let pImg = document.getElementById('productImg').value;
        // let pType = document.getElementById('productType').value;
        let pType = document.getElementById('productType').
        options[document.getElementById('productType').selectedIndex].text;

        let pDetail = document.getElementById('productDetail').value;
        let pPrice = document.getElementById('productPrice').value;
        let pQuantity = document.getElementById('productQuantity').value;
        let pTotal = document.getElementById('productTotal').value;

        if(checkNullInput()) {
            tdElementId.innerHTML = pId;
            tdElementName.innerHTML = pName;
            imgElement.src = pImg;
            tdElementType.innerHTML = pType;
            tdElementDetail.innerHTML = pDetail;
            tdElementPrice.innerHTML = pPrice;
            tdElementQuantity.innerHTML = pQuantity;
            tdElementTotal.innerHTML = pTotal;
            getData()
            productList.splice(findIndexProductById(
                document.getElementById('productId').value
            ), 1, {
                pId, pName, pImg, pType,
                pDetail, pPrice, pQuantity, pTotal
            })
            upData()
            location.reload();
        } else {
            alert('Nhập đầy đủ thông tin!')
        }
    }

    //show infor
    trElement.onclick = function() {
        // console.log(trElement)
        document.getElementById('formEdit').scrollIntoView()
        
        document.getElementById('productId').disabled = true;
        document.getElementById('productId').value = product.pId
        document.getElementById('productName').value = product.pName
        document.getElementById('productImg').value = product.pImg
        // document.getElementById('productType').value = product.pType
        document.getElementById('productType').
            options[document.getElementById('productType').
                selectedIndex].text = product.pType
        document.getElementById('productDetail').value = product.pDetail
        document.getElementById('productPrice').value = product.pPrice
        document.getElementById('productQuantity').value = product.pQuantity
        document.getElementById('productTotal').value = product.pTotal
        document.getElementById('showImg').src = product.pImg

        addBtn.style.display = 'none'
        updateBtn.style.display = 'inline-block'
        cancelBtn.style.display = 'inline-block'
        deleteBtn.style.display = 'inline-block'
        changeTitle2('Chỉnh sửa sản phẩm')
    }
}

//find products by name
function findProductsByName(nameFind) {
    let listResult = []
    for (let idx in productList) {
        if ((productList[idx].pName.toUpperCase()).indexOf(nameFind.toUpperCase()) > -1) {
            listResult.push(productList[idx]);
        }
    } 
    return listResult;
}

//moveToAddBtn
let moveToAddBtn = document.getElementById('moveToAddBtn')
moveToAddBtn.onclick = function() {
    document.getElementById('formEdit').scrollIntoView()
    document.getElementById('productId').disabled = false;
    addBtn.style.display = 'inline-block'
    updateBtn.style.display = 'none'
    deleteBtn.style.display = 'none'
    cancelBtn.style.display = 'none'
    nullInput()
    changeTitle2('Thêm sản phẩm')
}

//display products
function displayProduct(fnc, list, addClassName) {
    fnc;
    for (let idx in list) {
        displayOneProduct(list[idx], addClassName)
    }
}

displayProduct(getData(), productList, 'classShowAll')

//search btn
let searchBtn = document.getElementById('searchBtn')
let cancelSearchBtn = document.getElementById('cancelSearchBtn')
searchBtn.onclick = function() {
    let productSearch = document.getElementById('productSearch').value
    if (productSearch !== '' ) {
        displayProduct(getData(), findProductsByName(productSearch), 'classSearch')
        let classShowAll = document.getElementsByClassName('classShowAll')
        cancelSearchBtn.style.display = 'inline-block'
        for (let i = 0; i< classShowAll.length; i++) {
            classShowAll[i].style.display = 'none'
        }
        searchBtn.style.display = 'none'
        // document.getElementById('productSearch').disabled = true;
    }
}

//cancel search
cancelSearchBtn.onclick = function() {
    location.reload()
}
