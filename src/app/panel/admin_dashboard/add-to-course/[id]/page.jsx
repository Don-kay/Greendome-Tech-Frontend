import AddToCourse from "../../../../../components/Csr-components/pagesComponent/addToCourse";

export default function AddtoCourse(req) {
  const params = req.params.id;
  // console.log(params);
  return (
    <section>
      <AddToCourse params={params} />
    </section>
  );
}
