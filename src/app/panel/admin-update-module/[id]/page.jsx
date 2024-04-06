import EditModule from "../../../../components/Csr-components/pagesComponent/editModule";

export default function page(req) {
  const moduleparams = req.params.id;

  function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
      string = string.replace(token, newtoken);
    }
    return string;
  }
  // console.log(courseparams);
  return (
    <section>
      <EditModule moduleParam={moduleparams} />
    </section>
  );
}
