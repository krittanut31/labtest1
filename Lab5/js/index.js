// index.js

let firebaseConfig = {
    apiKey: "AIzaSyAJULwdzyKt8rSVsm5kgB4CHuVtlTvPSeY",
    authDomain: "localhost",
    projectId: "cmu-207",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

console.log('Hi');



$('button').click(()=> {
    db.collection("users")
    .add({
        subject: $('#subject').val(),
        grade: Number($('#grade').val()),
        credit: Number($('#credit').val()),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#subject').val('')
        $('#grade').val('4')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

})

db.collection('users').orderBy("subject").onSnapshot(doc =>{
    let table = $('tbody')[0]
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    $("tbody tr").remove()
    gpa = 0
    credit = 0
    doc.forEach(item => { 
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secoundCell = row.insertCell(1)
        let thirdcell = row.insertCell(2)
        firstCell.textContent = item.data().subject
        if(item.data().grade == 4){
            secoundCell.textContent = 'A';
        }else if(item.data().grade == 3){
            secoundCell.textContent = 'B';
        }else if(item.data().grade == 2){
            secoundCell.textContent = 'C';
        }else if(item.data().grade == 1){
            secoundCell.textContent = 'D';
        }else if(item.data().grade == 0){
            secoundCell.textContent = 'F';
        }        
    
        //secoundCell.textContent = item.data().grade
        thirdcell.textContent =  item.data().credit
        gpa += (item.data().grade * item.data().credit)
        credit += item.data().credit

  
    })
    console.log(gpa/credit)
    $('h4').text(gpa/credit)
    
})
db.collection('users').where('grade','>',3).get().then(res =>{
    res.forEach(item => console.log(item.data()))
})