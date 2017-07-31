let OrderControler = {

    createOrder: function() {

        let client_SF = SessionFakeClient.getClient_SF();
        let date = new Date().getTime();
        let client = ClientDB.getClientByEmail(client_SF.email);
        let total = SessionFakeOrder.getTotalProductOrderProduct_SF();
        let orderCode = OrderDB.addOrder(date, client.code, total);

        let orderProducts_SF = SessionFakeOrder.getOrderProductList_SF();
        for (let index = 0; index < orderProducts_SF.length; index++) {
            let orderProduct = orderProducts_SF[index];
            if (orderProduct.productCode != 0) {
                let product = ProductDB.getProductByCode(orderProduct.productCode);
                OrderProductDB.addOrderProduct(orderCode, orderProduct.productCode, product.price, orderProduct.productQtd);
            }
        }
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

};