'use client'

import React, { useTransition } from 'react'
import ImageDropzone from '@/components/dropzone'
import { useSession } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { uploadImage } from './action'
import { client } from '@/lib/hono'
import { timestampExp } from '@/lib/utils'
import { useUser } from '@/store/user'
import { useQuery } from '@tanstack/react-query'

type IProfilePhoto = {
  image: File | null
}

export default function Page() {
  const { data: session } = useSession()
  const { user, setUser } = useUser()
  const [isPending, startTransition] = useTransition()
  const form = useForm<IProfilePhoto>({
    defaultValues: {
      image: null,
    },
  })

  async function onSubmit(values: IProfilePhoto) {
    if (!values.image) return toast.error('No image to upload')

    startTransition(() => {
      uploadImage({ image: values.image as File }).then(async (data) => {
        if (data.success) {
          toast.success(data.success)
          await client.user.$put({
            json: {
              id: session?.user?.id ?? '',
              cid: data?.cid ?? '',
              imageUrl: data?.imageUrl ?? '',
            },
          })

          setUser({
            ...user,
            imageUrl: data?.imageUrl ?? '',
            expired: timestampExp(7),
          })
        }
        if (data.error) {
          toast.error(data?.error)
        }
      })
    })
  }

  return (
    <div className="space-y-4">
      <div className="w-full overflow-hidden rounded bg-secondary p-4 text-xs">
        <pre>{JSON.stringify({ session }, null, 2)}</pre>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ImageDropzone name="image" />
          <Button disabled={isPending} type="submit" variant="default">
            {isPending ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
