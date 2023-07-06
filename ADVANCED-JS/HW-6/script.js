async function findIp() {
  const loading = document.getElementById("loading");
  const loadingText = document.getElementById("loadingText");
  try {
    loading.style.display = "block";
    loadingText.textContent = "Finding IP address...";
    const Response = await fetch("https://api.ipify.org/?format=json");
    const { ip } = await Response.json();

    loadingText.textContent = "Finding location information...";

    /*The api that finds the location with the ip you upload to gitlab is paid, 
    so I used another api that is free and gave the country name, code and ISP in response.*/
    const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const address = await locationResponse.json();

    findLocation(address);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    //hide loading after result
    loading.style.display = "none";
    loadingText.textContent = "";
  }
}

function findLocation(address) {
  const div = document.getElementById("result");
  div.innerHTML = `
  <p><strong>Country:</strong> ${address.country}</p>
  <p><strong>Region:</strong> ${address.regionName}</p>
  <p><strong>City:</strong> ${address.city}</p>
  <p><strong>Timezone:</strong> ${address.timezone}</p>
  `;
}
