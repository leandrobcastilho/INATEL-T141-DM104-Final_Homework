let DB_ADMIN = "dbAdmin";

let admins = [
    { code: 1, login: "admin", password: "admin" }
]

let AdminDB = {

    initAdmin: function() {
        Debug.print("initAdmin()");
        let json = window.localStorage.getItem(DB_ADMIN);
        Debug.print(json);
        if (json == null)
            AdminDB.saveAdmin();
        else
            AdminDB.retrieveAdmin();
    },

    saveAdmin: function() {
        Debug.print("saveAdmin()");
        let json = JSON.stringify(admins);
        window.localStorage.setItem(DB_ADMIN, json);
    },

    retrieveAdmin: function() {
        Debug.print("retrieveAdmin()");
        let json = window.localStorage.getItem(DB_ADMIN);
        admins = JSON.parse(json);
    },

    getIndexAdminByLogin: function(adminLogin) {
        if (admins == null)
            return -1;
        else
            return admins.findIndex(admin => admin.login == adminLogin);
    },

    getAdminByLogin: function(adminLogin) {
        let index = AdminDB.getIndexAdminByLogin(adminLogin);
        if (index >= 0) {
            return admins[index];
        }
    },

    addAdmin: function(adminLogin, adminPassword) {
        Debug.print("addAdmin()");
        let admin = { code: "1", login: "admin", password: "admin" }
        admin.code = AdminDB.getNextCodeAdmin().toString();
        admin.login = adminLogin;
        admin.password = adminPassword;
        admins.push(admin);
        AdminDB.saveAdmin();
        AdminDB.retrieveAdmin();
    },

    checkAdmin: function(adminLogin, adminPassword) {
        Debug.print("checkAdmin()");
        let index = AdminDB.getIndexAdminByLogin(adminLogin);
        if (index >= 0) {
            if (admins[index].password == adminPassword)
                return true;
        }
        return false;
    },

    getNextCodeAdmin: function() {
        let code = 0;
        if (admins == null)
            code = 1;
        else
            for (let i = 0; i < admins.length; i++) {
                if (admins[i].code >= code)
                    code = parseInt(admins[i].code) + 1;
            }
        return code;
    },

    getAdminList: function() {
        AdminDB.retrieveAdmin();
        return admins;
    },

    deleteAdmin: function(login) {
        Debug.print("deleteAdmin()");
        let index = AdminDB.getIndexAdminByLogin(login);
        if (index >= 0) {
            admins.splice(index, 1);
            AdminDB.saveAdmin();
            AdminDB.retrieveAdmin();
        }
    },

    editAdmin: function(login, newPassword) {
        Debug.print("editAdmin()");
        let index = AdminDB.getIndexAdminByLogin(login);
        if (index >= 0) {
            admins[index].password = newPassword;
            AdminDB.saveAdmin();
            AdminDB.retrieveAdmin();
        }
    },
};

AdminDB.initAdmin();