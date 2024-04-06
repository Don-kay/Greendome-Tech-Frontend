import React from "react";
import CreateQuestion from "../../../../../../../../components/Csr-components/pagesComponent/createQuestion";

const Createquestion = (req) => {
  const courseId = req.params.id;
  const paramName = req.params.nameid;
  const moduleid = req.params.moduleid;

  function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
      string = string.replace(token, newtoken);
    }
    return string;
  }
  const paramsName = replaceAll(paramName, "%20", " "); //remove "["

  // str = replaceAll(str, "12345", ""); //remove "]"
  // console.log(paramsName);
  return (
    <main>
      <CreateQuestion
        moduleid={moduleid}
        paramName={paramsName}
        courseid={courseId}
      />
    </main>
  );
};

export default Createquestion;
