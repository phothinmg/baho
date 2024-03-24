using System;
using System.Collections;
using System.Xml;
using System.Collections.Generic;
using System.Text;
using System.IO;
namespace MyanmarPlanetsnCalendar
{
    public struct MyanmarCalendar
    {

        // Constructor:
        public int Mday;
        public int Myear;
        public int MMon;
        public int typeyear;
        public int typemonth;
        public string MMonth;
        public string HMonth;
        public double My;
        public double aTartday;
        public double Overdays;
        public double Odays;
        public double Firstday;
        public double Marthday;


        // Override the ToString method:

    }
    public class clsPlanetM
    {
        Double PII = 0.0174532925199433;
        Double PIII = 57.2957795130823;
        int a = 0, b = 0;
        Double Result1 = 0;
        Double d = 0;
        Double t = 0;
        Double r0;
        Double x = 0;
        Double t0 = 0;
        Double ut = 0;
        Double sg = 0;
        Double TJd = 0;
        int[,] MCalendar;
        public string CalcTotalDays(int year, int month, int day, int hour, int minute)
        {
            return "Totalday" + Convert.ToString(Totaldays(day, month, year, hour, minute));
        }

        public int Rasi(Double pos)
        {
            int Ra;
            Ra = Convert.ToInt32(Math.Floor(pos));
            Ra = Math.Abs(Ra / 30);
            return Ra;
        }

        public int Degree(Double pos)
        {
            int Deg, Ra;
            Ra = Rasi(pos) * 30;
            Deg = Convert.ToInt32(Math.Floor(pos) - Ra);

            return Deg;

        }

        public int Min(Double pos)
        {
            int Min;
            float m;
            m = Convert.ToSingle(pos - Math.Floor(pos));
            Min = Convert.ToInt32(m * 60);
            return Min;
        }


        public Double Totaldays(int day, int month, int year, int Hour, int Min)
        {

            Double H1 = 0, M1 = 0;
            Double Tim = 0;
            Double Tot = 0, Dj = 0;

            H1 = Convert.ToDouble(Hour);
            M1 = Convert.ToDouble(Min);

            Tim = (H1 + (M1 / 60));

            Dj = julday(year, month, day, Tim, 1);
            Dj -= 2415019.5;
            TJd = Dj;
            //Response.Write(TJd);
            Tot = Dj + 1826554;
            return Tot;
        }

        public Double TotalJdays(int day, int month, int year, int Hour, int Min)
        {

            Double H1 = 0, M1 = 0;
            Double Tim = 0;
            Double Dj = 0;

            H1 = Convert.ToDouble(Hour);
            M1 = Convert.ToDouble(Min);

            Tim = (H1 + (M1 / 60));

            Dj = julday(year, month, day, Tim, 1);
            Dj -= 2415019.5;
            TJd = Dj;
            return TJd;
        }

        public Double julday(int year, int month, int day, Double hour, int gregflag)
        {
            Double jd = 0;
            Double u = 0, u0 = 0, u1 = 0, u2 = 0;
            u = year;
            if (month < 3) u -= 1;
            u0 = u + 4712.0;
            u1 = month + 1.0;
            if (u1 < 4) u1 += 12.0;
            jd = Math.Floor(u0 * 365.25) + Math.Floor(30.6 * u1 + 0.000001) + day + hour / 24.0 - 63.5;
            if (gregflag == 1)
            {
                u2 = Math.Floor(Math.Abs(u) / 100) - Math.Floor(Math.Abs(u) / 400);
                if (u < 0.0) u2 = -u2;
                jd = jd - u2 + 2;
                if ((u < 0.0) && (u / 100 == Math.Floor(u / 100)) && (u / 400 != Math.Floor(u / 400)))
                    jd -= 1;
            }
            return jd;
        }
        public Double MeanSun(Double Totaldays)
        {
            Double Sun2;
            Double sun;
            Sun2 = Totaldays * 0.00273778515163591902835132933170713;
            sun = ((Sun2 - Math.Floor(Sun2)) * 360) - 0.0583333333333333333333333333333333;
            return sun;
        }

        public Double SunPos(Double Totalday)
        {
            Double Sun2;
            Double Sun;
            Double sun;
            sun = MeanSun(Totalday);
            Sun = 77.3 - sun;
            Sun = ChkDeg(Sun);
            Sun = Filter(Sun);
            Sun2 = Pfunction1(Sun, 0.33333333f, 14);
            Sun = sun + (Sun2 * b);
            Sun = ChkDeg(Sun);
            return Sun;
        }
        internal Double Filter(Double Pos)
        {

            if (Pos >= 0 && Pos < 90)
            { a = 1; b = 1; }
            else if (Pos >= 90 && Pos < 180)
            { a = -1; b = 1; Pos = 90 - (Pos % 90); }
            else if (Pos >= 180 && Pos < 270)
            { a = -1; b = -1; Pos = (Pos % 90); }
            else
            { a = 1; b = -1; Pos = 90 - (Pos % 90); }
            Pos = ChkDeg(Pos);
            return Pos;
        }

