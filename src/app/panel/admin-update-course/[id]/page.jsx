import EditCourse from "../../../../components/Csr-components/pagesComponent/editCourse";

export default function page(req) {
  const courseparams = req.params.id;

  function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
      string = string.replace(token, newtoken);
    }
    return string;
  }
  // console.log(courseparams);
  return (
    <section>
      <EditCourse courseParam={courseparams} />
    </section>
  );
}
