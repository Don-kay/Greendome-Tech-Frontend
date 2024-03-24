import React from "react";
import CreateModule from "@/components/Csr-components/pagesComponent/createModule";

const Create_module = (req) => {
  const courseId = req.params.id;
  const paramName = req.params.nameid;

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
      <CreateModule paramsName={paramsName} courseid={courseId} />
    </main>
  );
};

export default Create_module;
