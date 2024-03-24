import React from "react";

import ViewModules from "../../../../../../../components/Csr-components/pagesComponent/viewModule";

const View_module = (req) => {
  // console.log(req);
  const paramId = req.params.moduleid;
  const paraname = req.params.nameid;

  function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
      string = string.replace(token, newtoken);
    }
    return string;
  }
  const paramsName = replaceAll(paraname, "%20", " ");
  // console.log(paramId);

  //   function replaceAll(string, token, newtoken) {
  //     while (string.indexOf(token) != -1) {
  //       string = string.replace(token, newtoken);
  //     }
  //     return string;
  //   }

  return (
    <main>
      <ViewModules paramsId={paramId} paramsName={paramsName} />
    </main>
  );
};

export default View_module;
