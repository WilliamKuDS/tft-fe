import AccountForm from '@/components/supabase/account-form'
import { createClient } from '@/components/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <AccountForm user={user} />
}