import EditProfile from "@/components/Csr-components/pagesComponent/editProfile";

export default function updateProfile(req) {
  const params = req.params.id;
  // console.log(params);
  return (
    <section>
      <EditProfile params={params} />
    </section>
  );
}
