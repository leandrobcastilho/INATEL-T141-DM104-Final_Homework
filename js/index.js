ClientPage.loadMainPage();

////////////////////////////////////////////////////////////////////////
document.getElementById("logoHeader").onclick = function() {
    Debug.print("click btnAdminLogin");
    SessionFakeAdmin.logoffAdmin_SF();
    location.href = "./index.html";
};
////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
document.getElementById("myEmail").onclick = function() {
    Debug.print("click myEmail");
    $('#contactPopUpWindow').modal('hide');
    location.href = "mailto:casinhadeflores@gmail.com";
};

document.getElementById("myFacebook").onclick = function() {
    Debug.print("click myFacebook");
    $('#contactPopUpWindow').modal('hide');
    location.href = "https://www.facebook.com/ateliecasinhadeflores/";
};

document.getElementById("myInstagram").onclick = function() {
    Debug.print("click myInstagram");
    $('#contactPopUpWindow').modal('hide');
    location.href = "https://www.instagram.com/anaanderi/";
};