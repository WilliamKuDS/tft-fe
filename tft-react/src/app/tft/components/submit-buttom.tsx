// export function SubmitButton() {
//     const { pending } = useFormStatus()

//     return (
//         <button className="btn btn-primary w-100 py-2" type="submit">Search </button>
//     )
// }

'use client'
 
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
 
  return (
    <button type="submit" aria-disabled={pending}>
      Search: {search}
    </button>
  )
}