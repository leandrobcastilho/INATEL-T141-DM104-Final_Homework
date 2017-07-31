let ReportOrder = {

    loadOrderTable: function() {
        Debug.print("loadOrderTable()");
        PageComponnets.cleanPageContent();
        PageComponnets.createTable();
        PageComponnets.cleanTableHead();
        PageComponnets.cleanTableBody();
        PageComponnets.editTableCaption("Sales");
        ReportOrder.addOrderTableHeader();
        let orders = OrderDB.getOrderList();
        for (let index = 0; index < orders.length; index++) {
            let order = orders[index];
            let code = order.code;
            let formateDate = new Date(order.date);
            let client = ClientDB.getClientByCode(order.clientCode);
            let clientName = client.name;
            let totalOrder = order.total;
            ReportOrder.addOrderTable(code, formateDate, clientName, totalOrder);
        }

    },

    addOrderTable: function(orderCode, formateDate, clientName, totalOrder) {
        let tbody = document.getElementById("tableReportTbody");
        let tr = document.createElement("tr");
        let tdOrderCode = document.createElement("td");
        let tdFormateDate = document.createElement("td");
        let tdClientName = document.createElement("td");
        let tdTotalOrder = document.createElement("td");

        tdOrderCode.innerHTML = orderCode;
        tdFormateDate.innerHTML = formateDate;
        tdClientName.innerHTML = clientName;
        tdTotalOrder.innerHTML = totalOrder;

        tr.appendChild(tdOrderCode);
        tr.appendChild(tdFormateDate);
        tr.appendChild(tdClientName);
        tr.appendChild(tdTotalOrder);
        tbody.appendChild(tr);
    },

    addOrderTableHeader: function() {
        let tthead = document.getElementById("tableReportThead");

        let tr = document.createElement("tr");
        let thOrderCode = document.createElement("th");
        let thFormateDate = document.createElement("th");
        let thClientName = document.createElement("th");
        let thTotalOrder = document.createElement("th");

        thOrderCode.innerHTML = 'Order';
        thFormateDate.innerHTML = 'Date';
        thClientName.innerHTML = 'Client';
        thTotalOrder.innerHTML = 'Total';

        tr.appendChild(thOrderCode);
        tr.appendChild(thFormateDate);
        tr.appendChild(thClientName);
        tr.appendChild(thTotalOrder);
        tthead.appendChild(tr);
    },

};