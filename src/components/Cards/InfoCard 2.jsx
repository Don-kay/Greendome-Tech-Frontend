import { ReactSVGElement } from "react";
import { Card, CardBody } from "@roketid/windmill-react-ui";

import Greendome from "../asset/greendome.jpg";
import Image from "next/image";

function InfoCard2({
  id,
  toggleHover,
  title,
  imageType,
  sub1,
  sub2,
  sub3,
  sub4,
  sub5,
  sub6,
  sub7,
  sub8,
  sub9,
  sub10,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  value9,
  value10,
  children,
}) {
  return (
    <Card className=" drop-shadow-sm">
      <CardBody className=" flex items-center w-full flex-col">
        {children}
        <div className=" relative items-center flex gap-y-4 flex-col">
          <p className=" text-sm font-medium text-greenGraded1 dark:text-gray-400">
            {title}
          </p>
          {imageType !== "" ? (
            <div className=" flex items-center h-gallery1 overflow-hidden ">
              <Image
                className=" w-gallery1 h-gallery2"
                width={200}
                height={200}
                src={imageType}
                alt="image"
              />
            </div>
          ) : (
            <div className=" flex items-center h-gallery1 overflow-hidden w-fit ">
              <Image
                className=" w-gallery1 h-gallery2"
                width={200}
                height={200}
                src={Greendome}
                alt="image"
              />
            </div>
          )}
          <div className=" flex items-center w-40">
            <div className="  flex flex-col gap-y-4">
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub1}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value1}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub2}</h4>
                <p className="text-sm font-normal text-greenGraded1 dark:text-gray-200">
                  {value2}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub3}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value3}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub4}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value4}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub5}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value5}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub6}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value6}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub7}</h4>
                <p className="text-sm font-semibold text-greenGraded1 w-96 dark:text-gray-200">
                  {value7}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub8}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value8}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub9}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value9}
                </p>
              </div>
              <div className=" flex flex-row gap-x-2">
                <h4 className=" text-sm font-bold">{sub10}</h4>
                <p className="text-sm font-semibold text-greenGraded1 dark:text-gray-200">
                  {value10}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default InfoCard2;
