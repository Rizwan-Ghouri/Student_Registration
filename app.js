// ===============Get input id =================

var stdName = document.getElementById("name")
var stdFatherName = document.getElementById("fName")
var stdEmail = document.getElementById("email")
var stdAge = document.getElementById("age")
var stdCource = document.getElementById("cource")

// ===============btn get id =================
var btnSubmit = document.getElementById("submit")
var addMultiUser = []
var adduserObj = {}
// ===============tbl get id =================
var tblbody = document.getElementById("tblbody")


// ===============function Event=================
function useraddtbl() {
    tblbody.innerHTML += `
            <tr class="tblbodytr">       
                <td>${addMultiUser.length + 0}</td>
                <td>${addMultiUser.length + 100}</td>
                <td>${adduserObj.userName}</td>
                <td>${adduserObj.userFatherName}</td>
                <td>${adduserObj.userEmail}</td>
                <td>${adduserObj.userAge}</td>
                <td>${adduserObj.userCource}</td>
                <td><button class="edt">Edit</button></td>
                <td><button class="del">Delete</button></td>
            </tr>
          `
    stdName.value = ""
    stdFatherName.value = ""
    stdEmail.value = ""
    stdAge.value = ""
    stdCource.value = "Select your Cource"
}

// ===============btn Event=================
btnSubmit.addEventListener("click", function submit() {
    var userName = stdName.value
    var userFatherName = stdFatherName.value
    var userEmail = stdEmail.value
    var userAge = stdAge.value
    var userCource = stdCource.value

    adduserObj = {
        userName,
        userFatherName,
        userEmail,
        userAge,
        userCource
    }
    addMultiUser.push(adduserObj);
    // console.log(adduserObj)
    console.log(addMultiUser)
    useraddtbl()
})
