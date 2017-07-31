let DB_ORDER = "dbOrder";

let orders = [
    { code: 1, date: 1500329414000, clientCode: 1, total: 40 },
    { code: 2, date: 1500421214000, clientCode: 2, total: 20 },
    { code: 3, date: 1500421530000, clientCode: 1, total: 20 },
    { code: 4, date: 1500423935000, clientCode: 1, total: 20 },
    { code: 5, date: 1500424205000, clientCode: 2, total: 45 },
    { code: 6, date: 1500494735000, clientCode: 2, total: 30 },
    { code: 7, date: 1500583845000, clientCode: 2, total: 25 }
]

let OrderDB = {

    initOrder: function() {
        Debug.print("initOrder()");
        let json = window.localStorage.getItem(DB_ORDER);
        Debug.print(json);
        if (json == null)
            OrderDB.saveOrder();
        else
            OrderDB.retrieveOrder();

    },

    saveOrder: function() {
        Debug.print("saveOrder()");
        let json = JSON.stringify(orders);
        window.localStorage.setItem(DB_ORDER, json);
    },

    retrieveOrder: function() {
        Debug.print("retrieveOrder()");
        let json = window.localStorage.getItem(DB_ORDER);
        orders = JSON.parse(json);
    },

    getIndexOrderByCode: function(orderCode) {
        if (orders == null)
            return -1;
        else
            return orders.findIndex(order => order.code == orderCode);
    },

    getOrderByCode: function(orderCode) {
        let index = OrderDB.getIndexOrderByCode(orderCode);
        if (index >= 0) {
            return orders[index];
        }
    },

    getNextCodeOrder: function() {
        let code = 0;
        if (orders == null)
            code = 1;
        else
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].code >= code)
                    code = parseInt(orders[i].code) + 1;
            }
        return code;
    },

    getOrderList: function() {
        OrderDB.retrieveOrder();
        return orders;
    },

    getOrderListByClientCode: function(clientCode) {
        let orders = [];
        let allOrders = OrderDB.getOrderList();
        for (let i = 0; i < allOrders.length; i++) {
            let order = allOrders[i];
            if (order.clientCode == clientCode)
                orders.push(order);
        }
        return orders;
    },

    addOrder: function(date, clientCode, total) {
        Debug.print("addClient()");
        let order = { code: 0, date: 0, clientCode: 0, total: 0 };
        order.code = OrderDB.getNextCodeOrder().toString();
        order.date = date;
        order.clientCode = clientCode;
        order.total = total;
        orders.push(order);
        OrderDB.saveOrder();
        OrderDB.retrieveOrder();
        return order.code;
    },

    deleteOrder: function(code) {
        Debug.print("deleteOrder()");
        let index = OrderDB.getIndexOrderByCode(code);
        if (index >= 0) {
            let orderProducts = OrderProductDB.getProductListByOrder(orders[index].code);
            for (let indexProduct = 0; indexProduct < orderProducts.length; indexProduct++) {
                OrderProductDB.deleteOrderProduct(orderProducts[indexProduct].code);
            }
            orders.splice(index, 1);
            OrderDB.saveOrder();
            OrderDB.retrieveOrder();
        }
    },

};

OrderDB.initOrder();