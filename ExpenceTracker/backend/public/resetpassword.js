<<<<<<< HEAD

const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;
  const obj = {
    password : elements.password.value
  }

  // await fetch("http://localhost:3000/password/resetPassword", {
  //   method:"POST",
  //   headers:{
  //     "content-type":"application/json",

  //   },
  //   body:JSON.stringify(obj)
  // })


=======

const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;
  const obj = {
    password : elements.password.value
  }

  // await fetch("http://localhost:3000/password/resetPassword", {
  //   method:"POST",
  //   headers:{
  //     "content-type":"application/json",

  //   },
  //   body:JSON.stringify(obj)
  // })


>>>>>>> 8e7a451fb95b9332bcd4803de024626147d2e7d1
})