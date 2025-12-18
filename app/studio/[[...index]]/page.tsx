'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudioPage() {
  const router = useRouter()

  useEffect(() => {
    window.location.href = 'http://localhost:3333'
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to Sanity Studio...</p>
    </div>
  )
}
