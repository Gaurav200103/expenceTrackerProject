const token = localStorage.getItem("token");
const form = document.getElementById("form");


const showPremium = async ()=>{
  const button = document.getElementById("premium");
  const x = await fetch("http://13.61.33.40:3000/downloadFile",{
    headers:{
      "authorization":localStorage.getItem("token")
    }
  });

  const url = await x.json();

  button.style.display = "none";

  const leaderboard = document.createElement("button");
  leaderboard.innerText = "LeaderBoard";
  const report = document.createElement("a");
  report.innerText = "Get Report"
  report.href = url.url;
  const prevDown = document.createElement("a");
  prevDown.innerText = "Previous Downloads"
  prevDown.href = "report.html"
  const p = document.createElement("p");
  p.innerText = "You are the premium user";

  document.getElementById("premiumFeature").innerHTML = "";
  document.getElementById("premiumFeature").append(p, leaderboard, report, prevDown);

  document.getElementById("leaderBoard");

  const res = await fetch("http://13.61.33.40:3000/getLeaderboard");
  const data = await res.json();

  const ul = document.createElement("ul");
  const tital = document.createElement("p");
  tital.innerText = "LeaderBoard"
  // console.log(data);
  data.data.forEach((item,index) =>{
    const li = document.createElement("li");

    li.innerText = `${index+1} - ${item.name} - ${item.totalExpence}`
    ul.append(li);
  })

  document.getElementById("leaderBoard").innerHTML = "";
  document.getElementById("leaderBoard").append(tital,ul);
}



form.addEventListener("submit", async () => {
  event.preventDefault();

  const elements = event.target.elements;

  const object = {
    expence: elements.expence.value,
    description: elements.description.value,
    category: elements.category.value
  }


  const res = await fetch("http://13.61.33.40:3000/addExpence", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(object)
  });

  displayExpence(1, Number (localStorage.getItem("row")));
})


const displayExpence = async (i, rows) => {
  document.getElementById("pagination").innerHTML = "";
  document.getElementById("select").addEventListener("change", ()=> {
    localStorage.setItem('row', document.getElementById("select").value);

    displayExpence(i, localStorage.getItem("row"));
  });
  
  const res = await fetch(`http://13.61.33.40:3000/getExpences?page=${i}&rows=${rows}`, {
    headers: {
      "Authorization": token
    }
  });

  const data = await res.json();
  if(data.isPremiumUser == true){
    showPremium();
  }
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  data.expences.forEach(item => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    td1.innerText = item.expence;
    td2.innerText = item.description;
    td3.innerText = item.category;
    td4.innerText = "DELETE";
    td4.addEventListener("click", async () => {
      await fetch(`http://13.61.33.40:3000/deleteExpence/${item.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token
        }
      })
      displayExpence(1, Number (localStorage.getItem("row")));
    })


    tr.append(td1, td2, td3, td4);

    tbody.appendChild(tr);
  })

  const totalPages = data.totalPages;

  for(let i=0; i<totalPages; i++){
    const button = document.createElement("button");

    button.innerText = i+1;
    button.addEventListener("click", ()=> displayExpence(i+1, Number (localStorage.getItem("row"))));
    document.getElementById("pagination").append(button);
  }
}


const premiumButton = document.getElementById("premium");

premiumButton.addEventListener("click", async () => {
  const res = await fetch('http://13.61.33.40:3000/getPremium', {
    method: 'POST',
    headers:{
      "Authorization":token
    }
  })

  const data = await res.json();

  window.location.href = data.url;
  console.log(data);
})
