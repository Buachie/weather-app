window.addEventListener("load", () => {
  let long;
  let lat;
  let temp = document.querySelector(".temp-degree");
  let location = document.querySelector(".location");
  let time = document.querySelector(".time");
  let weather = document.querySelector(".weather");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //console.log(position);
      const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/15abec103b4ca0854030b4462f9754ca/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          temp.innerHTML = data.currently.temperature + " degrees";
          location.innerHTML = data.timezone;
          weather.innerHTML = data.currently.summary;
        });
    });
  }
});
