import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../../Cards/InfoCard";
import { GiTeacher, GiRead } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import RoundIcon from "../../icon/RoundIcon";

export default function TotalStudentPops() {
  const { users, totalStudents, errorMsg } = useSelector(
    (strore) => strore.profiles
  );
  const Reader = <GiRead />;
  // console.log(totalStudents);

  return (
    <section>
      <InfoCard title="Student" value={totalStudents}>
        {/* @ts-ignore */}
        <RoundIcon
          icon={Reader}
          iconColorClass="text-white dark:text-orange-100"
          bgColorClass="  bg-green dark:bg-orange-500"
          className="mr-4"
        />
      </InfoCard>
    </section>
  );
}

export const ActiveStudentPops = () => {
  const { activeStudent, errorMsg } = useSelector((strore) => strore.profiles);
  // console.log(activeStudent);

  return (
    <section>
      <InfoCard title="Active Students" value={activeStudent}>
        {/* @ts-ignore */}
        <RoundIcon
          // icon={Tie}
          iconColorClass="text-white dark:text-orange-100"
          bgColorClass="bg-green dark:bg-orange-500"
          className="mr-4"
        />
      </InfoCard>
    </section>
  );
};
export const TotalTutorsProps = () => {
  const Teacher = <GiTeacher />;

  const { totalTutors, errorMsg } = useSelector((strore) => strore.profiles);

  // console.log(totalTutors);
  return (
    <section>
      <InfoCard title="Tutors" value={totalTutors}>
        {/* @ts-ignore */}
        <RoundIcon
          icon={Teacher}
          iconColorClass="text-white dark:text-orange-100"
          bgColorClass="bg-green dark:bg-orange-500"
          className="mr-4"
        />
      </InfoCard>
    </section>
  );
};
export const TotalAdminProps = () => {
  const { totalAdmin, errorMsg } = useSelector((strore) => strore.profiles);
  // console.log(totalAdmin);
  const Tie = <FaUserTie />;

  return (
    <section>
      <InfoCard title="Administrative" value={totalAdmin}>
        {/* @ts-ignore */}
        <RoundIcon
          icon={Tie}
          iconColorClass="text-white dark:text-orange-100"
          bgColorClass="bg-green dark:bg-orange-500"
          className="mr-4"
        />
      </InfoCard>
    </section>
  );
};
