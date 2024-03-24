import React from "react";
import ModuleDisp from "@/components/Csr-components/pagesComponent/moduleDisp";

const page = (req) => {
  // const paramId = req.params.id;
  const paramid = req.params.nameid;
  // console.log(paramName);
  return (
    <div>
      <ModuleDisp paramid={paramid} />
    </div>
  );
};

export default page;
