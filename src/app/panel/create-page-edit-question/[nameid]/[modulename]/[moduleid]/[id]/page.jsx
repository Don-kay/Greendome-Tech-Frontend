import EditQuestion2 from "@/components/Csr-components/pagesComponent/editQuestion2";

export default function updateQuestions2(req) {
  const questionparams = req.params.id;
  const moduleParam = req.params.moduleid;
  const course = req.params.nameid;
  const courseId = req.params.modulename;

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
      <EditQuestion2
        paramName={courseName}
        courseid={courseId}
        moduleParam={moduleParam}
        questionParam={questionparams}
      />
    </section>
  );
}
