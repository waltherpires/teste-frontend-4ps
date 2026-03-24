import BackgroundSlider from "@/src/components/background-slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <BackgroundSlider>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Desculpe, algo deu errado.
                </CardTitle>
              </CardHeader>
              <CardContent>
                {params?.error ? (
                  <p className="text-sm text-muted-foreground">
                    Código do erro: {params.error}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    An unspecified error occurred.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BackgroundSlider>
  );
}
