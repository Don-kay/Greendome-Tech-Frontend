import React from "react";
import classNames from "classnames";

function RoundIcon({ icon, iconColorClass, bgColorClass, className }) {
  const baseStyle = "p-3 rounded-full";
  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className);
  return <div className={cls}>{icon}</div>;
}

export default RoundIcon;
