let ReportClient = {

    loadClientTable: function() {
        Debug.print("loadClientTable()");
        PageComponnets.cleanPageContent();
        PageComponnets.createTable();
        PageComponnets.cleanTableHead();
        PageComponnets.cleanTableBody();
        PageComponnets.editTableCaption("Clients");
        ReportClient.addClientTableHeader();
        let clientList = ClientDB.getClientList();
        for (let index = 0; index < clientList.length; index++) {
            ReportClient.addClientTable(clientList[index].name, clientList[index].email);
        }

    },

    addClientTable: function(name, email) {
        let tbody = document.getElementById("tableReportTbody");
        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdEmail = document.createElement("td");
        let tdBtns = document.createElement("td");
        let btnDelete = document.createElement("span");

        tdName.innerHTML = name;
        tdEmail.innerHTML = email;

        btnDelete.innerText = "Delete";
        btnDelete.className = "btn btn-danger";
        btnDelete.setAttribute("data-clientEmail", email);
        btnDelete.onclick = function() {
            let clientEmail = btnDelete.getAttribute('data-clientEmail');
            ClientDB.deleteClient(clientEmail, btnDelete);
            ReportClient.loadClientTable();
        };

        tdBtns.appendChild(btnDelete);

        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdBtns);
        tbody.appendChild(tr);
    },

    addClientTableHeader: function() {
        let tthead = document.getElementById("tableReportThead");

        let tr = document.createElement("tr");
        let thName = document.createElement("th");
        let thEmail = document.createElement("th");
        let thActions = document.createElement("th");

        thName.innerHTML = 'Name';
        thEmail.innerHTML = 'Email';
        thActions.innerHTML = 'Actions';

        tr.appendChild(thName);
        tr.appendChild(thEmail);
        tr.appendChild(thActions);
        tthead.appendChild(tr);
    },

};