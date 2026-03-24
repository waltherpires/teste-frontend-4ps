import { Spinner } from "@/src/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full h-svh flex justify-center items-center">
      <Spinner className="text-primary size-8"/>
    </div>
  );
}
