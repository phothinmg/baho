export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = MS_IN_SECOND * 60;
export const MS_IN_HOUR = MS_IN_MINUTE * 60;
/**
 * Milliseconds in one Solar Day.
 * ------------------------------
 * 24 * 360000
 */
export const MS_IN_SOLAR_DAY = MS_IN_HOUR * 24;
export const MS_IN_SOY = MS_IN_SOLAR_DAY * 365;
export const MS_OF_LEAP_IN_SOY = 0.25 * MS_IN_SOLAR_DAY;

/** 
 * Milliseconds in one Sidereal Day.
 * --------------------------------
 * 
A sidereal day on Earth is approximately 86164.0905 seconds (23 h 56 min 4.0905 s or 23.9344696 h). 
(Seconds are defined as per International System of Units and are not to be confused with ephemeris seconds.) 
Each day, **the sidereal time at any given place and time will be about four minutes shorter than local civil time 
(which is based on solar time)**, so that for a complete year the number of sidereal "days" is one more than 
the number of solar days.

https://en.wikipedia.org/wiki/Sidereal_time#:~:text=A%20sidereal%20day%20on,number%20of%20solar%20days.

23 hr 56 minutes , 4 minutes less than solar day.

23 * 360000 + 56 * 6000 = 8616000 , 23.9344696 h * 360000 = 8616409.056(23 h 56 min 4.0905 s).
 */
export const MS_IN_SIDEREAL_DAY = 8616000; // 23 * MS_IN_HOUR + 56 * MS_IN_MINUTE
export const SRD_OWN_LEAP = 409.056;


