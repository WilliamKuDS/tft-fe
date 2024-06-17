'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/components/supabase/client'
import { type User } from '@supabase/supabase-js'
import AvatarForm from '@/components/supabase/avatar-form'
import { useRouter } from 'next/navigation'
import { Spacer } from '@nextui-org/spacer'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [updated, setUpdateStatus] = useState(false)

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      setUpdateStatus(true)
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div className="form-widget w-full max-w-lg text-center mx-auto space-y-8" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <AvatarForm
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, avatar_url: url })
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <Spacer y={10}/>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, avatar_url })}
          isLoading={loading}
          color='primary'
          disabled={loading}
        >
          {loading ? 'Updating' : 'Update'}
        </Button>
        {updated ? 'Profile has been updated' : ''}
      </div>
    </div>
  )
}