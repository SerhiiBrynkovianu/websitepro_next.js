"use client";
import React, { useState } from "react";
import classNames from "classnames";

import { DateTimePickerProps } from "./picker.types";

import styles from "./styles.module.scss";
import { useOutsideClick } from "@/app/hooks";
import Calendar from "react-calendar";

import "./calendar.scss";
import { dayTimes, hours, minutes } from "@/app/constants/time";
const DateTimePicker = ({
  className,
  value,
  children,
  disabled,
  onChange = () => {},
}: DateTimePickerProps) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const toggleShow = () => setShowCalendar((prev) => !prev);

  const ref = useOutsideClick(toggleShow, showCalendar);

  const setValue = (
    date: Date | null | undefined = value.date,
    hour: string | undefined = value.hour,
    minute: string | undefined = value.minute,
    dayTime: "AM" | "PM" | undefined = value.dayTime
  ) => {
    onChange({
      date,
      hour: hour ?? hours[0],
      minute: minute ?? minutes[0],
      dayTime: dayTime ?? dayTimes[0],
    });
  };
  return (
    <div className={classNames(styles.picker, className)} ref={ref}>
      <button
        className={styles.picker__btn}
        disabled={disabled}
        onClick={toggleShow}
        id="calendar-btn"
      >
        {children}
      </button>
      <div className={classNames(styles.popup, showCalendar && styles.show)}>
        <Calendar
          className={classNames(styles.calendar)}
          onChange={(date) => {
            setValue(date as Date, undefined, undefined, undefined);
          }}
          value={value.date}
          minDate={new Date()}
        />
        <div className={styles.picker__right}>
          <div className={styles.picker__list}>
            {hours.map((el) => (
              <div
                className={classNames(
                  styles["picker__list-item"],
                  value.hour === el && styles.active
                )}
                onClick={() => {
                  setValue(undefined, el, undefined, undefined);
                }}
                key={el}
              >
                {el}
              </div>
            ))}
          </div>
          <div className={styles.picker__list}>
            {minutes.map((el) => (
              <div
                className={classNames(
                  styles["picker__list-item"],
                  value.minute === el && styles.active
                )}
                onClick={() => {
                  setValue(undefined, undefined, el, undefined);
                }}
                key={el}
              >
                {el}
              </div>
            ))}
          </div>
          <div className={styles.picker__list}>
            {dayTimes.map((el) => (
              <div
                className={classNames(
                  styles["picker__list-item"],
                  value.dayTime === el && styles.active
                )}
                onClick={() => {
                  setValue(undefined, undefined, undefined, el);
                }}
                key={el}
              >
                {el}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
