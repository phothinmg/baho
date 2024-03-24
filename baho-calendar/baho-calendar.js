class Bca {
  constructor() {
    this._bca = document.querySelector("#baho-calendar");
    this._form = document.createElement("form");
    this._form.setAttribute("id", "baho-form");
    this._solor_day = 86400000; //ms
    //get local times
    this._now = new Date();
    this._year_now = this._now.getFullYear();
    this._month_now = this._now.getMonth();
    this._day_now = this._now.getDate();
    this._weekday_now = this._now.getDay();
    this._hour_now = this._now.getHours();
    this._minute_now = this._now.getMinutes();
    this._second_now = this._now.getSeconds();
    this._tz_offset_now = this._now.getTimezoneOffset();
    this._epoch_now = this._now.getTime();
  }
  #isLeapYear = (year) => {
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

  static G2J(year, month, day, UT = 12.0) {
    var JD =
      367 * year -
      (7 * (year + (month + 9) / 12)) / 4 +
      (275 * month) / 9 +
      day +
      1721013.5 +
      UT / 24 -
      0.5 * Math.sin(100 * year + month - 190002.5) +
      0.5;
    return Math.floor(JD);
  }
  static J2G(jd) {
    var j = jd + 0.5,
      z = Math.floor(j),
      f = j - z,
      a = z;
    if (z >= 2299161) {
      alpha = Math.floor((z - 1867216.25) / 36524.25);
      a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    var b = a + 1524,
      c = Math.floor((b - 122.1) / 365.25),
      d = Math.floor(365.25 * c),
      e = Math.floor((b - d) / 30.6001),
      day = Math.floor(b - d - 30.6001 * e + f);

    var month = e < 14 ? e - 1 : e - 13;
    var year = month > 2 ? c - 4716 : c - 4715;
    return {
      year: year,
      month: month,
      day: day,
    };
  }
  // suntime
  suntimes(latitude, longitude, timezone) {
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
  timeDiff(decimalTime1, decimalTime2) {
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
  // convert decimal time to time string
  convertDecimalTime(decimalTime) {
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
  // first form ui
  year_el() {
    var yr = document.createElement("input");
    yr.classList.add("baho-input");
    yr.setAttribute("name", "baho-year");
    yr.setAttribute("id", "baho-year");
    yr.setAttribute("value", this._year_now);
    this._form.appendChild(yr);
  }
  month_el() {
    let aftmn = []; // after mont now
    let bfmn = [];
    for (let i = this._month_now; i <= 11; i++) {
      aftmn.push(i);
    }
    if (this._month_now !== 0) {
      for (let i = this._month_now - 1; i >= 0; i--) {
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
    var mo = document.createElement("select");
    mo.classList.add("baho-input");
    mo.setAttribute("name", "baho-month");
    mo.setAttribute("id", "baho-month");
    mo.innerHTML = `
    ${selectValue
      .map((i) => {
        return `
          <option value=${i}>${monthArray[i]}</option>
          `;
      })
      .join("")}
    `;
    this._form.appendChild(mo);
  }
  date_el() {
    var dateEl = Intl.DateTimeFormat().format(this._now);
    var dd = document.createElement("small");
    dd.classList.add("date");
    dd.innerHTML = dateEl;
    this._form.appendChild(dd);
  }
  clock_el() {
    var clo = document.createElement("small");
    clo.classList.add("clock");
    clo.setAttribute("id", "clock");
    this._form.appendChild(clo);
    setInterval(() => {
      var dt = new Date();
      var dat = dt.toLocaleTimeString();
      document.getElementById("clock").innerHTML = dat;
    }, 1000);
  }
  daytime_el() {
    var tzof = (this._tz_offset_now / 60) * -1;
    navigator.geolocation.getCurrentPosition((i) => {
      var lat = i.coords.latitude;
      var long = i.coords.longitude;
      var [sunriseDecimal, sunsetDecimal] = this.suntimes(lat, long, tzof);
      let sunrise = "N/A";
      let sunset = "N/A";
      let daytime = "N/A";
      if (sunriseDecimal !== null && sunsetDecimal !== null) {
        sunrise = this.convertDecimalTime(sunriseDecimal);
        sunset = this.convertDecimalTime(sunsetDecimal);
        daytime = this.timeDiff(sunriseDecimal, sunsetDecimal);
      }
      const sr = document.createElement("small");
      sr.classList.add("suntime");
      sr.innerHTML = `Sunrise: <br> ${sunrise}`;
      this._form.appendChild(sr);
      const ss = document.createElement("small");
      ss.classList.add("suntime");
      ss.innerHTML = `Sunset:<br> ${sunset}`;
      this._form.appendChild(ss);
      const dd = document.createElement("small");
      dd.classList.add("suntime");
      dd.innerHTML = `Daylight:<br> ${daytime}`;
      this._form.appendChild(dd);
    });
  }
  render_form() {
    this._bca.appendChild(this._form);
    this.year_el();
    this.month_el();
    this.date_el();
    this.clock_el();
    this.daytime_el();
  }
  render() {
    this.render_form();
  }
}

console.log(24 * 60 * 60 * 1000);
