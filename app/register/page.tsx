import { RegisterForm } from "@/components/register-form"
import { AuthProvider } from "@/lib/auth-context"

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  )
}
