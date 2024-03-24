(() => {
  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.innerHTML = `
  @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap");

#baho-calendar {
  margin: auto;
  border-radius: 7px;
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(17, 13, 13);
  color: azure;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

#baho-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 7px;
  width: fit-content;
  gap: 10px;
}
#baho-form > select {
  max-width: fit-content;
  text-align: center;
  padding: 7px;
  border: none;
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
}

.baho-input,
.baho-select {
  max-width: 90px;
  border: none;
  text-align: center;
  padding: 5px;
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: bold;
  background-color: rgb(17, 13, 13);
  color: azure;
}

small.date {
  background-color: rgb(17, 13, 13);
  color: azure;
  margin-top: 10px;
  font-weight: bold;
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

small.clock {
  background-color: rgb(17, 13, 13);
  color: limegreen;
  margin-top: 10px;
  font-weight: bold;
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
.dt {
  background-color: rgb(17, 13, 13);
  color: azure;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 7px;
  width: fit-content;
  gap: 10px;
  font-weight: bold;
  font-family: monospace;
  font-optical-sizing: auto;
  font-style: normal;
}
.baho-cal {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 7px;
  width: auto;
  gap: 10px;
  font-weight: bold;
}
.baho-day {
  text-align: center;
  padding: 10px;
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  border: 1px solid goldenrod;
}
.baho-sunday {
  color: rgb(231, 65, 65);
  text-align: center;
  padding: 10px;
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  border: 1px solid goldenrod;
}
.baho-active {
  color: limegreen;
  text-align: center;
  padding: 10px;
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  border: 1px solid goldenrod;
}
`;
  head.appendChild(style);
  const baho = document.querySelector("#baho-calendar");
  const form = document.createElement("form");
  form.setAttribute("id", "baho-form");
  baho.appendChild(form);
  const today = new Date();
  const yearNow = today.getFullYear();
  const monthNow = today.getMonth();
  const dateNow = today.getDate();
  let aftmn = []; // after mont now
  let bfmn = [];
  for (let i = monthNow; i <= 11; i++) {
    aftmn.push(i);
  }
  if (monthNow !== 0) {
    for (let i = monthNow - 1; i >= 0; i--) {
      bfmn.push(i);
    }
  }
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const selectValue = [...aftmn, ...bfmn];
  setInterval(() => {
    var dt = new Date();
    var dat = dt.toLocaleTimeString();
    document.getElementById("clock").innerHTML = dat;
  }, 1000);
  const tz = Intl.DateTimeFormat().format(today);
  form.innerHTML = `
  <input type="number" name="baho-year" id="baho-year" value=${yearNow} class="baho-input" />
  <select name="baho-month" id="baho-month" class="baho-select">
    ${selectValue
      .map((i) => {
        return `
        <option value=${i}>${monthArray[i]}</option>
        `;
      })
      .join("")}
  </select>
  <small class="date">${tz}</small>
  <small class="clock" id="clock"></small>
  `;
  // >>>>>>>>>>> Day Time <<<<<<<<<<<<<<<< //
  function convertDecimalTime(decimalTime) {
    var hours = Math.floor(decimalTime);
    var minutes = Math.floor((decimalTime - hours) * 60);
    var seconds = Math.floor(((decimalTime - hours) * 60 - minutes) * 60);
    var formattedHours = hours.toString().padStart(2, "0");
    var formattedMinutes = minutes.toString().padStart(2, "0");
    var formattedSeconds = seconds.toString().padStart(2, "0");
    var ampm = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
      formattedHours = (hours - 12).toString().padStart(2, "0");
    } else if (hours === 0) {
      formattedHours = "12";
    }
    var formattedTime =
      formattedHours +
      ":" +
      formattedMinutes +
      ":" +
      formattedSeconds +
      " " +
      ampm;

    return formattedTime;
  }
  function timeDiff(decimalTime1, decimalTime2) {
    var seconds1 = Math.floor(decimalTime1 * 3600);
    var seconds2 = Math.floor(decimalTime2 * 3600);
    var diffSeconds = Math.abs(seconds1 - seconds2);
    var decimalDiff = diffSeconds / 3600;
    var hours = Math.floor(decimalDiff);
    var minutes = Math.floor((decimalDiff - hours) * 60);
    var seconds = Math.floor(((decimalDiff - hours) * 60 - minutes) * 60);
    var formattedHours = hours.toString().padStart(2, "0");
    var formattedMinutes = minutes.toString().padStart(2, "0");
    var formattedSeconds = seconds.toString().padStart(2, "0");
    var formattedTimeDiff =
      formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
    return formattedTimeDiff;
  }
  function suntimes(latitude, longitude, timezone) {
    const d = new Date();
    const radians = Math.PI / 180.0;
    const degrees = 180.0 / Math.PI;

    const a = Math.floor((14 - (d.getMonth() + 1.0)) / 12);
    const y = d.getFullYear() + 4800 - a;
    const m = d.getMonth() + 1 + 12 * a - 3;
    const j_day =
      d.getDate() +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;
    const n_star = j_day - 2451545.0009 - longitude / 360.0;
    const n = Math.floor(n_star + 0.5);
    const solar_noon = 2451545.0009 - longitude / 360.0 + n;
    const M = 356.047 + 0.9856002585 * n;
    const C =
      1.9148 * Math.sin(M * radians) +
      0.02 * Math.sin(2 * M * radians) +
      0.0003 * Math.sin(3 * M * radians);
    const L = (M + 102.9372 + C + 180) % 360;
    const j_transit =
      solar_noon +
      0.0053 * Math.sin(M * radians) -
      0.0069 * Math.sin(2 * L * radians);
    const D =
      Math.asin(Math.sin(L * radians) * Math.sin(23.45 * radians)) * degrees;
    const cos_omega =
      (Math.sin(-0.83 * radians) -
        Math.sin(latitude * radians) * Math.sin(D * radians)) /
      (Math.cos(latitude * radians) * Math.cos(D * radians));
    if (cos_omega > 1) {
      return [null, -1];
    }
    if (cos_omega < -1) {
      return [-1, null];
    }
    const omega = Math.acos(cos_omega) * degrees;
    const j_set = j_transit + omega / 360.0;
    const j_rise = j_transit - omega / 360.0;
    const utc_time_set = 24 * (j_set - j_day) + 12;
    const utc_time_rise = 24 * (j_rise - j_day) + 12;
    const tz_offset =
      timezone === undefined ? (-1 * d.getTimezoneOffset()) / 60 : timezone;
    const local_rise = (utc_time_rise + tz_offset) % 24;
    const local_set = (utc_time_set + tz_offset) % 24;
    return [local_rise, local_set];
  }
  const tzof = (today.getTimezoneOffset() / 60) * -1;
  function dayTime() {
    navigator.geolocation.getCurrentPosition((i) => {
      var lat = i.coords.latitude;
      var long = i.coords.longitude;
      var [sunriseDecimal, sunsetDecimal] = suntimes(lat, long, tzof);
      let sunrise = "N/A";
      let sunset = "N/A";
      let daytime = "N/A";
      if (sunriseDecimal !== null && sunsetDecimal !== null) {
        sunrise = convertDecimalTime(sunriseDecimal);
        sunset = convertDecimalTime(sunsetDecimal);
        daytime = timeDiff(sunriseDecimal, sunsetDecimal);
      }
      const dtt = document.createElement("div");
      dtt.classList.add("dt");
      const sr = document.createElement("p");
      sr.innerHTML = `Sun Rise: ${sunrise}`;
      dtt.appendChild(sr);
      const ss = document.createElement("p");
      ss.innerHTML = `Sun Set: ${sunset}`;
      dtt.appendChild(ss);
      const dd = document.createElement("p");
      dd.innerHTML = `Day Time: ${daytime}`;
      dtt.appendChild(dd);
      baho.appendChild(dtt);
    });
  }

  // >>>>>>>>>>>> END <<<<<<<<<<<<<<<<<<<<<<<<< //
  const yearEl = form.elements.namedItem("baho-year");
  const monthEl = form.elements.namedItem("baho-month");
  // checking for leap year
  const isLeapYear = (year) => {
    if (year % 4 !== 0) {
      return false;
    } else if (year % 100 !== 0) {
      return true;
    } else if (year % 400 !== 0) {
      return false;
    } else {
      return true;
    }
  };

  //change event
  form.addEventListener("change", (event) => {
    event.preventDefault();
    handler();
  });
  //handler for on load and change events for calendar body
  function handler() {
    const existingGrid = document.querySelector(".baho-cal");
    const existDt = document.querySelector(".dt");
    if (existingGrid) {
      existingGrid.remove();
    }
    if (existDt) {
      existDt.remove();
    }
    const yearValue = yearEl.value;
    const monthValue = monthEl.value;
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeapYear(yearValue)) {
      daysInMonths[1] = 29;
    }
    dayTime();
    const dim = daysInMonths[monthValue];
    const dateArray = [];
    for (let i = 0; i < dim; i++) {
      const wdid = new Date(yearValue, monthValue, i + 1).getDay();
      const da = {
        date: i + 1,
        wd_id: wdid,
      };
      dateArray.push(da);
    }
    const fwdId = dateArray[0].wd_id;
    const weekDaysIds = dateArray.map((i) => i.wd_id);
    const wkda = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grid = document.createElement("div");
    grid.classList.add("baho-cal");
    baho.appendChild(grid);

    for (let i = 0; i < 7; i++) {
      const dwek = document.createElement("div");
      dwek.classList.add("baho-day");
      if (i === 0) {
        dwek.classList.add("baho-sunday");
      }
      dwek.textContent = wkda[i];
      grid.appendChild(dwek);
    }

    const blanks = (fwdId + 7) % 7;

    for (let i = 0; i < blanks; i++) {
      const blank = document.createElement("div");
      blank.classList.add("baho-day");
      grid.appendChild(blank);
    }

    for (let i = 1; i <= dim; i++) {
      const dc = document.createElement("div");
      dc.classList.add("baho-day");
      if (weekDaysIds[i - 1] === 0) {
        dc.classList.add("baho-sunday");
      }
      const a = new Date(yearNow, monthNow, dateNow).getTime();
      const b = new Date(yearValue, monthValue, i).getTime();
      if (a === b && dateNow === i) {
        dc.classList.add("baho-active");
      }
      dc.innerHTML = `<span>${i}</span>`;
      grid.appendChild(dc);
    }

    const e = blanks + dim;
    const getExtraBlanks = e <= 35 ? 35 - e : 42 - e;
    for (let i = 0; i < getExtraBlanks; i++) {
      const ext = document.createElement("div");
      ext.classList.add("baho-day");
      grid.appendChild(ext);
    }
  }
  handler();
})();
