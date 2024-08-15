<<<<<<< HEAD
const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;

  const object = {
    email: elements.email.value,
    password: elements.password.value
  }
  console.log(object);
  const res = await fetch("http://13.61.33.40:3000/login",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify(object)
  });

  const data = await res.json();

  console.log(data);
  localStorage.setItem("token", data.token);
  if(data.login == true){
    window.location.href = "expence.html"
  }
=======
const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;

  const object = {
    email: elements.email.value,
    password: elements.password.value
  }
  console.log(object);
  const res = await fetch("http://13.61.33.40:3000/login",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify(object)
  });

  const data = await res.json();

  console.log(data);
  localStorage.setItem("token", data.token);
  if(data.login == true){
    window.location.href = "expence.html"
  }
>>>>>>> 8e7a451fb95b9332bcd4803de024626147d2e7d1
})