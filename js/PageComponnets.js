let PageComponnets = {
    ///////////////////////////////////////////////////////////////////////
    cleanNavBarUl: function() {
        Debug.print("cleanNavBarUl()");
        let mainNavBarUl = document.getElementById("mainNavBarUl");
        if (mainNavBarUl != null) {
            let count = mainNavBarUl.childElementCount - 1;
            for (let index = count; index >= 0; index--) {
                mainNavBarUl.removeChild(mainNavBarUl.children[index]);
            }
        }
    },
    /////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    cleanLateralMenu: function() {
        Debug.print("cleanLateralMenu()");
        let lateralMenu = document.getElementById("lateralMenu");
        if (lateralMenu != null) {
            let count = lateralMenu.childElementCount - 1;
            for (let index = count; index >= 0; index--) {
                lateralMenu.removeChild(lateralMenu.children[index]);
            }
        }
    },
    /////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    cleanPageContent: function() {
        Debug.print("cleanPageContent()");
        let pageContent = document.getElementById("pageContent");
        if (pageContent != null) {
            let count = pageContent.childElementCount - 1;
            for (let index = count; index >= 0; index--) {
                pageContent.removeChild(pageContent.children[index]);
            }
        }
    },

    cleanContentRow: function() {
        Debug.print("cleanContentRow()");
        let pageContent = document.getElementById("contentRow");
        if (pageContent != null) {
            let count = pageContent.childElementCount - 1;
            for (let index = count; index >= 0; index--) {
                pageContent.removeChild(pageContent.children[index]);
            }
        }
    },

    createContentRow: function() {
        let pageContent = document.getElementById("pageContent");
        let div = document.createElement("div");
        div.id = "contentRow";
        div.class = "row";
        pageContent.appendChild(div);
    },

    ////////////////////////////////////////////////////////////////////////////

    createTable: function() {

        let pageContent = document.getElementById("pageContent");

        let table = document.createElement("table");
        table.id = "tableReport";
        table.className = "table table-bordered table-striped";

        let caption = document.createElement("caption");
        caption.id = "tableReportCaption";
        caption.innerText = "Report Table";

        let thead = document.createElement("thead");
        thead.id = "tableReportThead";

        let tr = document.createElement("tr");
        let thCode = document.createElement("th");
        let thLogin = document.createElement("th");
        let thActions = document.createElement("th");

        thCode.innerHTML = 'Code';
        thLogin.innerHTML = 'Login';
        thActions.innerHTML = 'Actions';

        let tbody = document.createElement("tbody");
        tbody.id = "tableReportTbody";

        table.appendChild(caption);
        tr.appendChild(thCode);
        tr.appendChild(thLogin);
        tr.appendChild(thActions);
        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        pageContent.appendChild(table);
    },

    /////////////////////////////////////////////////////////////////////////

    cleanTableBody: function() {
        Debug.print("cleanTableBody");
        let tbody = document.getElementById("tableReportTbody");
        if (tbody != null) {
            let count = tbody.childElementCount - 1;
            for (let index = count; index >= 0; index--) {
                tbody.removeChild(tbody.children[index]);
            }
        }
    },

    cleanTableHead: function() {
        Debug.print("cleanTableHead");
        let tthead = document.getElementById("tableReportThead");
        if (tthead != null) {
            let count = tthead.childElementCount - 1;
            for (let index = count; index >= 0; index--) {
                tthead.removeChild(tthead.children[index]);
            }
        }
    },

    editTableCaption: function(title) {
        Debug.print("editTableCaption");
        const tcaption = document.getElementById("tableReportCaption");
        if (tcaption != null) {
            tcaption.innerText = title;
        }
    },


    ////////////////////////////////////////////////////////////////////////////

    createLiContact: function() {
        Debug.print("createLiContact()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("data-target", "#contactPopUpWindow");
        a.id = "contact";
        a.innerHTML = "Contact";
        li.appendChild(a);
        return li;
    },

    createLiClientRegister: function() {
        Debug.print("createLiClientRegister()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("data-target", "#clientRegiterPopUpWindow");
        a.id = "clientRegiter";
        a.innerHTML = "Client Register";
        li.appendChild(a);
        return li;
    },

    createLiClientLogin: function() {
        Debug.print("createLiClientLogin()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.id = "clientLoginLogoff";
        a.innerText = "Client Login";
        a.onclick = function() {
            ClientPage.actionClientLoginLogoff(a);
        };
        li.appendChild(a);
        return li;
    },

    createLiClientLogoff: function(clientName) {
        Debug.print("createLiClientLogoff()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.id = "clientLoginLogoff";
        a.innerText = clientName + "-(Client Logoff)";
        a.onclick = function() {
            ClientPage.actionClientLoginLogoff(a);
        };
        li.appendChild(a);
        return li;
    },

    createLiOrders: function() {
        Debug.print("createLiOrders()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.id = "orderClient";
        a.innerHTML = "Orders";
        a.onclick = function() {
            ProductMenu.showCartProduct("", a);
        };
        li.appendChild(a);
        return li;
    },

    createLiAdminLogin: function() {
        Debug.print("createLiAdminLogin()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.id = "adminLoginLogoff";
        a.innerText = "Admin Login";
        a.onclick = function() {
            AdminPage.actionAdminLoginLogoff(a);
        };
        li.appendChild(a);
        return li;
    },

    createLiAdminLogoff: function(adminName) {
        Debug.print("createLiAdminLogoff()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.id = "adminLoginLogoff";
        a.innerText = adminName + "-(Admin Logoff)";
        a.onclick = function() {
            AdminPage.actionAdminLoginLogoff(a);
        };
        li.appendChild(a);
        return li;
    },

    createLiHome: function() {
        Debug.print("createLiHome()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.id = "returnHome";
        a.innerHTML = "Home";
        a.onclick = function() {
            ClientPage.loadMainPage();
        }
        li.appendChild(a);
        return li;
    },

    createLiAdminRegister: function() {
        Debug.print("createLiAdminRegiter()");
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("data-target", "#adminRegiterPopUpWindow");
        a.id = "adminRegiter";
        a.innerHTML = "Regiter Admin";
        li.appendChild(a);
        return li;
    },

    navbarClientLogin: function() {
        Debug.print("navbarClientLogin()");
        PageComponnets.cleanNavBarUl();
        let mainNavBarUl = document.getElementById("mainNavBarUl");
        // mainNavBarUl.appendChild(PageComponnets.createLiHome());
        // mainNavBarUl.appendChild(PageComponnets.createLiContact());
        mainNavBarUl.appendChild(PageComponnets.createLiClientRegister());
        mainNavBarUl.appendChild(PageComponnets.createLiClientLogin());
        mainNavBarUl.appendChild(PageComponnets.createLiAdminLogin());
    },

    navbarClientLogoff: function(clientName) {
        Debug.print("navbarClientLogoff()");
        PageComponnets.cleanNavBarUl();
        let mainNavBarUl = document.getElementById("mainNavBarUl");
        // mainNavBarUl.appendChild(PageComponnets.createLiHome());
        // mainNavBarUl.appendChild(PageComponnets.createLiContact());
        mainNavBarUl.appendChild(PageComponnets.createLiClientLogoff(clientName));
        mainNavBarUl.appendChild(PageComponnets.createLiOrders());
    },

    navbarAdminLogoff: function(adminName) {
        Debug.print("navbarAdminLogoff()");
        PageComponnets.cleanNavBarUl();
        let mainNavBarUl = document.getElementById("mainNavBarUl");
        // mainNavBarUl.appendChild(PageComponnets.createLiHome());
        // mainNavBarUl.appendChild(PageComponnets.createLiContact());
        mainNavBarUl.appendChild(PageComponnets.createLiAdminRegister());
        mainNavBarUl.appendChild(PageComponnets.createLiAdminLogoff(adminName));
    },

};