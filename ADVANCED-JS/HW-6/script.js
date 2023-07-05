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
    const locationResponse = await fetch(
      `https://api.iplocation.net/?ip=${ip}`
    );
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
    <p><strong>Country:</strong> ${address.country_name}</p>
    <p><strong>Country Code:</strong> ${address.country_code2}</p>
    <p><strong>ISP:</strong> ${address.isp}</p>
  `;
}
