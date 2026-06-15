// export default async function TestPage() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`,
//     {
//       headers: {
//         apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       },
//     },
//   );

//   return <div>Status: {response.status}</div>;
// }

import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("services")
    .select("*");

  return (
    <div>
      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </div>
  );
}
