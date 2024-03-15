class Calendar {
  constructor() {
    this._document = document.querySelector("html");
    this._main = document.querySelector("main");
    this._inputElement = document.getElementById("year");
    this._selectElement = document.getElementById("month");
    this.event();
  }

  gregorianToJulian(year, month, day) {
    // Adjust month and year for the formula
    if (month < 3) {
      month += 12;
      year--;
    }

    // Calculate the Julian day number
    const a = Math.floor(year / 100);
    const b = Math.floor(a / 4);
    const c = 2 - a + b;
    const e = Math.floor(365.25 * (year + 4716));
    const f = Math.floor(30.6001 * (month + 1));
    const jd = c + day + e + f - 1524.5;

    return jd;
  }

  monthArray() {
    return [
      " ",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  weekDaysArray() {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  }
  isLeapYear(year) {
    var yer = parseInt(year);
    if (yer % 4 !== 0) {
      return false;
    } else if (yer % 100 !== 0) {
      return true;
    } else if (yer % 400 !== 0) {
      return false;
    } else {
      return true;
    }
  }
  getDaysInMonths(year) {
    var yer = parseInt(year);
    let dim = [];
    dim[0] = 0;
    dim[1] = 31;
    if (this.isLeapYear(yer)) {
      dim[2] = 29;
    } else {
      dim[2] = 28;
    }
    dim[3] = 31;
    dim[4] = 30;
    dim[5] = 31;
    dim[6] = 30;
    dim[7] = 31;
    dim[8] = 31;
    dim[9] = 30;
    dim[10] = 31;
    dim[11] = 30;
    dim[12] = 31;

    return dim;
  }
  monthObject(year, month) {
    var yer = parseInt(year);
    var mont = parseInt(month);
    var dim = this.getDaysInMonths(yer);
    const dom = dim[mont];
    // looping
    let wd = [],
      wdn = [],
      jd = [];
    let wk;

    for (let i = 1; i < dom + 1; i++) {
      wk = new Date(yer, mont - 1, i).getDay();
      jd.push(Math.ceil(this.gregorianToJulian(yer, month, i)));
      wd.push(wk);
      wdn.push(this.weekDaysArray()[wk]);
    }

    let doo = {};
    let dayBbj = [];

    for (let i = 0; i < dom; i++) {
      doo = {
        date: i + 1,
        julian_day: jd[i],
        weekDay_id: wd[i],
        weekDay_name: wdn[i],
      };
      dayBbj.push(doo);
    }

    const r = {
      req: {
        year: year,
        month_id: mont,
        month_name: this.monthArray()[mont],
      },
      res: {
        days_in_month: dom,
        days: dayBbj,
      },
    };

    return r;
  }
  async api(year, month) {
    await this.getData(year, month);
  }
  hideloader() {
    document.getElementById("loading").style.display = "none";
  }
  async getData(year, month) {
    const data = this.monthObject(year, month);
    if (response) {
      // run hidden div if data response
      this.hideloader();
    }
    this.show(data, year, month);
  }
  show(data, year, month) {
    const d = new Date();
    const dy = d.getFullYear();
    const dm = d.getMonth();
    const dt = d.getDate();
    // data from api
    const dat = data.data.days;
    // get first day of month
    const fd = dat.filter((i) => i.date === 1);
    // week days ID .. [0 = sun , .... , 6 = sat]
    const fid = fd[0].wdId;
    // UI start ---> Create main grid
    const container = document.getElementById("mcal");
    container.innerHTML = "";
    const grid = document.createElement("div");
    grid.classList.add("mcal");
    container.appendChild(grid);
    // week days array
    const wkda = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // add week day to 1st row of grid
    for (let i = 0; i < 7; i++) {
      const dwek = document.createElement("div");
      dwek.classList.add("day");
      if (i === 0) {
        dwek.classList.add("sunday");
      }
      dwek.textContent = wkda[i];
      grid.appendChild(dwek);
    }
    // calculate blank cell from first day of month
    const blanks = (fid + 7) % 7;
    // add blank before 1st day of month
    for (let i = 0; i < blanks; i++) {
      const blank = document.createElement("div");
      blank.classList.add("day");
      grid.appendChild(blank);
    }
    // get days in month from backend api
    const dim = dat.map((i) => i.date).length;
    for (let i = 1; i <= dim; i++) {
      const dc = document.createElement("div");
      dc.classList.add("day");
      if (new Date(year, month - 1, i).getDay() === 0) {
        dc.classList.add("sunday");
      }
      // const a = dy + dm + dt;
      // const b = year + (month - 1) + i;
      // if (a === b) {
      //   dc.classList.add("active");
      // }
      dc.textContent = i;
      grid.appendChild(dc);
    }
    const e = blanks + dim;
    let extra;
    if (e <= 35) {
      extra = 35 - e;
    } else if (e > 35) {
      extra = 42 - e;
    } else {
      extra = 0;
    }

    for (let i = 0; i < extra; i++) {
      const ext = document.createElement("div");
      ext.classList.add("day");
      grid.appendChild(ext);
    }
  }
  top() {
    const dt = new Date();
    const yr = dt.getFullYear();
    const mo = dt.getMonth() + 1;
    const dtstr = dt.toDateString();
    setInterval(function () {
      var dt = new Date();
      var dat = dt.toLocaleTimeString();
      document.getElementById("wt").innerHTML = dat;
    }, 1000);
    let v = [];
    for (let i = mo; i <= 12; i++) {
      v.push(i);
    }
    let s = [];
    if (mo !== 1) {
      for (let i = mo - 1; i >= 1; i--) {
        s.push(i);
      }
    }
    const value = [...v, ...s];
    const html = `
            <br><br>
            <div class="top">
               <h1>AMO Calendar V1</h1>
            </div>
            <br><br>
           <div id="loading"></div>
           <div id="form" class="form">
             <input type="number" name="year" value=${yr} id="year" />
              <select name="month" id="month">
              ${value
                .map((i) => {
                  return `
                <option value="${i}">${this.monthArray()[i]}</option>
                `;
                })
                .join("")}
              </select>
              <small id="wt"></small>
              <small>${dtstr}</small>
            </div>
            <div id="mcal"></div>
             `;
    return html;
  }
  event() {
    this._inputElement.addEventListener(
      "change",
      this.handleInputChange.bind(this)
    );
    this._selectElement.addEventListener(
      "change",
      this.handleSelectChange.bind(this)
    );
    this._document.addEventListener(
      "DOMContentLoaded",
      this.handleOnload.bind(this)
    );
    this.render();
    this.top();
  }
  handleInputChange(e) {
    e.preventDefault();
    var year = this._inputElement.value;
    var month = this._selectElement.value;
    setTimeout(async () => {
      await this.api(year, month);
    }, 1000);
  }
  handleSelectChange(e) {
    e.preventDefault();
    var year = this._inputElement.value;
    var month = this._selectElement.value;
    setTimeout(async () => {
      await this.api(year, month);
    }, 1000);
  }
  handleOnload(e) {
    var year = this._inputElement.value;
    var month = this._selectElement.value;
    setTimeout(async () => {
      await this.api(year, month);
    }, 1000);
  }
  render() {
    this._main.innerHTML = this.top();
    this.event();
  }
}

const calendar = new Calendar();
calendar.render();
