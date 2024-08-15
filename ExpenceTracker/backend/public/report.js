

const displayReport =async ()=>{
  const res = await fetch('http://13.61.33.40:3000/showDownloads',{
    headers:{
      "authorization":localStorage.getItem("token")
    }
  });

  const report= await res.json();
  console.log(report);
  
  report.data.map(item =>{
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const a = document.createElement("a");

    td1.innerText = item.createdAt;
    a.href = item.url;
    a.innerText = "Download"
    td2.append(a);


    tr.append(td1, td2);
    document.getElementById("month").append(tr);
  })

  
}

displayReport();

downloadReport = async ()=>{
  // const {jsPDF} = window.jspdf
  // var element = document.getElementsByTagName('body')[0];
  //   html2canvas(element).then((canvas) => {
  //       var imgData = canvas.toDataURL('image/png');
  //       var pdf = new jsPDF();
  //       pdf.addImage(imgData, 'PNG', 10, 10);
  //       pdf.save('table.pdf');
  //   });

  const res = await fetch("http://13.61.33.40:3000/showDownloads",{
    headers:{
      "authorization":localStorage.getItem("token")
    }
  });

  

}