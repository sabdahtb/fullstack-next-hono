'use client'

import Image from 'next/image'
import { client } from '@/lib/hono'
import { Post } from '@prisma/client'
import PostForm from '@/components/post-form'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data, isPending } = useQuery({
    queryKey: ['get-recent-post'],
    queryFn: async () => {
      const res = await client.post.$get()
      return (await res.json()) as Post[]
    },
  })

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <PostForm />
      <div className="grid w-full grid-cols-3 gap-4">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="w-full overflow-hidden rounded bg-secondary p-4 text-xs"
          >
            <pre className="whitespace-pre-wrap">
              {JSON.stringify({ item, isPending }, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
