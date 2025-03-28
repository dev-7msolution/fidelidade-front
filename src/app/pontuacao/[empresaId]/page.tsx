'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { IMaskInput } from 'react-imask'

const formSchema = z.object({
  cpf: z.string()
    .min(14, 'CPF inválido')
    .max(14, 'CPF inválido')
    .refine((cpf) => {
      // Remove caracteres não numéricos para validação
      const numbers = cpf.replace(/[^\d]/g, '')
      return numbers.length === 11
    }, 'CPF inválido'),
  telefone: z.string()
    .min(14, 'Telefone inválido')
    .max(14, 'Telefone inválido')
    .refine((telefone) => {
      const numbers = telefone.replace(/[^\d]/g, '')
      return numbers.length === 11
    }, 'Telefone inválido')
})

type FormValues = z.infer<typeof formSchema>

export default function PontuacaoPage({ params }: { params: { empresaId: string } }) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: '',
      telefone: ''
    }
  })

  async function onSubmit(data: FormValues) {
    try {
      // Remove a máscara antes de enviar para a API
      const cpfLimpo = data.cpf.replace(/[^\d]/g, '')
      const telefoneLimpo = data.telefone.replace(/[^\d]/g, '')
      console.log({ 
        cpf: cpfLimpo, 
        telefone: telefoneLimpo,
        empresaId: params.empresaId 
      })
      toast.success('Pontuação registrada com sucesso!')
    } catch (error) {
      toast.error('Erro ao registrar pontuação')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Programa de Pontos
            </h1>
            <p className="text-gray-600">
              Digite seus dados para acumular seus pontos
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IMaskInput
                        mask="000.000.000-00"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        placeholder="000.000.000-00"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg text-center tracking-wider ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IMaskInput
                        mask="(00)00000-0000"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        placeholder="(00)00000-0000"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg text-center tracking-wider ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Confirmar
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Seus dados estão seguros e são usados apenas para o programa de pontos.
          </div>
        </div>
      </div>
    </div>
  )
} 