        public Double ChkDeg(Double Po)
        {
            if (Po <= 0)
                Po = Po + 360;
            else if (Po >= 360)
                Po = Po - 360;
            
            return Po;


        }

        public Double MoonPos(Double Totalday)
        {
            Double Moon1, Moon2, TMoon;
            Double Moon;
            Moon2 = Totalday * 0.0366009781847778197484184835510966;
            TMoon = ((Moon2 - Math.Floor(Moon2)) * 360) - 0.9;
            //-0.978888888888888888888888888888667

            Moon1 = Totalday * 3.09396973237062633656991674473938e-4;
            Moon = ((Moon1 - Math.Floor(Moon1)) * 360) - 4.356388888888888888888888888888 + 90;
            TMoon = CalMoon(Moon, TMoon);
            return TMoon;
        }
        public Double Pfunction1(Double Pos, Double p3, int V)
        {
            Double Res;
            Result1 = V - (p3 * Math.Sin(Pos * PII));
            Res = (Math.Asin(Result1 * (Math.Sin(Pos * PII) / 360))) * PIII;
            return Res;
        }

        public Double Pfunction2(Double Pos, Double p3, Double V, int a)
        {
            Double Q, S, W, U, B, Result;
            Q = p3 * Math.Sin(Pos * PII);
            S = V + Q;
            W = (S * Math.Sin(Pos * PII)) / 360;
            U = (S * Math.Cos(Pos * PII)) / 360;
            B = Math.Sqrt(Math.Pow(W, 2) + Math.Pow((a + U), 2));
            Result = Math.Asin(W / B) * PIII;
            return Result;
        }
        public Double CalMoon(Double MoonP, Double TMoonP)
        {
            Double Pp;
            Double TP;
            Double Re;
            TP = TMoonP;
            Pp = MoonP - TMoonP;
            Pp = ChkDeg(Pp);
            Re = ((Result1 * 790) / 21600) * b;
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 0.3333333f, 32);
            TMoonP = TP + ((Pp) * b);//+Re;
            TMoonP = ChkDeg(TMoonP);
            return TMoonP;
        }

        public Double MarsPos(Double Totalday)
        {
            Double Mar;
            Double Mar1;
            Mar1 = Totalday * 0.00145560938550977573465885195638971;
            Mar = ((Mar1 - Math.Floor(Mar1)) * 360) - 0.0289444444444444444444444444444444 + 1;
            Mar = ChkDeg(Mar);
            Mar = CalMar(Mar, Totalday);
            return Mar;
        }

        public Double JupPos(Double Totalday)
        {
            Double Jup;
            Double Jup1;
            Jup1 = Totalday * 2.30823173131674636228268789165363e-4;
            Jup = ((Jup1 - Math.Floor(Jup1)) * 360) - 0.00458796296296296296296296296296296 - 3;
            Jup = ChkDeg(Jup);
            Jup = Caljup(Jup, Totalday);
            return Jup;
        }

        public Double MercuryPos(Double Totalday)
        {
            Double Mer, Mer1;
            Mer1 = Totalday * 0.0113675501231487448533980313200441;
            Mer = ((Mer1 - Math.Floor(Mer1)) * 360) - 4.241666666666666666666666666666667;
            Mer = ChkDeg(Mer);
            Mer = Calmer(Mer, Totalday);
            return Mer;
        }

        public Double VenusPos(Double Totalday)
        {
            Double Ven, Ven1;
            Ven1 = Totalday * 0.00445040665324176817653650339515652;
            Ven = ((Ven1 - Math.Floor(Ven1)) * 360) - 0.0884953703703703703703703703703704 - 6;
            Ven = ChkDeg(Ven);
            Ven = Calver(Ven, Totalday);
            return Ven;
        }

        public Double SaturnPos(Double Totalday)
        {
            Double Sat;
            Double Sat1;
            Sat1 = Totalday * 9.28869662280030972563420457151968e-5;
            Sat = ((Sat1 - Math.Floor(Sat1)) * 360) + 5.014722222222222222222222222222;
            Sat = ChkDeg(Sat);
            Sat = Calsat(Sat, Totalday);

            return Sat;
        }


        public Double RahuPos(Double Totalday)
        {
            Double Rahu, Rahu1;
            Rahu1 = Totalday * 1.47182569256071552542215145058872e-4;
            Rahu = ((Rahu1 - Math.Floor(Rahu1)) * 360) + 2.41361111111111111111111111111111;
            Rahu = 180 - Rahu;
            Rahu = ChkDeg(Rahu);

            return Rahu;
        }




        public void pProcess()
        {


        }





