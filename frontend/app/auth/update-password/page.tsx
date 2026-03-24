import { UpdatePasswordForm } from "@/src/components/auth/update-password-form";
import BackgroundSlider from "@/src/components/background-slider";

export default function Page() {
  return (
    <BackgroundSlider>
       <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <UpdatePasswordForm />
          </div>
       </div>
    </BackgroundSlider>
  );
}
