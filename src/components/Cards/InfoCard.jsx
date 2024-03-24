import { ReactSVGElement } from "react";
import { Card, CardBody } from "@roketid/windmill-react-ui";

function InfoCard({ title, value, children }) {
  return (
    <Card className=" drop-shadow-lg flex justify-center items-center flex-row bg-whiteOpaque">
      <CardBody className="flex items-center  ">
        {children}
        <div className=" flex justify-center items-center flex-col">
          <p className="mb-2 text-sm font-medium text-greenGraded1 dark:text-gray-400">
            {title}
          </p>
          <p className="text-lg font-semibold text-greenGraded1 dark:text-gray-200">
            {value}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
