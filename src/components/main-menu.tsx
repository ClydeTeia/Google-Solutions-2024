"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function MainMenu() {
  const router = useRouter();

  return (
    <>
      <div className='text-3xl'>Welcome to VisionX</div>
      <Button onClick={() => router.push("/gesture")}>Get Started</Button>
    </>
  )
}
