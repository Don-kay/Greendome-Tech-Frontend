import EditQuestion from "@/components/Csr-components/pagesComponent/editQuestion";

export default function updateQuestions(req) {
  const questionparams = req.params.id;
  const moduleParam = req.params.moduleid;
  const course = req.params.nameid;
  const courseid = req.params.modulename;

  function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
      string = string.replace(token, newtoken);
    }
    return string;
  }
  const courseName = replaceAll(course, "%20", " ");
  // const moduleName = replaceAll(module, "%20", " ");
  // console.log(questionparams);
  // console.log(moduleParam);
  // console.log(courseName);
  // console.log(moduleName);
  return (
    <section>
      <EditQuestion
        paramName={courseName}
        courseid={courseid}
        moduleParam={moduleParam}
        questionParam={questionparams}
      />
    </section>
  );
}
