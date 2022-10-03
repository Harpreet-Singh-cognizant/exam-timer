import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

import moment from "moment";
import background from "../assets/images/bg-stars.svg";
import background_2 from "../assets/images/pattern-hills.svg";
import { ReactComponent as Gear } from "../assets/images/icon-gear.svg";
import { ReactComponent as Love } from "../assets/images/heart.svg";
import ModalComponent from "./modal";

const Main = (props) => {
  const storedDateValue = String(localStorage.getItem("newDate"));
  const [newDate, setNewData] = useState(
    storedDateValue ? storedDateValue : props.date
  );
  const [theme, setTheme] = useState(false);
  const [animateDay, setAnimateDay] = useState(false);
  const [animateHrs, setAnimateHrs] = useState(false);
  const [animateMin, setAnimateMin] = useState(false);
  const [animateSec, setAnimateSec] = useState(false);
  const [childData, setChildData] = useState("");
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    cD: "",
    countdownHours: "",
    cH: "",
    countdownMinutes: "",
    cM: "",
    countdownSeconds: "",
    cS: "",
  });

  const location = useLocation();

  useEffect(() => {
    countdownTimer();
    if (location && theme === true) {
      setNewData(props.date);
      window.location.reload(false);
    }

    Aos.init({ duration: 1000 });
  }, [location]);

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(newDate).getTime();
      const currentTime = new Date().getTime();

      if (countdownDateTime < currentTime) {
        const remainingDayTime = currentTime - countdownDateTime;
        const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(
          (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const totalMinutes = Math.floor(
          (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
        );

        const totalSeconds = Math.floor(
          (remainingDayTime % (1000 * 60)) / 1000
        );
        const runningCountdownTime = {
          countdownDays: ("0" + totalDays).slice(-3),
          cD: ("0" + (totalDays + 1)).slice(-3),
          countdownHours: ("0" + totalHours).slice(-2),
          cH: ("0" + (totalHours + 1)).slice(-2),
          countdownMinutes: ("0" + totalMinutes).slice(-2),
          cM: ("0" + (totalMinutes + 1)).slice(-2),
          countdownSeconds:
            totalSeconds === 60 ? "00" : ("0" + totalSeconds).slice(-2),
          cS: totalSeconds === 59 ? "00" : ("0" + (totalSeconds + 1)).slice(-2),
        };
        setCountdownTime(runningCountdownTime);
        if (remainingDayTime < 0) {
          clearInterval(timeInterval);
          //setExpiryTime(false);
        }
      } else {
        const remainingDayTime = countdownDateTime - currentTime;

        const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(
          (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const totalMinutes = Math.floor(
          (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
        );

        const totalSeconds = Math.floor(
          (remainingDayTime % (1000 * 60)) / 1000
        );

        const runningCountdownTime = {
          countdownDays: ("0" + totalDays).slice(-3),
          cD: ("0" + (totalDays + 1)).slice(-3),
          countdownHours: ("0" + totalHours).slice(-2),
          cH: ("0" + (totalHours + 1)).slice(-2),
          countdownMinutes: ("0" + totalMinutes).slice(-2),
          cM: ("0" + (totalMinutes + 1)).slice(-2),
          countdownSeconds: ("0" + totalSeconds).slice(-2),
          cS: totalSeconds === 59 ? "00" : ("0" + (totalSeconds + 1)).slice(-2),
        };

        setCountdownTime(runningCountdownTime);
        if (remainingDayTime < 0) {
          clearInterval(timeInterval);
          //   setExpiryTime(false);
        }
      }
    }, 1000);
    return () => clearInterval(timeInterval);
  };

  useEffect(() => {
    localStorage.setItem("newDate", String(newDate));
  }, [newDate]);

  useEffect(() => {
    if (childData) {
      const newTime = moment(JSON.stringify(childData).replace(/[ZT"]/g, " "))
        .add(17.5, "hours")
        .format("DD MMM YYYY h:mm:ss");
      setNewData(newTime);
      console.log("raw", childData);
      console.log("new", newTime);
      window.location.reload(false);
    }
  }, [childData]);

  const cards = [
    [countdownTime.countdownDays, countdownTime.cD, "Days", 1000],
    [countdownTime.countdownHours, countdownTime.cH, "Hours", 1500],
    [countdownTime.countdownMinutes, countdownTime.cM, "Minutes", 2000],
    [countdownTime.countdownSeconds, countdownTime.cS, "Seconds", 2500],
  ];
  const count0 = useCallback(() => {
    setAnimateDay(!animateDay);
  }, [countdownTime.countdownDays]);
  const count1 = useCallback(() => {
    setAnimateHrs(!animateHrs);
  }, [countdownTime.countdownHours]);
  const count2 = useCallback(() => {
    setAnimateMin(!animateMin);
  }, [countdownTime.countdownMinutes]);
  const count3 = useCallback(() => {
    setAnimateSec(!animateSec);
  }, [countdownTime.countdownSeconds]);

  return (
    <section
      className={`main_section main_section${props.theme}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <Link
        to={props.theme ? "/" : "/alt"}
        onClick={() => {
          setTheme(true);
        }}
      >
        <button data-aos="fade-up" className="settings">
          <Gear />
        </button>
      </Link>

      <Link
        to="/lov"
        onClick={() => {
          setTheme(true);
        }}
      >
        <button className="loveIcon">
          <Love className="love" />
        </button>
      </Link>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="main_area"
        style={{ backgroundImage: `url(${background_2})` }}
      >
        <div className="conatiner">
          <div className="row">
            <div className="col">
              <div className="timer_area flexie">
                <div className="message_area">
                  {props.theme === "_light" ? (
                    <p className="main_text">Second Timer</p>
                  ) : props.theme === "_love" ? (
                    <p className="main_text">Third Timer</p>
                  ) : (
                    <p className="main_text">First timer </p>
                  )}
                </div>
                <div className="counter_area">
                  <div className="row">
                    {cards.map((i, k) => {
                      return (
                        <div className="col-3" key={k}>
                          <div
                            data-aos="fade-up"
                            date-aos-delay="3000"
                            data-aos-duration={`${i[3]}`}
                            className="flip_card"
                          >
                            <div
                              className="card_area card_area_fixed"
                              ref={
                                k === 0
                                  ? count0
                                  : k === 1
                                  ? count1
                                  : k === 2
                                  ? count2
                                  : k === 3
                                  ? count3
                                  : null
                              }
                            >
                              <div className="upper_card ">
                                <span className={`count count_${k}`}>
                                  {k === 3 ? i[1] : i[0]}
                                </span>
                              </div>
                              <div className="lower_card">
                                <span className={`count count_${k}`}>
                                  {i[0]}
                                </span>
                              </div>
                              <p
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="time"
                              >
                                {i[2]}
                              </p>
                            </div>
                            <div className="card_area card_area_animated">
                              <div
                                className={
                                  k === 0 && animateDay
                                    ? "upper_card upper_card_animate"
                                    : k === 1 && animateHrs
                                    ? "upper_card upper_card_animate"
                                    : k === 2 && animateMin
                                    ? "upper_card upper_card_animate"
                                    : k === 3 && animateSec
                                    ? "upper_card upper_card_animate"
                                    : "upper_card"
                                }
                              >
                                <span className="count">
                                  {k === 2 ? i[1] : i[0]}
                                </span>
                              </div>
                              <div
                                className={
                                  k === 0 && animateDay
                                    ? "lower_card lower_card_animate"
                                    : k === 1 && animateHrs
                                    ? "lower_card lower_card_animate"
                                    : k === 2 && animateMin
                                    ? "lower_card lower_card_animate"
                                    : k === 3 && animateSec
                                    ? "lower_card lower_card_animate"
                                    : "lower_card"
                                }
                              >
                                <span className="count">
                                  {k === 3 || k === 2 ? i[1] : i[0]}
                                </span>
                              </div>
                            </div>
                            <div className="card_area card_area_animated">
                              <div
                                className={
                                  k === 0 && !animateDay
                                    ? "upper_card upper_card_animate"
                                    : k === 1 && !animateHrs
                                    ? "upper_card upper_card_animate"
                                    : k === 2 && !animateMin
                                    ? "upper_card upper_card_animate"
                                    : k === 3 && !animateSec
                                    ? "upper_card upper_card_animate"
                                    : "upper_card"
                                }
                              >
                                <span className="count">{i[0]}</span>
                              </div>
                              <div
                                className={
                                  k === 0 && !animateDay
                                    ? "lower_card lower_card_animate"
                                    : k === 1 && !animateHrs
                                    ? "lower_card lower_card_animate"
                                    : k === 2 && !animateMin
                                    ? "lower_card lower_card_animate"
                                    : k === 3 && !animateSec
                                    ? "lower_card lower_card_animate"
                                    : "lower_card"
                                }
                              >
                                <span className="count">
                                  {k === 3 ? i[1] : i[0]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="footer_area">
                  <p className="bot_text">Made by _Ray</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalComponent theme={props.theme} passchild={setChildData} />
    </section>
  );
};

export default Main;
