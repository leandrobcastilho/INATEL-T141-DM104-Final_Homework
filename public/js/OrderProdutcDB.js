let DB_ORDER_PRODUCT = "dbOrderProduct";

let orderProducts = [
    { code: 1, orderCode: 1, productCode: 7, price: 20.00, productQtd: 1 },
    { code: 2, orderCode: 1, productCode: 39, price: 20.00, productQtd: 1 },
    { code: 3, orderCode: 2, productCode: 11, price: 10.00, productQtd: 2 },
    { code: 4, orderCode: 3, productCode: 42, price: 20.00, productQtd: 1 },
    { code: 5, orderCode: 4, productCode: 45, price: 20.00, productQtd: 1 },
    { code: 6, orderCode: 5, productCode: 17, price: 15.00, productQtd: 1 },
    { code: 7, orderCode: 5, productCode: 26, price: 15.00, productQtd: 1 },
    { code: 8, orderCode: 5, productCode: 28, price: 15.00, productQtd: 1 },
    { code: 9, orderCode: 6, productCode: 3, price: 30.00, productQtd: 1 },
    { code: 10, orderCode: 7, productCode: 6, price: 25.00, productQtd: 1 }
]

let OrderProductDB = {

    initOrderProduct: function() {
        Debug.print("initOrderProduct()");
        let json = window.localStorage.getItem(DB_ORDER_PRODUCT);
        Debug.print(json);
        if (json == null)
            OrderProductDB.saveOrderProduct();
        else
            OrderProductDB.retrieveOrderProduct();

    },

    saveOrderProduct: function() {
        Debug.print("saveOrderProduct()");
        let json = JSON.stringify(orderProducts);
        window.localStorage.setItem(DB_ORDER_PRODUCT, json);
    },

    retrieveOrderProduct: function() {
        Debug.print("retrieveOrderProduct()");
        let json = window.localStorage.getItem(DB_ORDER_PRODUCT);
        orderProducts = JSON.parse(json);
    },

    getIndexOrderProductByCode: function(orderProductCode) {
        if (orderProducts == null)
            return -1;
        else
            return orderProducts.findIndex(orderProduct => orderProduct.code == orderProductCode);
    },

    getOrderProductByCode: function(orderProductCode) {
        let index = OrderProductDB.getIndexOrderProductByCode(orderProductCode);
        if (index >= 0) {
            return orderProducts[index];
        }
    },

    addOrderProduct: function(orderCode, productCode, price, productQtd) {
        Debug.print("addOrderProduct()");
        let orderProduct = { code: 0, orderCode: 0, productCode: 0, price: 0.00, productQtd: 0 }
        orderProduct.code = OrderProductDB.getNextCodeOrderProduct().toString();
        orderProduct.orderCode = orderCode;
        orderProduct.productCode = productCode;
        orderProduct.price = price;
        orderProduct.productQtd = productQtd;
        orderProducts.push(orderProduct);
        OrderProductDB.saveOrderProduct();
        OrderProductDB.retrieveOrderProduct();
    },

    getNextCodeOrderProduct: function() {
        let code = 0;
        if (orderProducts == null)
            code = 1;
        else
            for (let i = 0; i < orderProducts.length; i++) {
                if (orderProducts[i].code >= code)
                    code = parseInt(orderProducts[i].code) + 1;
            }
        return code;
    },

    getOrderProductList: function() {
        OrderProductDB.retrieveOrderProduct();
        return orderProducts;
    },

    getProductListByOrder: function(orderCode) {
        let orderProducts = [];
        let allOrderProducts = OrderProductDB.getOrderProductList();
        for (let i = 0; i < allOrderProducts.length; i++) {
            let orderProduct = allOrderProducts[i];
            if (orderProduct.orderCode == orderCode)
                orderProducts.push(orderProduct);
        }
        return orderProducts;
    },

    deleteOrderProduct: function(code) {
        Debug.print("deleteOrderProduct()");
        let index = OrderProductDB.getIndexOrderProductByCode(code);
        if (index >= 0) {
            orderProducts.splice(index, 1);
            OrderProductDB.saveOrderProduct();
            OrderProductDB.retrieveOrderProduct();
        }
    },

    editOrderProduct: function(code, orderCode, productCode, price, productQtd) {
        Debug.print("editOrderProduct()");
        let index = OrderProductDB.getIndexOrderProductByCode(code);
        if (index >= 0) {
            orderProducts[index].orderCode = orderCode;
            orderProducts[index].productCode = productCode;
            orderProducts[index].price = price;
            orderProducts[index].productQtd = productQtd;
            OrderProductDB.saveOrderProduct();
            OrderProductDB.retrieveOrderProduct();
        }
    },

};

OrderProductDB.initOrderProduct();