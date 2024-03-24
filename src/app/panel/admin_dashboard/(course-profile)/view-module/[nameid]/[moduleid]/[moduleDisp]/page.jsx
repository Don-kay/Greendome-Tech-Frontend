import React from "react";

import axios from "axios";
import ModuleView from "../../../../../../../../components/Csr-components/pagesComponent/moduleView";
import _ from "lodash";

const moduleDisp = async (req) => {
  const courseName = req.params.nameid;
  const courseId = req.params.moduleid;
  const moduleId = req.params.moduleDisp;

  function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
      string = string.replace(token, newtoken);
    }
    return string;
  }
  const coursename = replaceAll(courseName, "%20", " ");
  // const module = replaceAll(moduleName, "%20", " ");

  return (
    <div>
      <ModuleView
        coursename={coursename}
        courseid={courseId}
        moduleid={moduleId}
      />
    </div>
  );
};

export default moduleDisp;
