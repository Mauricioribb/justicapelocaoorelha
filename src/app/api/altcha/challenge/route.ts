import { getAltchaApi } from "@/lib/altcha";

export async function GET() {
  try {
    const altcha = await getAltchaApi();
    return altcha.challengeHandler(new Request("http://altcha.local/challenge"));
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Verificação anti-spam indisponível." },
      { status: 503 }
    );
  }
}
