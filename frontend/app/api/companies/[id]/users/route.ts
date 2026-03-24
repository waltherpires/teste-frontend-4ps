import { backendFetch } from "@/src/lib/backend/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: companyId } = await params;

  try {
    const response = await backendFetch(
      `/api/v1/companies/${companyId}/users`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      },
    );

    const data = await response.json();
    console.log("Erro ao obter lista de usuarios: ", data);

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Erro ao buscar usuários vinculados: ", error);

    return Response.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
