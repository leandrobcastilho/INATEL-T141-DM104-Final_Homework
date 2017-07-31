let ClientPage = {

    actionClientLoginLogoff: function() {
        Debug.print("actionClientLoginLogoff()");
        let clientLoginLogoff = document.getElementById("clientLoginLogoff");
        if (clientLoginLogoff.text == "Client Login")
            $('#clientLoginPopUpWindow').modal('show');
        else
            ClientPage.clientLogoff();
    },

    clientLogin: function() {
        Debug.print("clientLogin()");
        let clientEmail = document.getElementById("clientEmail");
        let clientPassword = document.getElementById("clientPassword");
        if (ClientDB.checkClient(clientEmail.value, clientPassword.value)) {
            Debug.print("checkClient");
            let client = ClientDB.getClientByEmail(clientEmail.value);
            SessionFakeClient.loginClient_SF(clientEmail.value, clientPassword.value);
            clientEmail.value = "";
            clientPassword.value = "";
            SessionFakeAdmin.logoffAdmin_SF();
            $('#clientLoginPopUpWindow').modal('hide');
            PageComponnets.navbarClientLogoff(client.name);
            ClientPage.refreshCountOrderClient();
        } else {
            Debug.print("alert");
            alert("Email or Password invalid");
        }
    },

    clientLogoff: function() {
        Debug.print("clientLogoff()");
        SessionFakeClient.logoffClient_SF();
        PageComponnets.cleanPageContent();
        PageComponnets.createContentRow();
        ClientPage.addLateralMenuMain();
        ClientPage.loadClient();
        ProductMenu.loadProducts("");
    },

    loadClient: function() {
        Debug.print("loadClient()");
        let clientLogin = SessionFakeClient.getClient_SF();
        if (ClientDB.checkClient(clientLogin.email, clientLogin.password)) {
            let client = ClientDB.getClientByEmail(clientLogin.email);
            PageComponnets.navbarClientLogoff(client.name);
            ClientPage.refreshCountOrderClient();
        } else {
            PageComponnets.navbarClientLogin();
        }
    },

    refreshCountOrderClient: function() {
        Debug.print("refreshCountOrderClient()");
        let count = SessionFakeOrder.countProductOrderProduct_SF();
        let orderClient = document.getElementById("orderClient");
        orderClient.innerHTML = "Orders(" + count + ")";
    },

    /////////////////////////////////////////////////////////////////////////
    addLateralMenuMain: function() {
        PageComponnets.cleanLateralMenu();
        ClientPage.createLateralMenuMain();
    },
    /////////////////////////////////////////////////////////////////////////
    createliMenuMain: function(menu, category) {
        Debug.print("createliMenuMain()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = menu;
        a.onclick = function() {
            ProductMenu.loadProducts(category, a);
        }
        li.appendChild(a);
        return li;
    },

    createLateralMenuMain: function() {
        Debug.print("createLateralMenuMain()");
        let lateralMenu = document.getElementById("lateralMenu");
        lateralMenu.appendChild(ClientPage.createliMenuMain("Products", ""));
        let categorys = ProductDB.getCategorys();
        for (let i = 0; i < categorys.length; i++) {
            let category = categorys[i];
            lateralMenu.appendChild(ClientPage.createliMenuMain(category.menu, category.category));
        }
    },
    /////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    loadMainPage: function() {
        SessionFakeAdmin.logoffAdmin_SF();
        PageComponnets.cleanPageContent();
        PageComponnets.createContentRow();
        ClientPage.addLateralMenuMain();
        ClientPage.loadClient();
        ProductMenu.loadProducts("");
    }

};

///////////////////////////////////////////////////////////////////////////
document.getElementById("btnClientRegister").onclick = function() {
    Debug.print("click btnClientRegister");
    let registerClientName = document.getElementById("registerClientName");
    Debug.print("registerClientName ", registerClientName.value);
    let registerClientEmail = document.getElementById("registerClientEmail");
    Debug.print("registerClientEmail ", registerClientEmail.value);
    let registerClientPassword = document.getElementById("registerClientPassword");
    Debug.print("registerClientPassword ", registerClientPassword.value);
    if (registerClientName.value != "" && registerClientEmail.value != "" && registerClientPassword.value != "") {
        let index = ClientDB.getIndexClientByEmail(registerClientEmail.value);
        if (index < 0) {
            ClientDB.addClient(registerClientName.value, registerClientEmail.value, registerClientPassword.value);
            Debug.print("addClient");
            registerClientName.value = "";
            registerClientEmail.value = "";
            registerClientPassword.value = "";
            $('#clientRegiterPopUpWindow').modal('hide');
        } else {
            Debug.print("alert");
            alert("Client already exists");
        }
    } else {
        Debug.print("alert");
        alert("Client is empty");
    }
};
////////////////////////////////////////////////////////////////////////
document.getElementById("btnClientLogin").onclick = function() {
    Debug.print("click btnClientLogin");
    ClientPage.clientLogin();
};
////////////////////////////////////////////////////////////////////////