"use client";
import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default class Calender extends Component {
  render() {
    return (
      <FullCalendar
        buttonText={"green"}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    );
  }
}
