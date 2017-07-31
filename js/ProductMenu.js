let ProductMenu = {

    loadProducts: function(category) {
        PageComponnets.cleanPageContent();
        PageComponnets.createContentRow();
        PageComponnets.cleanContentRow();
        let contentRow = document.getElementById("contentRow");
        let products = ProductDB.getProductList();
        for (let index = 0; index < products.length; index++) {
            let product = products[index];
            if (category != "" && product.category != category)
                continue;
            let div = document.createElement("div");
            let img = document.createElement("img");
            let span = document.createElement("span");
            div.id = "product";
            div.className = "col-md-3";
            span.innerHTML = product.category + " - " + product.code + " - " + product.name + " - R$" + product.price;
            img.src = "./images/products/" + product.imageName;
            img.className = "img-thumbnail";
            img.alt = "Responsive image";
            div.appendChild(img);
            div.appendChild(span);
            div.setAttribute("data-product", product.code);
            div.onclick = function() {
                let productCode = div.getAttribute('data-product');
                ProductMenu.showProduct(productCode, div);
            };
            contentRow.appendChild(div);

        }
    },

    showProduct: function(productCode) {
        PageComponnets.cleanContentRow();
        let contentRow = document.getElementById("contentRow");
        let product = ProductDB.getProductByCode(productCode);
        let divImg = document.createElement("div");
        let img = document.createElement("img");
        divImg.id = "product";
        divImg.className = "col-md-7";
        img.src = "./images/products/" + product.imageName;
        img.className = "img-thumbnail";
        img.alt = "Responsive image";
        divImg.appendChild(img);
        contentRow.appendChild(divImg);

        let divDesc = document.createElement("div");
        divDesc.id = "product";
        divDesc.className = "col-md-3";

        let divCategory = document.createElement("div");
        let spanCategory = document.createElement("span");
        spanCategory.innerText = "Category: " + product.category;
        divCategory.appendChild(spanCategory);

        let divCodeName = document.createElement("div");
        let spanCodeName = document.createElement("span");
        spanCodeName.innerText = "Code: " + product.code + " Name: " + product.name;
        divCodeName.appendChild(spanCodeName);

        let divDescription = document.createElement("div");
        let spanDescription = document.createElement("span");
        spanDescription.innerText = "Description: " + product.description;
        divDescription.appendChild(spanDescription);

        let divPrice = document.createElement("div");
        let spanPrice = document.createElement("span");
        spanPrice.innerText = "Price: R$" + product.price;
        divPrice.appendChild(spanPrice);

        let divQtd = document.createElement("div");
        divQtd.className = "form-group";
        let inputQtd = document.createElement("input");
        inputQtd.id = "productQtd";
        inputQtd.type = "number";
        inputQtd.className = "form-control";
        inputQtd.placeholder = 1;
        divQtd.appendChild(inputQtd);

        divDesc.appendChild(divCategory);
        divDesc.appendChild(divCodeName);
        divDesc.appendChild(divDescription);
        divDesc.appendChild(divPrice);
        divDesc.appendChild(divQtd);
        contentRow.appendChild(divDesc);

        let divbtn = document.createElement("div");
        let btnShop = document.createElement("span");
        divbtn.id = "product";
        divbtn.className = "col-md-3";
        btnShop.innerText = "Add Cart";
        btnShop.className = "btn btn-success";
        btnShop.setAttribute("data-product", product.code);
        btnShop.onclick = function() {
            let productCode = btnShop.getAttribute('data-product');
            ProductMenu.addCartProduct(productCode, btnShop);
        };
        divbtn.appendChild(btnShop);
        contentRow.appendChild(divbtn);
    },

    addCartProduct: function(productCode) {
        Debug.print("addCartProduct()");
        let clientLogin = SessionFakeClient.getClient_SF();
        if (ClientDB.checkClient(clientLogin.email, clientLogin.password)) {
            let formProductQtd = document.getElementById("productQtd");
            let productQtd = 1;
            if (formProductQtd.value == "")
                productQtd = formProductQtd.placeholder;
            else
                productQtd = formProductQtd.value;
            SessionFakeOrder.setProduct_SF(productCode, productQtd);
            let product = ProductDB.getProductByCode(productCode);
            // if (confirm("Return Shoping!") == true) {
            //     ProductMenu.loadProducts(product.category);
            // } else {
            //     ProductMenu.showCartProduct(product.category);
            // }
            // ProductMenu.loadProducts(product.category);
            ProductMenu.showCartProduct(product.category);
        } else {
            $('#clientLoginPopUpWindow').modal('show');
        }
    },

    showCartProduct: function(category) {
        Debug.print("showCartProduct()");
        PageComponnets.cleanContentRow();
        ClientPage.refreshCountOrderClient();
        let contentRow = document.getElementById("contentRow");

        let orderProducts_SF = SessionFakeOrder.getOrderProductList_SF();

        let divDesc = document.createElement("div");
        divDesc.id = "product";
        divDesc.className = "col-md-3";
        contentRow.appendChild(divDesc);

        let divProduct = document.createElement("div");
        let table = ProductMenu.createTableProductCart(orderProducts_SF);
        divProduct.appendChild(table);
        contentRow.appendChild(divProduct);

        let divPrice = document.createElement("div");
        let spanPrice = document.createElement("span");
        spanPrice.innerText = "Price: R$" + SessionFakeOrder.getTotalProductOrderProduct_SF();
        divPrice.appendChild(spanPrice);
        contentRow.appendChild(divPrice);

        let divbtn = document.createElement("div");
        divbtn.id = "product";
        divbtn.className = "col-md-3";

        let btnShop = document.createElement("span");
        btnShop.innerText = "Return Shopping";
        btnShop.className = "btn btn-info";
        btnShop.setAttribute("data-category", category);
        btnShop.onclick = function() {
            let category = btnShop.getAttribute('data-category');
            ProductMenu.loadProducts(category, btnShop);
        };
        divbtn.appendChild(btnShop);

        let btnFinalize = document.createElement("span");
        btnFinalize.innerText = "Finalize";
        btnFinalize.className = "btn btn-success";
        btnFinalize.onclick = function() {
            ProductMenu.finalizeCartProduct(btnFinalize);
        };
        divbtn.appendChild(btnFinalize);

        contentRow.appendChild(divbtn);
    },

    createTableProductCart: function(orderProducts_SF) {

        let table = document.createElement("table");
        table.id = "tableReport";
        table.className = "table table-bordered table-striped";

        let caption = document.createElement("caption");
        caption.id = "tableReportCaption";
        caption.innerText = "Cart";
        table.appendChild(caption);

        let thead = document.createElement("thead");
        thead.id = "tableReportThead";

        let tr = document.createElement("tr");
        let thCode = document.createElement("th");
        let thName = document.createElement("th");
        let thPrice = document.createElement("th");
        let thQtd = document.createElement("th");
        let thTotal = document.createElement("th");
        let thActions = document.createElement("th");

        thCode.innerHTML = 'Code';
        thName.innerHTML = 'Name';
        thPrice.innerHTML = 'Price';
        thQtd.innerHTML = 'Qtd';
        thTotal.innerHTML = 'Total';
        thActions.innerHTML = 'Actions';

        tr.appendChild(thCode);
        tr.appendChild(thName);
        tr.appendChild(thPrice);
        tr.appendChild(thQtd);
        tr.appendChild(thTotal);
        tr.appendChild(thActions);
        thead.appendChild(tr);
        table.appendChild(thead);

        let tbody = document.createElement("tbody");
        tbody.id = "tableReportTbody";

        for (let index = 0; index < orderProducts_SF.length; index++) {
            if (orderProducts_SF[index].productCode != 0)
                tbody.appendChild(ProductMenu.creatTableRowProduct(orderProducts_SF[index].productCode, orderProducts_SF[index].price, orderProducts_SF[index].productQtd));
        }
        table.appendChild(tbody);

        return table;
    },

    creatTableRowProduct: function(productCode, price, productQtd) {

        let tr = document.createElement("tr");
        let tdCode = document.createElement("td");
        let tdName = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdQtd = document.createElement("td");
        let tdTotal = document.createElement("td");
        let tdBtns = document.createElement("td");
        let btnPlus = document.createElement("span");
        let btnSub = document.createElement("span");
        let btnRemove = document.createElement("span");

        tdCode.innerHTML = productCode;
        let product = ProductDB.getProductByCode(productCode);
        tdName.innerHTML = product.name;
        tdPrice.innerHTML = price;
        tdQtd.innerHTML = productQtd;
        tdTotal.innerHTML = (price * productQtd);

        btnPlus.innerText = "+";
        btnPlus.className = "btn btn-success";
        btnPlus.setAttribute("data-productCode", productCode);
        btnPlus.onclick = function() {
            let productCode = btnPlus.getAttribute('data-productCode');
            ProductMenu.plusCartProduct(productCode, btnPlus);
        };
        tdBtns.appendChild(btnPlus);

        btnSub.innerText = "-";
        btnSub.className = "btn btn-warning";
        btnSub.setAttribute("data-productCode", productCode);
        btnSub.onclick = function() {
            let productCode = btnSub.getAttribute('data-productCode');
            ProductMenu.subCartProduct(productCode, btnSub);
        };
        tdBtns.appendChild(btnSub);

        btnRemove.innerText = "Remove";
        btnRemove.className = "btn btn-danger";
        btnRemove.setAttribute("data-productCode", productCode);
        btnRemove.onclick = function() {
            let productCode = btnRemove.getAttribute('data-productCode');
            ProductMenu.removeCartProduct(productCode, btnRemove);
        };
        tdBtns.appendChild(btnRemove);

        tr.appendChild(tdCode);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdQtd);
        tr.appendChild(tdTotal);
        tr.appendChild(tdBtns);
        return tr;
    },

    finalizeCartProduct: function() {
        if (orderProducts_SF.length > 0 && orderProducts_SF[0].productCode != 0) {
            OrderControler.createOrder();
            SessionFakeOrder.cleanOrderProduct_SF();
            ClientPage.refreshCountOrderClient();
            ProductMenu.loadProducts("");
        } else {
            Debug.print("alert");
            alert("Cart is empty");
        }
    },

    removeCartProduct: function(productCode) {
        let orderProduct = SessionFakeOrder.getOrderProductByProductCode_SF(productCode);
        let product = ProductDB.getProductByCode(productCode);
        SessionFakeOrder.removeProduct_SF(productCode);
        ProductMenu.showCartProduct(product.category);
    },

    plusCartProduct: function(productCode) {
        let orderProduct = SessionFakeOrder.getOrderProductByProductCode_SF(productCode);
        let product = ProductDB.getProductByCode(productCode);
        SessionFakeOrder.setProduct_SF(productCode, parseInt(orderProduct.productQtd) + 1);
        ProductMenu.showCartProduct(product.category);
    },

    subCartProduct: function(productCode) {
        let orderProduct = SessionFakeOrder.getOrderProductByProductCode_SF(productCode);
        let product = ProductDB.getProductByCode(productCode);
        if (parseInt(orderProduct.productQtd) - 1 > 0) {
            SessionFakeOrder.setProduct_SF(productCode, parseInt(orderProduct.productQtd) - 1);
            ProductMenu.showCartProduct(product.category);
        }
    },
};