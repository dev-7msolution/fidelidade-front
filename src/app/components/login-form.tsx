'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from "zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation"

const SignUpSchema = z.object({
  email: z.string().max(200),
  password : z.string().max(200),
});


type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

          const route = useRouter();

          async function handleLogin(data : any) {
            alert('chamou')
            const email = data.email
            const password = data.password

            const result = await signIn('credentials',{
              email,
              password,
              redirect: false
            })

            if(result?.status == 401){
                toast.error("Login não autorizado", {
                  position: "top-center",
                  theme: "dark",
                })
                console.log('error')
                return
            }

            if(result?.status === 200){

              route.replace('/dashboard')

            
            }
          }

          const {
            register,
            handleSubmit,
            reset,
            formState: { errors }, 
            
      
          } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)
          
        });
  

  return (
    <>
    <ToastContainer></ToastContainer>
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required {...register('email')}/>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required  {...register('password')}/>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>

      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
    </>
  )
}
