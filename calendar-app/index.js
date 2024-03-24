// >>> TO GREGORIAN <<<
function toGregorian(jd) {
  const SG = 2361222; // 2361222-Gregorian start in British calendar (1752/Sep/14)
  var j, jf, y, m, d, h, n, s;
  if (jd < SG) {
    var b, c, f, e;
    j = Math.floor(jd + 0.5);
    jf = jd + 0.5 - j;
    b = j + 1524;
    c = Math.floor((b - 122.1) / 365.25);
    f = Math.floor(365.25 * c);
    e = Math.floor((b - f) / 30.6001);
    m = e > 13 ? e - 13 : e - 1;
    d = b - f - Math.floor(30.6001 * e);
    y = m < 3 ? c - 4715 : c - 4716;
  } else {
    j = Math.floor(jd + 0.5);
    jf = jd + 0.5 - j;
    j -= 1721119;
    y = Math.floor((4 * j - 1) / 146097);
    j = 4 * j - 1 - 146097 * y;
    d = Math.floor(j / 4);
    j = Math.floor((4 * d + 3) / 1461);
    d = 4 * d + 3 - 1461 * j;
    d = Math.floor((d + 4) / 4);
    m = Math.floor((5 * d - 3) / 153);
    d = 5 * d - 3 - 153 * m;
    d = Math.floor((d + 5) / 5);
    y = 100 * y + j;
    if (m < 10) {
      m += 3;
    } else {
      m -= 9;
      y = y + 1;
    }
  }
  jf *= 24;
  h = Math.floor(jf);
  jf = (jf - h) * 60;
  n = Math.floor(jf);
  s = (jf - n) * 60;
  return { year: y, month: m, date: d, hour: h, minute: n, second: s };
}
// >>> END <<<
// >>> TO JULIAN DAY - GREGORIAN <<<
function tojd(year, month, date, hour = 12, minute = 0, second = 0) {
  const SG = 2361222; // 2361222-Gregorian start in British calendar (1752/Sep/14)
  const t2d = (hour - 12) / 24 + minute / 1440 + second / 86400;
  const mof = Math.floor((14 - month) / 12);
  year = year + 4800 - mof;
  month = month + 12 * mof - 3;
  let jd =
    date +
    Math.floor((153 * month + 2) / 5) +
    365 * year +
    Math.floor(year / 4) -
    Math.floor(year / 100) +
    Math.floor(year / 400) -
    32045;
  if (jd < SG) {
    jd =
      date +
      Math.floor((153 * month + 2) / 5) +
      365 * year +
      Math.floor(year / 4) -
      32083;
    if (jd > SG) jd = SG;
  }
  return jd + t2d;
}
// >>> END <<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>> <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
const calander = document.querySelector("#calendar");
const form = document.querySelector("form");
const today = new Date();
const yearNow = today.getFullYear();
const monthNow = today.getMonth();
const dateNow = today.getDate();
// ================================ //
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
const selectValue = [...aftmn, ...bfmn];

setInterval(() => {
  var dt = new Date();
  var dat = dt.toLocaleTimeString();
  document.getElementById("clock").innerHTML = dat;
}, 1000);
// ============================================= //

form.innerHTML = `
<!-- hello -->
<input type="number" name="year" id="year" value=${yearNow} />
<select name="month" id="month">
${selectValue.map((i) => {
  return `
    <option value=${i}>${monthArray[i]}</option>
    `;
})}
            
</select>
<small id="date"></small>
<small id="clock"></small>
`;
// =========================================================================== //

document.getElementById("date").innerHTML = today.toLocaleString("en-US", {
  month: "long",
  day: "2-digit",
  weekday: "short",
});

// CALENDAR BODY >>>> START <<<<<

const yearEl = form.elements.namedItem("year");
const monthEl = form.elements.namedItem("month");
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
// call change event
form.addEventListener("change", () => {
  handler();
});
//handler for on load and change events for calendar body
function handler() {
  const yearValue = yearEl.value;
  const monthValue = monthEl.value;
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeapYear(yearValue)) {
    daysInMonths[1] = 29;
  }

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

  calander.innerHTML = "";
  const grid = document.createElement("div");
  grid.classList.add("cal");
  calander.appendChild(grid);

  for (let i = 0; i < 7; i++) {
    const dwek = document.createElement("div");
    dwek.classList.add("day");
    if (i === 0) {
      dwek.classList.add("sunday");
    }
    dwek.textContent = wkda[i];
    grid.appendChild(dwek);
  }

  const blanks = (fwdId + 7) % 7;

  for (let i = 0; i < blanks; i++) {
    const blank = document.createElement("div");
    blank.classList.add("day");
    grid.appendChild(blank);
  }

  for (let i = 1; i <= dim; i++) {
    const dc = document.createElement("div");
    dc.classList.add("day");
    if (weekDaysIds[i - 1] === 0) {
      dc.classList.add("sunday");
    }
    const a = new Date(yearNow, monthNow, dateNow).getTime();
    const b = new Date(yearValue, monthValue, i).getTime();
    if (a === b && dateNow === i) {
      dc.classList.add("active");
    }
    dc.textContent = i;
    grid.appendChild(dc);
  }

  const e = blanks + dim;
  const getExtraBlanks = e <= 35 ? 35 - e : 42 - e;
  for (let i = 0; i < getExtraBlanks; i++) {
    const ext = document.createElement("div");
    ext.classList.add("day");
    grid.appendChild(ext);
  }
}
handler(); // Call handler

// CALENDAR BODY  >>>> END <<<<<<
