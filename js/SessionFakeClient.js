let DB_CLIENT_SF = "dbClient_SF";
let client_SF = { email: "", password: "" };

let SessionFakeClient = {

    initClient_SF: function() {
        Debug.print("initClient_SF()");
        let json = window.localStorage.getItem(DB_CLIENT_SF);
        Debug.print(json);
        if (json == null) {
            SessionFakeClient.saveClient_SF();
        } else {
            SessionFakeClient.retrieveClient_SF();
        }
    },

    saveClient_SF: function() {
        Debug.print("saveClientLogin()");
        let json = JSON.stringify(client_SF);
        window.localStorage.setItem(DB_CLIENT_SF, json);
    },

    retrieveClient_SF: function() {
        Debug.print("retrieveClientLogin()");
        let json = window.localStorage.getItem(DB_CLIENT_SF);
        client_SF = JSON.parse(json);
    },

    getClient_SF: function() {
        SessionFakeClient.retrieveClient_SF();
        return client_SF;
    },

    setClient_SF: function(email, password) {
        client_SF.email = email;
        client_SF.password = password;
        SessionFakeClient.saveClient_SF();
    },

    loginClient_SF: function(email, password) {
        Debug.print("loginClient_SF()");
        SessionFakeClient.setClient_SF(email, password);
    },

    logoffClient_SF: function() {
        Debug.print("logoffClient_SF()");
        SessionFakeOrder.cleanOrderProduct_SF();
        SessionFakeClient.setClient_SF("", "");
    },

};

SessionFakeClient.initClient_SF();