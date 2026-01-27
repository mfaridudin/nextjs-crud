import HobbiesClient from "@/hobbies/HobbiesClient"

export default async function Page() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${apiUrl}/hobby`, {
    cache: "no-store",
  })

  const json = await data.json()

  const hobbies = json.data

  return (
    <>
      <HobbiesClient hobbies={hobbies} />
    </>
  );
}
