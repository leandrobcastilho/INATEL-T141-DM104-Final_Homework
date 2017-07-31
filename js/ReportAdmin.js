let ReportAdmin = {

    loadAdminTable: function() {
        Debug.print("loadAdminTable()");
        PageComponnets.cleanPageContent();
        PageComponnets.createTable();
        PageComponnets.cleanTableHead();
        PageComponnets.cleanTableBody();
        PageComponnets.editTableCaption("Admins");
        ReportAdmin.addAdminTableHeader();
        let adminList = AdminDB.getAdminList();
        for (let index = 0; index < adminList.length; index++) {
            ReportAdmin.addAdminTable(adminList[index].code, adminList[index].login);
        }

    },

    addAdminTable: function(code, login) {
        let tbody = document.getElementById("tableReportTbody");
        let tr = document.createElement("tr");
        let tdCode = document.createElement("td");
        let tdLogin = document.createElement("td");
        let tdBtns = document.createElement("td");
        let btnDelete = document.createElement("span");
        let btnEdit = document.createElement("span");

        tdCode.innerHTML = code;
        tdLogin.innerHTML = login;

        btnEdit.innerText = "Edit";
        btnEdit.className = "btn btn-success";
        btnEdit.setAttribute("data-adminLogin", login);
        btnEdit.onclick = function() {
            let adminLogin = btnEdit.getAttribute('data-adminLogin');
            ReportAdmin.editAdminModal(adminLogin, btnEdit);
        };
        btnDelete.innerText = "Delete";
        btnDelete.className = "btn btn-danger";
        btnDelete.setAttribute("data-adminLogin", login);
        if (login == "admin")
            btnDelete.setAttribute("disabled", "disabled");
        btnDelete.onclick = function() {
            let adminLogin = btnDelete.getAttribute('data-adminLogin');
            AdminDB.deleteAdmin(adminLogin, btnDelete);
            ReportAdmin.loadAdminTable();
        };

        tdBtns.appendChild(btnEdit);
        tdBtns.appendChild(btnDelete);

        tr.appendChild(tdCode);
        tr.appendChild(tdLogin);
        tr.appendChild(tdBtns);
        tbody.appendChild(tr);
    },

    editAdminModal: function(login) {
        let admin = AdminDB.getAdminByLogin(login);
        if (admin != null) {
            editAdminLogin.textContent = admin.login;
            editAdminPassword.value = "";
            $('#adminEditPopUpWindow').modal('show');
        }

    },

    addAdminTableHeader: function() {
        Debug.print("addAdminTableHeader");
        let tthead = document.getElementById("tableReportThead");

        let tr = document.createElement("tr");
        let thCode = document.createElement("th");
        let thLogin = document.createElement("th");
        let thActions = document.createElement("th");

        thCode.innerHTML = 'Code';
        thLogin.innerHTML = 'Login';
        thActions.innerHTML = 'Actions';

        tr.appendChild(thCode);
        tr.appendChild(thLogin);
        tr.appendChild(thActions);
        tthead.appendChild(tr);
    },
    ////////////////////////////////////////////////////////////////////////////////////////
};

document.getElementById("btnAdminEdit").onclick = function() {
    Debug.print("click btnAdminEdit");
    let editAdminLogin = document.getElementById("editAdminLogin");
    Debug.print("editAdminLogin ", editAdminLogin.textContent);
    let editAdminPassword = document.getElementById("editAdminPassword");
    Debug.print("editAdminPassword ", editAdminPassword.value);
    if (editAdminPassword.value != "") {
        let index = AdminDB.getIndexAdminByLogin(editAdminLogin.textContent);
        if (index >= 0) {
            AdminDB.editAdmin(editAdminLogin.textContent, editAdminPassword.value);
            editAdminLogin.value = "";
            editAdminPassword.value = "";
            $('#adminEditPopUpWindow').modal('hide');
            ReportAdmin.loadAdminTable();
        } else {
            Debug.print("alert");
            alert("Admin already exists");
            $('#adminEditPopUpWindow').modal('hide');
        }
    } else {
        Debug.print("alert");
        alert("Admin is empty");
        $('#adminEditPopUpWindow').modal('hide');
    }
};