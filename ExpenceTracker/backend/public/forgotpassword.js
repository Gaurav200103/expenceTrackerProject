<<<<<<< HEAD

const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;
  const obj = {
    email : elements.email.value
  }

  await fetch("http://13.61.33.40:3000/password/forgotpassword", {
    method:"POST",
    headers:{
      "content-type":"application/json",

    },
    body:JSON.stringify(obj)
  })


=======

const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;
  const obj = {
    email : elements.email.value
  }

  await fetch("http://13.61.33.40:3000/password/forgotpassword", {
    method:"POST",
    headers:{
      "content-type":"application/json",

    },
    body:JSON.stringify(obj)
  })


>>>>>>> 8e7a451fb95b9332bcd4803de024626147d2e7d1
})