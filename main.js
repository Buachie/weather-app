window.addEventListener("load", () => {
  let body = document.querySelector(".main");
  let long;
  let lat;
  let temp = document.querySelector(".temp-degree");
  let location = document.querySelector(".location");
  let weather = document.querySelector(".weather");
  let apparentTemp = document.querySelector(".apparent-degree");
  let weatherIcon = document.querySelector(".icon");
  let weeklyForecast = document.querySelector(".weekly");

  // Convert darksky time to selected day
  function tm(unix_tm) {
    var dt = new Date(unix_tm * 1000);
    day = dt.getDay();
    switch (day) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wedensday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;

      default:
        break;
    }
    return day;
  }

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
          location.innerHTML = data.timezone.replace(/_/g, " ");
          weather.innerHTML = data.currently.summary;
          apparentTemp.innerHTML =
            "(Feels like) " + data.currently.apparentTemperature;
          weatherIcon = data.currently.icon;
          setIconsCurrent(weatherIcon, document.querySelector(".icon"));

          //Weekly Temps

          for (let i = 1; i < data.daily.data.length; i++) {
            let day = document.createElement("div");
            let time = document.createElement("div");
            time.classList.add("day");
            time.innerHTML = tm(data.daily.data[i].time);
            weatherIcon = data.daily.data[i].icon;
            weeklyIcon = document.createElement("canvas");
            weeklyIcon.classList.add("icon");
            weeklyForecast.appendChild(weeklyIcon);
            setIconsWeekly(weatherIcon, weeklyIcon);

            weekTemp = document.createElement("div");
            weekTemp.innerHTML = data.daily.data[i].temperatureHigh;
            day.appendChild(time);
            day.appendChild(weeklyIcon);
            day.appendChild(weekTemp);
            weeklyForecast.appendChild(day);
          }
        });
    });
  }

  //Sets icons for weekly weather
  setIconsWeekly = (icon, iconID) => {
    const skycons = new Skycons({ color: "black" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();

    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };

  //Sets Icon and background for the current day
  setIconsCurrent = (icon, iconID) => {
    const skycons = new Skycons();
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();

    skycons.play();

    //Sets background and text color based on weather
    switch (currentIcon) {
      case "CLEAR_DAY":
        body.style.background = "linear-gradient(to right, #ffe259, #ffa751)";
        skycons.color = "black";
        body.style.color = "#000";
        break;
      case "CLEAR_NIGHT":
        body.style.background = "linear-gradient(to right, #41295a, #2F0743)";
        skycons.color = "white";
        body.style.color = "#fff";
        break;
      case "PARTLY_CLOUDY_DAY":
        body.style.background = "linear-gradient(to right, #ED4264, #FFEDBC)";
        skycons.color = "black";
        body.style.color = "#000";
        break;
      case "PARTLY_CLOUDY_NIGHT":
        body.style.background = "linear-gradient(to right, #5C258D, #4389A2)";
        skycons.color = "white";
        body.style.color = "#fff";
        break;
      case "CLOUDY":
        body.style.background = "linear-gradient(to right, #8e9eab, #eef2f3)";
        skycons.color = "black";
        body.style.color = "#000";
        break;
      case "RAIN":
        body.style.background =
          "linear-gradient(to bottom right, #1A2980, #26D0CE)";
        skycons.color = "white";
        body.style.color = "#fff";
        break;
      case "WIND":
        body.style.background = "linear-gradient(to right, #acb6e5, #86fde8)";
        skycons.color = "black";
        body.style.color = "#000";
        break;
      case "SNOW":
        body.style.background = "linear-gradient(to right, #ECE9E6, #FFFFFF)";
        skycons.color = "black";
        body.style.color = "#000";
        break;
      case "SLEET":
        body.style.background = "linear-gradient(to right, #ECE9E6, #FFFFFF)";
        skycons.color = "black";
        body.style.color = "#000";
        break;
      case "FOG":
        body.style.background = "linear-gradient(to right, #E6DADA, #274046)";
        skycons.color = "black";
        body.style.color = "#000";
        break;

      default:
        break;
    }
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});
