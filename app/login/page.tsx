import LoginForm from "@/app/ui/login-form"

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center sm: h-screen md:h-screen ">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#d8d8d8,0_0_15px_#d3d3d3,0_0_30px_#e0e0e0] rounded-2xl">
        <LoginForm />
      </div>
    </main>
  )
}
