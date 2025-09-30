// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function onRequest(_: Request) {
  const response = await fetch("http://api.open-notify.org/iss-now.json");

  return new Response(await response.text(), {
    headers: { "Content-Type": "application/json" },
  });
}
