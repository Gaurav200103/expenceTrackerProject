const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;

  const object = {
    name : elements.name.value,
    email: elements.email.value,
    password: elements.password.value
  }
  // console.log(object);
  const res = await fetch("http://13.61.33.40:3000/singup",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify(object)
  });

  const data = await res.json();
  console.log(data);

  if(data.signup == true){
    window.location.href = "login.html"
  }
  
})