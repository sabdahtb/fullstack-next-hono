'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/lib/hono'

const formSchema = z.object({
  title: z.string().min(1),
})
type FormData = z.infer<typeof formSchema>
const defaultValues: FormData = {
  title: '',
}

export default function PostForm() {
  const queryClient = useQueryClient()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const mutate = useMutation({
    mutationFn: async (json: any) => {
      try {
        const res = await client.post.test.$post({ json })
        return await res.json()
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      form.reset()
      toast('New post succesfully created')
      queryClient.invalidateQueries({ queryKey: ['get-recent-post'] })
    },
    onError: (error: any) => {
      toast.error(error?.message ?? 'Something went wrong')
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate.mutateAsync({ ...values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-lg"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between">
                <FormLabel>Title</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Title..." type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    </Form>
  )
}
