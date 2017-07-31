let ReportProduct = {

    loadProductTable: function() {
        Debug.print("loadProductTable()");
        PageComponnets.cleanPageContent();
        PageComponnets.createTable();
        PageComponnets.cleanTableHead();
        PageComponnets.cleanTableBody();
        PageComponnets.editTableCaption("Products");
        ReportProduct.addProductTableHeader();
        let productList = ProductDB.getProductList();
        for (let index = 0; index < productList.length; index++) {
            ReportProduct.addProductTable(productList[index].code, productList[index].name, productList[index].description, productList[index].price);
        }

    },

    addProductTable: function(code, name, description, price) {
        let tbody = document.getElementById("tableReportTbody");
        let tr = document.createElement("tr");
        let tdCode = document.createElement("td");
        let tdName = document.createElement("td");
        let tdDescription = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdBtns = document.createElement("td");
        let btnEdit = document.createElement("span");
        let btnDelete = document.createElement("span");

        tdCode.innerHTML = code;
        tdName.innerHTML = name;
        tdDescription.innerHTML = description;
        tdPrice.innerHTML = price;

        btnEdit.innerText = "Edit";
        btnEdit.className = "btn btn-success";
        btnEdit.setAttribute("data-productCode", code);
        btnEdit.onclick = function() {
            let productCode = btnEdit.getAttribute('data-productCode');
            ReportProduct.editProductModal(productCode, btnEdit);
        };

        btnDelete.innerText = "Delete";
        btnDelete.className = "btn btn-danger";
        btnDelete.setAttribute("data-productCode", code);
        btnDelete.onclick = function() {
            let productCode = btnDelete.getAttribute('data-productCode');
            ProductDB.deleteProduct(productCode, btnDelete);
            ReportProduct.loadProductTable();
        };

        tdBtns.appendChild(btnEdit);
        tdBtns.appendChild(btnDelete);

        tr.appendChild(tdCode);
        tr.appendChild(tdName);
        tr.appendChild(tdDescription);
        tr.appendChild(tdPrice);
        tr.appendChild(tdBtns);
        tbody.appendChild(tr);
    },

    addProductTableHeader: function() {
        let tthead = document.getElementById("tableReportThead");

        let tr = document.createElement("tr");
        let thCode = document.createElement("th");
        let thName = document.createElement("th");
        let thDescription = document.createElement("th");
        let thPrice = document.createElement("th");
        let thActions = document.createElement("th");

        thCode.innerHTML = 'Code';
        thName.innerHTML = 'Name';
        thDescription.innerHTML = 'Description';
        thPrice.innerHTML = 'Price';
        thActions.innerHTML = 'Actions';

        tr.appendChild(thCode);
        tr.appendChild(thName);
        tr.appendChild(thDescription);
        tr.appendChild(thPrice);
        tr.appendChild(thActions);
        tthead.appendChild(tr);
    },

    editProductModal: function(code) {
        let product = ProductDB.getProductByCode(code);
        if (product != null) {
            let editProductCategory = document.getElementById("editProductCategory");
            let editProductCode = document.getElementById("editProductCode");
            let editProductName = document.getElementById("editProductName");
            let editProductDescription = document.getElementById("editProductDescription");
            let editProductPrice = document.getElementById("editProductPrice");
            editProductCategory.textContent = product.category;
            editProductCode.textContent = code;
            editProductName.value = product.name;
            editProductDescription.value = product.description;
            editProductPrice.value = product.price;
            $('#productEditPopUpWindow').modal('show');
        }

    },

};

document.getElementById("btnProductEdit").onclick = function() {
    Debug.print("click btnProductEdit");
    let editProductCategory = document.getElementById("editProductCategory");
    Debug.print("editProductCategory ", editProductCategory.textContent);
    let editProductCode = document.getElementById("editProductCode");
    Debug.print("editProductCode ", editProductCode.textContent);
    let editProductName = document.getElementById("editProductName");
    Debug.print("editProductName ", editProductName.value);
    let editProductDescription = document.getElementById("editProductDescription");
    Debug.print("editProductDescription ", editProductDescription.value);
    let editProductPrice = document.getElementById("editProductPrice");
    Debug.print("editProductPrice ", editProductPrice.value);

    if (editProductName.value != "" || editProductDescription.value != "" ||
        editProductPrice.value > 0) {
        let index = ProductDB.getIndexProductByCode(editProductCode.textContent);
        if (index >= 0) {
            ProductDB.editProduct(editProductCode.textContent, editProductName.value,
                editProductDescription.value, editProductPrice.value);
            editProductName.value = "";
            editProductDescription.value = "";
            editProductPrice.value = "";
            $('#productEditPopUpWindow').modal('hide');
            ReportProduct.loadProductTable();
        } else {
            Debug.print("alert");
            alert("Product already exists");
            $('#productEditPopUpWindow').modal('hide');
        }
    } else {
        Debug.print("alert");
        alert("Product is empty");
        $('#productEditPopUpWindow').modal('hide');
    }
};