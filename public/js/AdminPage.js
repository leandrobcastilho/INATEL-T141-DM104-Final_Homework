let AdminPage = {

    actionAdminLoginLogoff: function() {
        Debug.print("actionAdminLoginLogoff()");
        let adminLoginLogoff = document.getElementById("adminLoginLogoff");
        if (adminLoginLogoff.text == "Admin Login")
            $('#adminLoginPopUpWindow').modal('show');
        else
            AdminPage.adminLogoff();
    },

    adminLogin: function() {
        Debug.print("adminLogin()");
        let adminLogin = document.getElementById("adminLogin");
        let adminPassword = document.getElementById("adminPassword");
        if (AdminDB.checkAdmin(adminLogin.value, adminPassword.value)) {
            Debug.print("checkAdmin");
            let admin = AdminDB.getAdminByLogin(adminLogin.value);
            SessionFakeAdmin.loginAdmin_SF(adminLogin.value, adminPassword.value);
            adminLogin.value = "";
            adminPassword.value = "";
            $('#adminLoginPopUpWindow').modal('hide');
            AdminPage.loadAdminPage(admin.login);
        } else {
            Debug.print("alert");
            alert("Nome or Password invalid");
        }
    },

    adminLogoff: function() {
        Debug.print("adminLogoff()");
        ClientPage.loadMainPage();
    },
    /////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    addLateralMenuAdmin: function() {
        PageComponnets.cleanLateralMenu();
        AdminPage.createLateralMenuAdmin();
    },
    /////////////////////////////////////////////////////////////////////////
    createLateralMenuAdmin: function() {
        Debug.print("createLateralMenuAdmin()");
        let lateralMenu = document.getElementById("lateralMenu");
        lateralMenu.appendChild(AdminPage.createliMenuAdmins());
        lateralMenu.appendChild(AdminPage.createliMenuClients());
        lateralMenu.appendChild(AdminPage.createliMenuProducts());
        lateralMenu.appendChild(AdminPage.createliMenuSales());
        lateralMenu.appendChild(AdminPage.createliMenuDashboard());
    },
    /////////////////////////////////////////////////////////////////////////
    createliMenuAdmins: function() {
        Debug.print("createliMenuAdmins()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = "Admins";
        a.onclick = function() {
            ReportAdmin.loadAdminTable(a);
        }
        li.appendChild(a);
        return li;
    },

    createliMenuClients: function() {
        Debug.print("createliMenuClients()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = "Clients";
        a.onclick = function() {
            ReportClient.loadClientTable(a);
        }
        li.appendChild(a);
        return li;
    },

    createliMenuProducts: function() {
        Debug.print("createliMenuProducts()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = "Products";
        a.onclick = function() {
            ReportProduct.loadProductTable(a);
        }
        li.appendChild(a);
        return li;
    },

    createliMenuSales: function() {
        Debug.print("createliMenuSales()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = "Sales";
        a.onclick = function() {
            ReportOrder.loadOrderTable(a);
        }
        li.appendChild(a);
        return li;
    },


    createliMenuDashboard: function() {
        Debug.print("createliMenu Dashboard()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = "Dashboard";
        a.onclick = function() {
            AdminPage.loadDashboard(a);
        }
        li.appendChild(a);
        return li;
    },
    /////////////////////////////////////////////////////////////////////////

    loadDashboard: function() {
        google.charts.load('current', {
            packages: ['corechart', 'bar']
        });
        google.charts.setOnLoadCallback(AdminPage.drawSales);
        AdminPage.createChart();
    },

    createChart: function() {
        Debug.print("loadOrderTable()");
        PageComponnets.cleanPageContent();
        PageComponnets.createContentRow();

        // let pageContent = document.getElementById("pageContent");
        let contentRow = document.getElementById("contentRow");

        let divPagChart = document.createElement("div");
        divPagChart.id = "Chart";
        divPagChart.className = "col-md-10";

        let divChart = document.createElement("div");
        divChart.id = "chart_div";

        divPagChart.appendChild(divChart);

        contentRow.appendChild(divPagChart);
        // pageContent.appendChild(divChart);
    },

    drawSales: function() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Day');
        data.addColumn('number', 'Sales Value (R$)');


        let orders = OrderDB.getOrderList();
        let rows = [];
        for (let index = 0; index < orders.length; index++) {
            let order = orders[index];
            let date = new Date(order.date).toDateString();
            let row = [date, order.total];
            // Debug.print(row);
            rows.push(row);
        }
        // Debug.print(rows);
        data.addRows(rows);
        // data.addRows([
        //     [{ v: [8, 0, 0], f: '8 am' }, 1],
        //     [{ v: [9, 0, 0], f: '9 am' }, 2],
        //     [{ v: [10, 0, 0], f: '10 am' }, 3],
        //     [{ v: [11, 0, 0], f: '11 am' }, 4],
        //     [{ v: [12, 0, 0], f: '12 pm' }, 5],
        //     [{ v: [13, 0, 0], f: '1 pm' }, 6],
        //     [{ v: [14, 0, 0], f: '2 pm' }, 7],
        //     [{ v: [15, 0, 0], f: '3 pm' }, 8],
        //     [{ v: [16, 0, 0], f: '4 pm' }, 9],
        //     [{ v: [17, 0, 0], f: '5 pm' }, 10],
        // ]);

        // let options = {
        //     title: 'Sales Value (R$) per Day',
        //     hAxis: {
        //         title: 'Day',
        //         format: 'h:mm a',
        //         viewWindow: {
        //             min: [1, 30, 0],
        //             max: [17, 30, 0]
        //         }
        //     },
        //     vAxis: {
        //         title: 'Rating (scale of 1-10)'
        //     }
        // };

        let chart = new google.visualization.ColumnChart(
            document.getElementById('chart_div'));
        chart.draw(data);
        // chart.draw(data, options);
    },

    /////////////////////////////////////////////////////////////////////////
    loadAdminPage: function(adminLogin) {
        PageComponnets.navbarAdminLogoff(adminLogin);
        AdminPage.addLateralMenuAdmin();
        ReportAdmin.loadAdminTable();
    },
};

///////////////////////////////////////////////////////////////////////////
document.getElementById("btnAdminRegister").onclick = function() {
    Debug.print("click btnAdminRegister");
    let registerAdminLogin = document.getElementById("registerAdminLogin");
    Debug.print("registerAdminLogin ", registerAdminLogin.value);
    let registerAdminPassword = document.getElementById("registerAdminPassword");
    Debug.print("registerAdminPassword ", registerAdminPassword.value);
    if (registerAdminLogin.value != "" && registerAdminPassword.value != "") {
        let index = AdminDB.getIndexAdminByLogin(registerAdminLogin.value);
        if (index < 0) {
            AdminDB.addAdmin(registerAdminLogin.value, registerAdminPassword.value);
            registerAdminLogin.value = "";
            registerAdminPassword.value = "";
            $('#adminRegiterPopUpWindow').modal('hide');
            ReportAdmin.loadAdminTable();
        } else {
            Debug.print("alert");
            alert("Admin already exists");
        }
    } else {
        Debug.print("alert");
        alert("Admin is empty");
    }
};
////////////////////////////////////////////////////////////////////////
document.getElementById("btnAdminLogin").onclick = function() {
    Debug.print("click btnAdminLogin");
    AdminPage.adminLogin();
};
/////////////////////////////////////////////////////////////////////////