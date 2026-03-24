import { backendFetch } from "@/src/lib/backend/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await backendFetch("/api/v1/auth/onboarding", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: data.message || "Erro ao criar empresa" },
        { status: response.status },
      );
    }

    return Response.json(
      { message: data.message },
      { status: response.status },
    );
  } catch (error) {
    console.error("Erro ao criar company: ", error);

    return Response.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const response = await backendFetch(`/api/v1/companies/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Erro ao buscar companies: ", error);

    return Response.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
