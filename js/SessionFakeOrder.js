let DB_ORDER_PRODUCT_SF = "dbOrderProduct_SF";
let orderProducts_SF = [
    { code: 0, productCode: 0, price: 0.00, productQtd: 0 }
    // { code: 1, productCode: 7, price: 20.00, productQtd: 1 },
    // { code: 2, productCode: 39, price: 20.00, productQtd: 1 }
    // ,
    // { code: 3, productCode: 17, price: 15.00, productQtd: 1 },
    // { code: 4, productCode: 26, price: 15.00, productQtd: 1 },
    // { code: 5, productCode: 28, price: 15.00, productQtd: 1 }
]

let SessionFakeOrder = {

    initOrderProduct_SF: function() {
        Debug.print("initOrderProduct_SF()");
        let json = window.localStorage.getItem(DB_ORDER_PRODUCT_SF);
        Debug.print(json);
        if (json == null)
            SessionFakeOrder.saveOrderProduct_SF();
        else
            SessionFakeOrder.retrieveOrderProduct_SF();
    },

    saveOrderProduct_SF: function() {
        Debug.print("saveOrderProduct_SF()");
        if (orderProducts_SF.length > 1 && orderProducts_SF[0].code == 0) {
            orderProducts_SF.splice(0, 1);
        }
        let json = JSON.stringify(orderProducts_SF);
        window.localStorage.setItem(DB_ORDER_PRODUCT_SF, json);
    },

    retrieveOrderProduct_SF: function() {
        Debug.print("retrieveOrderProduct_SF()");
        let json = window.localStorage.getItem(DB_ORDER_PRODUCT_SF);
        orderProducts_SF = JSON.parse(json);
    },

    getIndexOrderProductByProductCode_SF: function(productCode) {
        if (orderProducts_SF == null)
            return -1;
        else
            return orderProducts_SF.findIndex(orderProduct_SF => orderProduct_SF.productCode == productCode);
    },

    getOrderProductByProductCode_SF: function(productCode) {
        let index = SessionFakeOrder.getIndexOrderProductByProductCode_SF(productCode);
        if (index >= 0) {
            return orderProducts_SF[index];
        }
    },

    addProduct_SF: function(productCode, productQtd) {
        Debug.print("addProduct_SF()");
        let product = ProductDB.getProductByCode(productCode);
        let orderProduct_SF = { code: 0, productCode: 0, price: 0.00, productQtd: 0 };
        orderProduct_SF.code = SessionFakeOrder.getNextCodeOrderProduct_SF().toString();
        orderProduct_SF.productCode = productCode;
        orderProduct_SF.price = product.price;
        orderProduct_SF.productQtd = productQtd;
        orderProducts_SF.push(orderProduct_SF);
        SessionFakeOrder.saveOrderProduct_SF();
        SessionFakeOrder.retrieveOrderProduct_SF();
    },

    updateProduct_SF: function(index, productQtd) {
        Debug.print("updateProduct_SF()");
        orderProducts_SF[index].productQtd = productQtd;
        SessionFakeOrder.saveOrderProduct_SF();
        SessionFakeOrder.retrieveOrderProduct_SF();
    },

    setProduct_SF: function(productCode, productQtd) {
        Debug.print("setProduct_SF()");
        let index = SessionFakeOrder.getIndexOrderProductByProductCode_SF(productCode);
        if (index >= 0) {
            SessionFakeOrder.updateProduct_SF(index, productQtd);
        } else {
            SessionFakeOrder.addProduct_SF(productCode, productQtd);
        }
    },

    removeProduct_SF: function(productCode) {
        Debug.print("removeProduct_SF()");
        let index = SessionFakeOrder.getIndexOrderProductByProductCode_SF(productCode);
        if (index >= 0) {
            orderProducts_SF.splice(index, 1);
            SessionFakeOrder.saveOrderProduct_SF();
            SessionFakeOrder.retrieveOrderProduct_SF();
        }
    },

    getNextCodeOrderProduct_SF: function() {
        let code = 0;
        if (orderProducts_SF == null)
            code = 1;
        else {
            for (let i = 0; i < orderProducts_SF.length; i++) {
                if (orderProducts_SF[i].code >= code)
                    code = parseInt(orderProducts_SF[i].code) + 1;
            }
        }
        return code;
    },

    getOrderProductList_SF: function() {
        SessionFakeOrder.retrieveOrderProduct_SF();
        return orderProducts_SF;
    },

    ///////////////////////////////////////////////////////////////////////////

    cleanOrderProduct_SF: function() {
        Debug.print("countProductgetProductListByClientCode_SF()");
        let newOrderProducts_SF = [
            { code: 0, productCode: 0, price: 0.00, productQtd: 0 },
        ];
        orderProducts_SF = newOrderProducts_SF;
        SessionFakeOrder.saveOrderProduct_SF();
        SessionFakeOrder.retrieveOrderProduct_SF();
    },

    countProductOrderProduct_SF: function() {
        Debug.print("countProductProductList_SF()");
        let count = 0;
        let orderProducts_SF = SessionFakeOrder.getOrderProductList_SF();
        for (let i = 0; i < orderProducts_SF.length; i++) {
            let orderProduct_SF = orderProducts_SF[i];
            count += parseInt(orderProduct_SF.productQtd);
        }
        return count;
    },

    getTotalProductOrderProduct_SF: function() {
        Debug.print("countProductgetProductListByClientCode_SF()");
        let count = 0;
        let orderProducts_SF = SessionFakeOrder.getOrderProductList_SF();
        for (let i = 0; i < orderProducts_SF.length; i++) {
            let orderProduct_SF = orderProducts_SF[i];
            count += parseInt(orderProduct_SF.price) * parseInt(orderProduct_SF.productQtd);
        }
        return count;
    },

};

SessionFakeOrder.initOrderProduct_SF();