        public Double CalMar(Double MarP, Double Totalday)
        {
            Double Pp;
            Double CP;
            Double TP;
            Double sun;
            sun = MeanSun(Totalday);
            TP = MarP;
            Pp = sun - MarP;
            CP = MarP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, -3, 235, a);
            MarP = CP + ((Pp / 2) * b);
            MarP = ChkDeg(MarP);
            CP = MarP;
            Pp = 131.005 - MarP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 3, 75);
            MarP = CP + ((Pp / 2) * b);
            MarP = ChkDeg(MarP);
            CP = MarP;
            Pp = 131.005 - MarP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 3, 75);
            MarP = TP + (Pp * b);
            MarP = ChkDeg(MarP);
            CP = MarP;
            Pp = sun - MarP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, -3, 235, a);
            MarP = CP + (Pp * b);
            MarP = ChkDeg(MarP);
            return MarP;
        }

        public Double Calsat(Double satP, Double Totalday)
        {
            Double Pp;
            Double CP;
            Double TP;
            Double sun;
            sun = MeanSun(Totalday);
            TP = satP;
            Pp = sun - satP;
            CP = satP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, 1, 39, a);
            satP = CP + ((Pp / 2) * b);
            CP = satP;
            satP = ChkDeg(satP);
            Pp = 248.633333333333333333333333333333333 - satP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 1, 49);
            satP = CP + ((Pp / 2) * b);
            satP = ChkDeg(satP);
            CP = satP;
            Pp = 248.633333333333333333333333333333333 - satP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 1, 49);
            satP = TP + (Pp * b);
            satP = ChkDeg(satP);
            CP = satP;
            Pp = sun - satP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, 1, 39, a);
            satP = satP + (Pp * b);
            satP = ChkDeg(satP);
            return satP;
        }

        public Double Caljup(Double jupP, Double Totalday)
        {
            Double Pp;
            Double CP;
            Double TP;
            Double sun;
            sun = MeanSun(Totalday);

            TP = jupP;
            Pp = sun - jupP;
            CP = jupP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, 2, 70, a);
            jupP = CP + ((Pp / 2) * b);
            CP = jupP;
            jupP = ChkDeg(jupP);
            Pp = 170.38222222 - jupP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 1, 33);
            jupP = CP + ((Pp / 2) * b);
            jupP = ChkDeg(jupP);
            CP = jupP;
            Pp = 170.38222222 - jupP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 1, 33);
            jupP = TP + (Pp * b);
            jupP = ChkDeg(jupP);
            CP = jupP;
            Pp = sun - jupP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, 2, 70, a);
            jupP = jupP + (Pp * b);
            jupP = ChkDeg(jupP);
            return jupP;
        }

        public Double Calmer(Double merP, Double Totalday)
        {
            Double Pp;
            Double CP;
            Double TP;

            Double sun;
            sun = MeanSun(Totalday);

            TP = merP;
            Pp = merP - sun;
            CP = merP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, -1, 133, a);
            merP = sun + ((Pp / 2) * b);
            CP = merP;
            merP = ChkDeg(merP);
            Pp = 233.46 - merP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 2, 30);
            merP = CP + ((Pp / 2) * b);
            merP = ChkDeg(merP);
            CP = merP;
            Pp = 233.46 - merP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 2, 30);
            merP = sun + (Pp * b);
            merP = ChkDeg(merP);
            CP = merP;
            Pp = TP - merP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, -1, 133, a);
            merP = merP + (Pp * b);
            merP = ChkDeg(merP);
            return merP;
        }


        public Double Calver(Double verP, Double Totalday)
        {
            Double Pp;
            Double CP;
            Double TP;
            Double sun;
            sun = MeanSun(Totalday);

            TP = verP;
            Pp = verP - sun;
            CP = verP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, -2, 262, a);
            verP = sun + ((Pp / 2) * b);
            CP = verP;
            verP = ChkDeg(verP);
            Pp = 77.8713888888888888888888888888889 - verP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 1, 12);
            verP = CP + ((Pp * b) / 2);
            verP = ChkDeg(verP);
            CP = verP;
            Pp = 77.8713888888888888888888888888889 - verP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction1(Pp, 1, 12);
            verP = sun + (Pp * b);
            verP = ChkDeg(verP);
            CP = verP;
            Pp = TP - verP;
            Pp = ChkDeg(Pp);
            Pp = Filter(Pp);
            Pp = Pfunction2(Pp, -2, 262, a);
            verP = verP + (Pp * b);
            verP = ChkDeg(verP);
            return verP;
        }

        public Double Aryana(Double Totalday)
        {
            Double Ar, Ar1;
            Ar1 = (Totalday - 1826554) / 365.2422;
            if (Ar1 <= 0)
                Ar = (0.015 * (Ar1 * -1)) - 22.3307;
            else
                Ar = 22.3307 + (0.015 * Ar1);
            return Ar;
        }

        public Double Laga(Double LoDeg, Double LaDeg, Double Std_T, int day, int month, int Year, int H, int M)
        {
            Double D_T, LS_T, r, r1, Co, MC, z, Lag, Dj;
            Double H1, M1;
            Double Totalday = 0.0;
            Totalday = Totaldays(day, month, Year, H, M);
            Dj = Aryana(Totalday);
            Totalday = (Totalday - 1826554);// 365.2422;
            H1 = H;
            M1 = M;
            D_T = H1 + (M1 / 60);

            Double dj;
            TJd = TotalJdays(day, month, Year, H, M);
            dj = Convert.ToInt64(TJd - 0.5) + 0.5;
            d = dj;
            t = (d / 36525.0) - 1;
            r0 = t * (5.13366e-2 + t * (2.586222e-5 - t * 1.722e-9));
            r1 = 6.697374558 + 2400.0 * (t - ((Year - 2000.0) / 100.0));
            x = r0 + r1;
            x = filt(x);
            t0 = x;
            x = (D_T - Std_T);
            x = filt(x);
            ut = x;
            t = t0;
            if (d == 1) t = t - 6.57098244e-2;
            else if (d == -1) t = t + 6.57098244e-2;
            x = (ut * 1.002737908) + t;
            x = filt(x);
            sg = x;
            x = sg + (LoDeg / 15.0);
            x = filt(x);
            x = filt(x);

            LS_T = x;

            if (Std_T < 0) LS_T = LS_T + 12;
            if (LS_T > 24) LS_T = LS_T - 24;
            r = 15 * LS_T;
            r1 = (r / 90);
            if (r1 > 1) r1 = r1 - 1.0;
            r1 = r1 * 180.0;
            Co = Math.Cos(23.45 * PII);
            MC = Math.Atan(Math.Tan(r * PII) * (1 / Co)) * PIII;
            MC = MC + r1 - Dj;
            if (MC < 0)
                MC = MC + 360;
            else if (MC >= 360)
                MC = MC - 360;


            z = Math.Sqrt(1 - Co * Co);
            Lag = z * (Math.Tan(LaDeg * PII) / Math.Cos(r * PII)) + Co * Math.Tan(r * PII);
            Lag = 90.0 + (Math.Atan(Lag) * PIII);
            if (r <= 90.0 || r >= 270.0)
                Lag = Lag;
            else
                Lag = Lag + 180.0;

            Lag = Lag - Dj;
            if (Lag < 0) Lag = Lag + 360.0;
            if (LaDeg < 0)
            {
                if (Lag < 180.0) Lag += 180.0;
                if (Lag > 180.0) Lag -= 180.0;
            }
            return Lag;
        }

        public Double MC(Double LoDeg, Double LaDeg, Double Std_T, int day, int month, int Year, int H, int M)
        {
            Double D_T, LS_T, r, r1, Co, MC, Dj;
            Double H1, M1;
            Double dj;
            Double Totalday;
            Totalday = Totaldays(day, month, Year, H, M);
            Dj = Aryana(Totalday);
            Totalday = (Totalday - 1826554); // 365.2422;
            H1 = H;
            M1 = M;
            D_T = H1 + (M1 / 60);



            dj = Totalday;
            d = dj;
            t = (d / 36525.0) - 1;
            r0 = (5.13366e-2 * t) + (2.586222e-5 * (t * t)) - ((t * t * t) * 1.722e-9);
            r1 = 6.697374558 + 2400.0 * (t - ((Year - 2000.0) / 100.0));
            x = r0 + r1;
            x = filt(x);
            t0 = x;
            x = (D_T - Std_T);
            x = filt(x);
            ut = x;
            t = t0;
            if (d == 1) t = t - 6.57098244e-2;
            else if (d == -1) t = t + 6.57098244e-2;
            x = (ut * 1.002737908) + t;
            x = filt(x);
            sg = x;
            x = sg + (LoDeg / 15.0);
            x = filt(x);
            x = filt(x);
            LS_T = x;
            if (Std_T < 0) LS_T = LS_T + 12;
            if (LS_T > 24) LS_T = LS_T - 24;

            r = 15 * LS_T;
            r1 = Math.Floor(r / 90);
            if (r1 > 1) r1 = r1 - 1;
            r1 = r1 * 180;
            Co = Math.Cos(23.45 * PII);
            MC = Math.Atan(Math.Tan(r * PII) * (1 / Co)) * PIII;
            MC = MC + r1 - Dj;
            if (MC < 0)
                MC = MC + 360;
            else if (MC >= 360)
                MC = MC - 360;

            return MC;
        }

        public Double[] GenBawa(Double Asc, Double MC)
        {
            Double NC, NC1;
            Double[] Bawa = new Double[24];
            NC = (MC + 180) - Asc;

            if (NC < 0)
                NC += 360;
            else if (NC >= 360)
                NC -= 360;
            NC = NC / 6;
            NC1 = 30 - NC;
            Bawa[0] = Asc;

            for (int c = 0; c <= 6; c++)
            {
                Bawa[c + 1] = Bawa[c] + NC;
                if (Bawa[c + 1] >= 360)
                    Bawa[c + 1] -= 360;
            }

            Bawa[7] = Bawa[6] + NC1;
            if (Bawa[7] >= 360)
                Bawa[7] -= 360;

            for (int d = 1; d <= 5; d++)
            {
                Bawa[7 + d] = Bawa[6 + d] + NC1;
                if (Bawa[7 + d] >= 360)
                    Bawa[7 + d] -= 360;
            }

            for (int e = 0; e <= 11; e++)
            {
                Bawa[12 + e] = Bawa[e] + 180;
                if (Bawa[12 + e] >= 360)
                    Bawa[12 + e] -= 360;
            }
            return Bawa;
        }

        public int Bawa(Double m_Laga, Double m_MC, Double Pos)
        {
            int Posw;
            Double[] Bawa = new Double[24];
            Bawa = GenBawa(m_Laga, m_MC);
            Reset:
            if (Pos > Bawa[23] && Pos <= Bawa[1])
                Posw = 0;
            else if (Pos > Bawa[1] && Pos <= Bawa[3])
                Posw = 1;
            else if (Pos > Bawa[3] && Pos <= Bawa[5])
                Posw = 2;
            else if (Pos > Bawa[5] && Pos <= Bawa[7])
                Posw = 3;
            else if (Pos > Bawa[7] && Pos <= Bawa[9])
                Posw = 4;
            else if (Pos > Bawa[9] && Pos <= Bawa[11])
                Posw = 5;
            else if (Pos > Bawa[11] && Pos <= Bawa[13])
                Posw = 6;
            else if (Pos > Bawa[13] && Pos <= Bawa[15])
                Posw = 7;
            else if (Pos > Bawa[15] && Pos <= Bawa[17])
                Posw = 8;
            else if (Pos > Bawa[17] && Pos <= Bawa[19])
                Posw = 9;
            else if (Pos > Bawa[19] && Pos <= Bawa[21])
                Posw = 10;
            else if (Pos > Bawa[21] && Pos <= Bawa[23])
                Posw = 11;
            else
            {
                for (int hh = 0; hh <= 23; hh++)
                {
                    if (Bawa[hh] < 60)
                        Bawa[hh] += 360;
                    if (Pos < 60)
                        Pos += 360;
                }
                goto Reset;
            }

            for (int dd = 0; dd <= 23; dd++)
            {
                if (Bawa[dd] >= 360)
                    Bawa[dd] -= 360;
                if (Pos >= 360)
                    Pos -= 360;
            }
            //Response.Write(Posw+",");
            Posw += Convert.ToInt32(Math.Floor(Bawa[0] / 30));
            if (Posw >= 12)
                Posw -= 12;
            return Posw;
        }
        
        public int Nawin(Double Pos)
        {
            Double Na;
            int Naw = 0, N;

            N = Convert.ToInt32(Math.Floor(Pos / 30));

            Na = Pos - (N * 30);
            if (Na >= 0 && Na <= 3.333333)
                Naw = 0;
            else if (Na > 3.3333333 && Na <= 6.6666666)
                Naw = 1;
            else if (Na > 6.6666666 && Na <= 10)
                Naw = 2;
            else if (Na > 10 && Na <= 13.3333333)
                Naw = 3;
            else if (Na > 13.3333333 && Na <= 16.6666666)
                Naw = 4;
            else if (Na > 16.6666666 && Na <= 20)
                Naw = 5;
            else if (Na > 20 && Na <= 23.33333333)
                Naw = 6;
            else if (Na > 23.3333333 && Na <= 26.6666666)
                Naw = 7;
            else if (Na > 26.6666666 && Na <= 30)
                Naw = 8;

            //Response.Write(N);
            switch (N)
            {
                case 0:
                    //Response.Write("Hello");
                    
                    break;
                case 1:

                    Naw += 9;
                    break;
                case 2:
                    Naw += 6;
                    break;
                case 3:
                    Naw += 3;
                    break;
                case 4:
                    
                    break;
                case 5:
                    Naw += 9;
                    break;
                case 6:
                    Naw += 6;
                    break;
                case 7:
                    Naw += 3;
                    break;
                case 8:
                    
                    break;
                case 9:
                    Naw += 9;
                    break;
                case 10:
                    Naw += 6;
                    break;
                case 11:
                    Naw += 3;
                    break;
            }

            if (Naw > 11)
                Naw -= 12;
            //Response.Write(Naw+",");
            return Naw;
        }

        
        public int SunTransist(int Year, Double Total)
        {
            Double Tinkan, Kali, C;
            int Nyear = 0;
            Tinkan = Totaldays(31, 12, (Year - 1), 0, 0);
            Kali = Year + 3101;
            C = (Kali - (Tinkan / 365.2587565)) * 365.2587565;
            C += Tinkan;
            if (Total < C)
                Nyear = 0;
            else if (Total >= C)
                Nyear = 1;
            return Nyear;
        }



        internal Double filt(Double x)
        {
            for (int a = 0; a < 100; a++)
            {

                if (x <= -1.0)
                {
                    x += 24.0;
                    d = -1;
                }
                else if (x >= 24.0)
                {
                    x -= 24.0;
                    d = 1;
                }
                else
                {
                    x = x;
                    a = 101;
                }


            }
            return x;
        }
        private  void LoadXMLArray()
        {
            System.IO.StreamReader sr = new StreamReader(AppDomain.CurrentDomain.BaseDirectory   + @"caldata.xml");
            System.Xml.XmlTextReader xr = new System.Xml.XmlTextReader(sr);
            System.Xml.XmlDocument calDoc = new System.Xml.XmlDocument();
            calDoc.Load(xr);
            System.Xml.XmlNodeList calNod = calDoc.SelectNodes("MyanmarCalendar/Year");
            
            int oday = 0;
            int caloday =0;
            int TypeYear = 0;
            clsPlanetM pl = new clsPlanetM();
            MCalendar =new int[calNod.Count ,2];
            for (int x = 0; x < calNod.Count; x++)
            {
                System.Xml.XmlNode Year = calNod.Item(x).SelectSingleNode("EYear");
                System.Xml.XmlNode Oday = calNod.Item(x).SelectSingleNode("ODay");
                System.Xml.XmlNode TYear = calNod.Item(x).SelectSingleNode("Typeofyear");
                oday = Convert.ToInt32(Oday.InnerText);
                TypeYear = Convert.ToInt32(TYear.InnerText);
                caloday = pl.OverDays(1, 6, Convert.ToInt32(Year.InnerText));
                MCalendar[x, 0] = oday;
                MCalendar[x, 1] = TypeYear;

                
            }
        }
        

        
        public string Gen9200(int day, int month, int Year,  ref MyanmarCalendar mr)
        {
            String NameHm = "";
            int ResD = 1;
            String NameMo = "";
            int ResY = 1300;
            int MMM = 0, MMY = 0;
            int MDay = 0;
            int TmpMo = 0;
            Double My = 0, aTartday = 0, Overdays = 0, Odays = 0, Firstday = 0, Marthday = 0;
            int Y = 0, total = 0, Mo = 0;
            int[] Cyear ={ 0, 30, 61, 91, 122, 153, 183, 214, 244, 275, 306, 334 };
            int[] SMyear ={ 0, 28, 58, 87, 117, 146, 176, 205, 235, 264, 294, 323, 353, 382, 410 };
            int[] DMyear ={ 0, 28, 58, 87, 117, 147, 176, 206, 235, 265, 294, 324, 353, 382, 410 };
            int[] DDMyear ={ 0, 28, 58, 88, 118, 148, 177, 207, 236, 266, 295, 325, 354, 383, 411 };
            int[] S ={ 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30 };
            int[] D ={ 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30 };
            int[] DD ={ 29, 30, 30, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30 };
            String[] SMon ={ "wefcl;", "uqkef", "e,kef", "0gqdk", "0gacgif", "awmfovif;", "oDwif;uRwf", "wefaqmifrkef;", "ewfawmf", "jymodk", "wydkUwGJ", "waygif;", "wefcl;", "uqkef" };
            String[] DMon ={ "wefcl;", "uqkef", "e,kef", "y-0gqdk", "'k-0gqdk", "0gacgif", "awmfovif;", "oDwif;uRwf", "wefaqmifrkef;", "ewfawmf", "jymodk", "wydkUwGJ", "waygif;", "wefcl;" };
            LoadXMLArray();
            double Tot = Totaldays(day, month, Year, 0, 0);
            if ((Year % 4 == 0) && (Year % 100 != 0) || Year % 400 == 0) Cyear[11] = 335;
            Y = Year - 1899;
            month -= 4;
            
            if (month < 0)
            {
                
                month += 12;
                Year--;
                Y--;
            }

            My = Year + 3101;
            aTartday = Math.Floor((My * 365.2587565));
            Odays = My * 11.06483;
            Overdays = Math.Floor((Odays / 30.0) + 0.5);

            Firstday = aTartday - Overdays;
            Marthday = Math.Floor(Totaldays(31, 3, Year, 0, 0));

            total = MCalendar[Y,0]+ Cyear[month] + day;
            TmpMo = total;
            Mo = month;
            //if (total < 0) Mo = month - 1;
            //if (Mo < 0) Mo += 12;

            MMY = MCalendar[Y, 1];
            if (MCalendar[Y,1] == 0)
            {

                total -= SMyear[month];
                if (total > S[month])
                {
                    total -= S[month];
                    month++;
                    if (month >= 12) month -= 12;
                    Mo = month;
                }
                NameMo = SMon[Mo];
                MDay = S[Mo] - 15;
            }
            else if (MCalendar[Y, 1] == 1)
            {
                total -= DMyear[month];
                if (total > D[month])
                {
                    total -= D[month];
                    month++;
                    if (month >= 12) month -= 12;
                    Mo = month;
                }
                MDay = D[Mo] - 15;
            }
            else
            {
                total -= DDMyear[month];
                if (total > DD[month])
                {
                    total -= DD[month];
                    month++;
                    if (month > 12) month -= 12;
                    Mo = month;
                }
                MDay = DD[Mo] - 15;
            }
            MMM = Mo;
            if (SunTransist(Year, Tot) == 1)
                ResY = Year - 638;
            else if (SunTransist(Year, Tot) == 0)
                ResY = Year - 639;

            ResD = total;

            if (ResD <= 0)
            {
                Mo--;
                if (Mo < 0) Mo += 12;
                if (MCalendar[Y,1] == 0) ResD += S[Mo];
                else if (MCalendar[Y,1]== 1) ResD += D[Mo];
                else ResD += DD[Mo];
            }

            if (ResD > 15)
            {
                ResD -= 15;
                NameHm = "vjynfhausmf";
                if (ResD == MDay)
                    mr.typemonth = 3;
                else
                    mr.typemonth = 2;
            }
            else if (ResD == 15)
            {
                ResD = ResD;
                NameHm = "vjynfh";
                mr.typemonth = 1;
            }
            else
            {
                ResD = ResD;
                NameHm = "vqef;";
                mr.typemonth = 0;
            }

            if (MCalendar[Y,1] == 0)
                NameMo = SMon[Mo];
            else
                NameMo = DMon[Mo];

            if (Mo == 11 && ResD == 14 && mr.typemonth==3)
            {
                NameHm = "vjynfhausmf";
                mr.typemonth = 2;
            }
            else if (Mo == 11 && ResD == 15 && mr.typemonth==2 )
            {
                NameHm = "vqef;";
                mr.typemonth = 3;
            }


            mr.MMon = Mo;
            mr.HMonth = NameHm;
            mr.Mday = ResD;
            mr.MMonth = NameMo;
            mr.Myear = ResY;
            mr.typeyear = MMY;
            mr.aTartday = aTartday;
            mr.Firstday = Firstday;
            mr.Odays = Odays;
            mr.Overdays = Overdays;
            mr.Marthday = Marthday;

            return Convert.ToString(ResD) + " " + NameMo + NameHm + " " + Convert.ToString(ResY);
        }
        public int OverDays(int day, int month, int Year)
        {
            int Tyear=Math.Abs(Year);
	        double My,aTartday,Overdays,Odays,Firstday,Marthday;
            double Tot=Totaldays(day,month,Year,0,0);
            int[] Cyear={0,30,61,91,122,153,183,214,244,275,306,334};
            int Zy = 0;
	        int[] SMyear={-1,28,58,87,117,146,176,205,235,264,294,323,353,382,411,441};
	        int[] DMyear={-1,28,58,87,117,147,176,206,235,265,294,324,354,383,412,442};
            int[] DDMyear ={ -1, 28, 58, 88, 118, 148, 177, 207, 236, 266, 295, 325, 355, 384, 413, 44 };
            if ((Tyear % 4 == 0) && (Tyear % 100 != 0) || Tyear % 400 == 0)
                Cyear[11] = 335;
            month -= 4;
            if (month < 0)
            {
                month += 12;
                if (Year <= 0)
                    Year++;
                else
                    Year--;

            }
            if (Year == 0)
                Year = -1;
            Tyear = Year;
            if (Tyear <= -1)
                Year++;
            My = Year + 3101;
            aTartday = Math.Floor((My * 365.2587565));
            Odays = My * 11.06483334;
            Overdays = Math.Floor(Odays % 30.0);

            Firstday = aTartday - Overdays;
            Marthday = Math.Floor(Totaldays(31, 3, Tyear, 0, 0));
            Zy = Convert.ToInt32(Math.Floor((Marthday - Firstday)));

            return Zy;
        }
        public MyanmarCalendar SuraMyear(int day, int month, int Year,int Wa)
        {
            MyanmarCalendar mr = new MyanmarCalendar();
        	
	        String NameHm;
	        int ResD;
	        String NameMo;
	        int ResY=0;
            int Tyear=0 ;
	        int MMM,MMY;
            int MDay; 
	        double My,aTartday,Overdays,Odays,Firstday,Marthday;
	        int total,Mo;
	        int[] Cyear={0,30,61,91,122,153,183,214,244,275,306,334};
	        int Zy=0;
	        int[] SMyear={-1,28,58,87,117,146,176,205,235,264,294,323,353,382,411,441};
	        int[] DMyear={-1,28,58,87,117,147,176,206,235,265,294,324,354,383,412,442};
	        int[] DDMyear={-1,28,58,88,118,148,177,207,236,266,295,325,355,384,413,443};
	        int[] S={29,30,29,30,29,30,29,30,29,30,29,30};
	        int[] D={29,30,29,30,30,29,30,29,30,29,30,29,30};
	        int[] DD={29,30,30,30,30,29,30,29,30,29,30,29,30};
	        String[] SMon={"wefcl;","uqkef","e,kef","0gqdk","0gacgif","awmfovif;","oDwif;uRwf","wefaqmifrkef;","ewfawmf","jymodk","wydkUwGJ","waygif;","wefcl;","uqkef","e,kef"};
	        String[] DMon={"wefcl;","uqkef","e,kef","y-0gqdk","'k-0gqdk","0gacgif","awmfovif;","oDwif;uRwf","wefaqmifrkef;","ewfawmf","jymodk","wydkUwGJ","waygif;","wefcl;","uqkef"};
            double Tot = Totaldays(day, month, Year, 0, 0);
	        Tyear=Math.Abs (Year);
	        if ((Tyear%4==0)&&(Tyear%100!=0)||Tyear%400==0)
		        Cyear[11]=335;
	        month-=4;
	        if(month<0)	{
		        month+=12;
		        if(Year<=0)
			        Year++;
		        else
			        Year--;
        		
	        }
	        if(Year==0)
		        Year=-1;
	        Tyear=Year;
	        if(Tyear<=-1)
		        Year++;

	        My=Year+3101;
	        aTartday=Math.Floor ((My*365.2587565));
	        Odays=My*11.06483;
            Overdays = Math.Floor(Odays % 30.0);
        	
	        Firstday=aTartday-Overdays;
            Marthday = Math.Floor(Totaldays(31, 3, Tyear, 0, 0));
            Zy = Convert.ToInt32(Math.Floor((Marthday - Firstday)));
            //Zy = OverDays(day, month, Year);
        	
	        total=Zy+Cyear[month]+day;

	        Mo=month;
        //	if(total<0) Mo=month-1;
        //	if (Mo<0)Mo+=12;

	        MMY=Wa;
        //	int La;
	        if(Wa==0)
	        {
        		
		        total-=SMyear[month];
		        if(total>S[month])
		        {
			        total-=S[month];
			        month++;
			        if(month>12)month-=12;
			        Mo=month;
		        }
                MDay = S[month] - 15;
        		
	        }
	        else if(Wa==1)
	        {
		        total-=DMyear[month];
		        if(total>D[month])
		        {
			        total-=D[month];
			        month++;
			        if(month>12)month-=12;
			        Mo=month;
		        }
                MDay = D[month] - 15;
	        }
	        else
	        {
		        total-=DDMyear[month];
		        if(total>DD[month])
		        {
			        total-=DD[month];
			        month++;
			        if(month>12)month-=12;
			        Mo=month;
		        }
                MDay = DD[month] - 15;
	        }
	        MMM=Mo;
	        if(SunTransist(Year,Tot)==1)
		        ResY=Year-638;
	        else if(SunTransist(Year,Tot)==0)
		        ResY=Year-639;
        	
	        ResD=total;
	        if(ResD<=0){
		        Mo--;
		        if(Mo<0)Mo+=12;
		        if(Wa==0) ResD+=S[Mo];
		        else if(Wa==1) ResD+=D[Mo];
		        else ResD+=DD[Mo];
	        }
	        if(ResD>15)
	        {
		        ResD-=15;
		        NameHm="vjynfhausmf";
	        }
	        else if(ResD==15)
	        {
		        ResD=ResD;
		        NameHm="vjynfh";
	        }
	        else
	        {
		        ResD=ResD;
		        NameHm="vqef;";
	        }
	        int Yres;

	        Yres=ResY;

	        if(Wa==0)
		        NameMo=SMon[Mo];
	        else
		        NameMo=DMon[Mo];
        	

	        if(Yres<639)
	        ResY+=3739;
            mr.MMon = Mo;
	        mr.HMonth =NameHm;
	        mr.Mday =ResD;
	        mr.MMonth =NameMo;
	        mr.Myear =ResY;
	        mr.typeyear =MMY;
	        mr.aTartday =aTartday;
	        mr.Firstday =Firstday;
	        mr.Odays =Odays;
	        mr.Overdays =Overdays;
	        mr.Marthday =Marthday;
        	
	        return  mr;		
        }


        
        public string CalcDay(int day, int month, int year)
        {
            String[] Ns ={ "", "we*FaEG", "wevFm", "t*Fg", "Ak'¨[l;", "Mumomyaw;", "aomMum", "pae" };
            Double TJd1 = TotalJdays(day, month, year, 0, 0);

            Double JJD = (TJd1 - 0.5) + 2415020;

            int B = Convert.ToInt32(Math.Floor(((JJD + 1.5) / 7)) * 7);

            int I = Convert.ToInt32((JJD + 1.5 - B) + 1);


            if (I > 7) I -= 7;
            return Ns[I];
        }
        
        public int CalcDayInt(int day, int month, int year)
        {
            String[] Ns ={ "", "we*FaEG", "wevFm", "t*Fg", "Ak'¨[l;", "Mumomyaw;", "aomMum", "pae" };
            Double TJd1 = TotalJdays(day, month, year, 0, 0);

            Double JJD = (TJd1 - 0.5) + 2415020;

            int B = Convert.ToInt32(Math.Floor(((JJD + 1.5) / 7)) * 7);

            int I = Convert.ToInt32((JJD + 1.5 - B) + 1);


            if (I >= 7) I -= 7;
            return I;
        }
    }
    

}
