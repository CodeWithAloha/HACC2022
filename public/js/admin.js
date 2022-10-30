
// async function getURLs() {
//   const response = await fetch("/admin/getURLs")
//   const urls = await response.json()
//   console.log("URLS:", urls)
// }

async function getCountries() {
  const response = await fetch("/admin/country")
  const countries = await response.json();
  const filteredData = Object.entries(countries).filter(([key,_]) => key !== "undefined");
  const labels = filteredData.map(fd => fd[0]);
  const vals = filteredData.map(fd => fd[1]);
  
  const data = {
    labels: labels,
    datasets: [{
      label: "URLs by Country",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: vals
    }]
  }

  const config = {
    type: "bar",
    data: data,
    options: {}
  }
  
  const urlCountryData = new Chart(
    document.getElementById('urlData'),
    config
  );
}

const filteredData =  getCountries();


