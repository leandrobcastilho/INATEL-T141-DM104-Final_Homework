let DB_ADMIN_SF = "dbAdmin_SF";
let admin_SF = { login: "", password: "" };

let SessionFakeAdmin = {

    initAdmin_SF: function() {
        Debug.print("initAdmin_SF()");
        let json = window.localStorage.getItem(DB_ADMIN_SF);
        Debug.print(json);
        if (json == null) {
            SessionFakeAdmin.saveAdmin_SF();
        } else {
            SessionFakeAdmin.retrieveAdmin_SF();
        }
    },

    saveAdmin_SF: function() {
        Debug.print("saveAdmin_SF()");
        let json = JSON.stringify(admin_SF);
        window.localStorage.setItem(DB_ADMIN_SF, json);
    },

    retrieveAdmin_SF: function() {
        Debug.print("retrieveAdmin_SF()");
        let json = window.localStorage.getItem(DB_ADMIN_SF);
        admin_SF = JSON.parse(json);
    },

    getAdmin_SF: function() {
        SessionFakeAdmin.retrieveAdmin_SF();
        return admin_SF;
    },

    setAdmin_SF: function(login, password) {
        admin_SF.login = login;
        admin_SF.password = password;
        SessionFakeAdmin.saveAdmin_SF();
    },

    loginAdmin_SF: function(login, password) {
        Debug.print("loginAdmin_SF()");
        SessionFakeAdmin.setAdmin_SF(login, password);
    },

    logoffAdmin_SF: function() {
        Debug.print("logoffAdmin_SF()");
        SessionFakeAdmin.setAdmin_SF("", "");
    },

};

SessionFakeAdmin.initAdmin_SF();