import type { APIRoute } from "astro";
import type { RootObject } from "../interfaces/dbData";
import { buildLlmsText, getSiteOrigin } from "../lib/aiDiscovery";



export const GET: APIRoute = async ({ request }) => {
  const response = await fetch(import.meta.env.API_URL as string);

  if (!response.ok) {
    return new Response("Unable to load llms.txt content.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const data = (await response.json()) as RootObject;
  const siteOrigin = getSiteOrigin(data, request.url);
  const content = buildLlmsText(data, siteOrigin);

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
