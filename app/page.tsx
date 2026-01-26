import HobbiesClient from "@/hobbies/HobbiesClient"

export default async function Page() {

  const base_url = 'http://127.0.0.1:8000/api'
  const data = await fetch(`${base_url}/hobby`, {
    cache: "no-store",
  })

  const json = await data.json()

  const hobbies = json.data

  // console.log(hobbies)

  return (
    <>
      <HobbiesClient hobbies={hobbies} />
    </>
  );
}
