"use client";
import React from "react";
import { GiTeacher, GiRead } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import TotalSudentPops, {
  TotalAdminProps,
  TotalTutorsProps,
  ActiveStudentPops,
} from "./sudentPops";

const RolesCharts = () => {
  const Reader = <GiRead />;
  const Teacher = <GiTeacher />;
  const Tie = <FaUserTie />;
  return (
    <section className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <TotalSudentPops />
      <TotalTutorsProps />
      <TotalAdminProps />
      <ActiveStudentPops />
    </section>
  );
};

export default RolesCharts;
