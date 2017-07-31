let DB_CLIENT = "dbClient";

let clients = [
    // { code: "0", name: "", email: "", password: "" }
    { code: 1, name: "Leandro", email: "leandrobcastilho@hotmail.com", password: "123456" },
    { code: 2, name: "Ana Elisa", email: "casinhadeflores@gmail.com", password: "654321" }
]

let ClientDB = {

    initClient: function() {
        Debug.print("initClient()");
        let json = window.localStorage.getItem(DB_CLIENT);
        Debug.print(json);
        if (json == null)
            ClientDB.saveClient();
        else
            ClientDB.retrieveClient();

    },

    saveClient: function() {
        Debug.print("saveClient()");
        if (clients.length > 1 && clients[0].code == 0) {
            clients.splice(0, 1);
        }
        let json = JSON.stringify(clients);
        window.localStorage.setItem(DB_CLIENT, json);
    },

    retrieveClient: function() {
        Debug.print("retrieveClient()");
        let json = window.localStorage.getItem(DB_CLIENT);
        clients = JSON.parse(json);
    },

    getIndexClientByEmail: function(clientEmail) {
        if (clients == null)
            return -1;
        else
            return clients.findIndex(client => client.email == clientEmail);
    },

    getClientByEmail: function(clientEmail) {
        let index = ClientDB.getIndexClientByEmail(clientEmail);
        if (index >= 0) {
            return clients[index];
        }
    },

    getIndexClientByCode: function(clientCode) {
        if (clients == null)
            return -1;
        else
            return clients.findIndex(client => client.code == clientCode);
    },

    getClientByCode: function(clientCode) {
        let index = ClientDB.getIndexClientByCode(clientCode);
        if (index >= 0) {
            return clients[index];
        }
    },

    addClient: function(clientName, clientEmail, clientPassword) {
        Debug.print("addClient()");
        let client = { code: "1", name: "client", email: "client", password: "client" };
        client.code = ClientDB.getNextCodeClient().toString();
        client.name = clientName;
        client.email = clientEmail;
        client.password = clientPassword;
        clients.push(client);
        ClientDB.saveClient();
        ClientDB.retrieveClient();
    },

    checkClient: function(clientEmail, clientPassword) {
        Debug.print("checkClient()");
        let index = ClientDB.getIndexClientByEmail(clientEmail);
        if (index >= 0) {
            if (clients[index].password == clientPassword)
                return true;
        }
        return false;
    },

    getNextCodeClient: function() {
        let code = 0;
        if (clients == null)
            code = 1;
        else
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].code >= code)
                    code = parseInt(clients[i].code) + 1;
            }
        return code;
    },

    getClientList: function() {
        ClientDB.retrieveClient();
        return clients;
    },

    deleteClient: function(email) {
        Debug.print("deleteClient()");
        let index = ClientDB.getIndexClientByEmail(email);
        if (index >= 0) {
            let client = clients[index];
            let orders = OrderDB.getOrderListByClientCode(client.code);
            for (let indexOrder = 0; indexOrder < orders.length; indexOrder++) {
                OrderDB.deleteOrder(orders[indexOrder].code);
            }
            clients.splice(index, 1);
            ClientDB.saveClient();
            ClientDB.retrieveClient();
        }
    },

    editClient: function(email, newName, newPassword) {
        Debug.print("editClient()");
        let index = ClientDB.getIndexClientByEmail(email);
        if (index >= 0) {
            clients[index].name = newName;
            clients[index].password = newPassword;
            ClientDB.saveClient();
            ClientDB.retrieveClient();
        }
    },

};

ClientDB.initClient();