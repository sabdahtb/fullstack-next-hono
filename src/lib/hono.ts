import { AppType } from '@/server'
import { hc } from 'hono/client'
import { HTTPException } from 'hono/http-exception'
import { StatusCode } from 'hono/utils/http-status'
import superjson from 'superjson'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '' // For the browser, use relative paths
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/'
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'https://<YOUR_DEPLOYED_WORKER_URL>/' // Assume Cloudflare Workers or similar deployment
}

export const client = hc<AppType>(getBaseUrl(), {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, { ...init, cache: 'no-store' })

    if (!response.ok) {
      throw new HTTPException(response.status as StatusCode, {
        message: response.statusText,
        res: response,
      })
    }

    const contentType = response.headers.get('Content-Type')

    response.json = async () => {
      const text = await response.text()

      if (contentType === 'application/superjson') {
        return superjson.parse(text)
      }

      try {
        return JSON.parse(text)
      } catch (error) {
        console.error('Failed to parse response as JSON:', error)
        throw new Error('Invalid JSON response')
      }
    }

    return response
  },
})['api']
