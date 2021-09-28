const api = "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const myInformation = () =>{
    const info = {
      name:"Udit Malik",
      email:"uditm9699@gmail.com",
      collage:"Dronacharya Collage of Engineering"
    }
    console.log(info);
    getFunction();

}
function getFunction(){
fetch(api).then(response=>
response.json())
.then(data =>{
  const sortedInfo = sortD(data);
  const result = splitTfunction(sortedInfo);
  addTransactions(result);
});
};

function sortD(data) {
  const sortedT = data.transactions.sort((a, b) => {
    let da = new Date(a.startDate),
      db = new Date(b.startDate);
    return da - db;
  });
  return sortedT;
}

function splitTfunction(sortT = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortT.forEach((element) => {
    const key = getDate(element.startDate);
    if (!newData[key]) {
      newData[key] = [];
      newData[key].push(element);
    } else {
      newData[key].push(element);
    }
  });
  return newData;
}

var date;
function addTransactions(result) {

  for (let information in result) {
    var titledate = new Date(information);
    titledate = titledate.getDate() + " " + monthNames[(titledate.getMonth() + 1)] + " " + titledate.getFullYear();
    document.getElementById("items").innerHTML +=
      `<div class="line">
              <div>
                <div>
                  <p >${titledate}</p>
                </div
              </div>
            </div>`;

    for (let i = 0; i < result[information].length; i++) {
      let type = result[information][i].type;
      let direction = result[information][i].direction;
      var new_date = new Date(result[information][i].startDate)
      var date = new_date.toLocaleTimeString();
      new_date = new_date.getDate() + " " + monthNames[(new_date.getMonth() + 1)] + " " + new_date.getFullYear();
      if (type === 1 && direction === 1) {
        document.getElementById(
          "items"
        ).innerHTML +=
          `<div class="rightalign"><div class="box">
                  <p class="amount">
                    &#8377; ${result[information][i].amount}
                  </p>
                  <p class="message"> ✔️ You paid</p>
                  <div class="id">
                  <p>Transaction ID</p>
                <p>${result[information][i].id}</p>
                </div>
                </div>
                </div>
                <div class="rightside">
                <p>${new_date}, ${date}</p>
                </div>`;
      }
      else if (type === 1 && direction === 2) {
        document.getElementById(
          "items"
        ).innerHTML += `<div class="leftalign"><div class="box">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">✔️ You received</p>
             <div class="id">
             <p>Transaction ID</p>
              <p>${result[information][i].id}</p>
             </div>
             </div>
             </div>
              <div class="leftside">
              <p>${new_date}, ${date}</p>
            </div>`;
      }
      else if (type === 2 && direction === 2) {
        //    Pay and Decline Button and Align BOX Left
        document.getElementById(
          "items"
        ).innerHTML += `<div class="leftalign"><div class="box">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">🔗 Request received</p>
              <button class=\"paybtn\">Pay</button>
              <button class=\"cancelbtn\">Decline</button>
             </div>
             </div>
             <div class="leftside">
             <p>${new_date}, ${date}</p>
            </div>`;
      }
      else if (type === 2 && direction === 1) {

        document.getElementById(
          "items"
        ).innerHTML += `<div class="rightalign"><div class="box">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">🔗 You requested</p>
             <div class="id">
              <button class=\"cancelbtn\">Cancel</button>
             </div>
             </div>
             </div>
             <div class="rightside">
             
             <p>${new_date}, ${date}</p>
           </div>`;
      }
    }
  }
}
