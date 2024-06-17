'use client'
import { Input } from '@nextui-org/input'
import { login } from './actions'
import { Button } from '@nextui-org/button'
import { title } from '@/components/primitives'
import { Spacer } from '@nextui-org/spacer'
import { Link } from '@nextui-org/link'
import {EyeFilledIcon, EyeSlashFilledIcon} from "@/components/icons";
import { useState } from 'react'

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="w-full max-w-lg text-center mx-auto">
        <h1 className={title()}>Sign in to wkd</h1>
        <Spacer y={10}/>
        <form>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Input isClearable type="email" variant="flat" label="Email" name="email" placeholder="you@example.com"/>
            <Spacer y={3}/>
            <Input 
                variant="flat" 
                label="Password" 
                name="password" 
                placeholder="********"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                />
            <Spacer y={3}/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{ marginRight: '5px' }}>Don't have an account?</p>
                <Link href='/signup' underline="hover">Sign up</Link>
              </div>
            <Spacer y={5}/>
            <Button formAction={login} type="submit" value="login">Sign in</Button>
        </div>
        </form>
    </div>
  )
}