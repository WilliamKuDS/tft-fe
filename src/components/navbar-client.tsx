'use client'
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";
import {NavbarItem} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import {useCallback, useEffect, useState} from "react";
import { createClient } from '@/components/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Avatar, AvatarIcon } from "@nextui-org/avatar";
import { Spacer } from "@nextui-org/spacer";


export function TFTDropDown() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <NavbarItem key='tft'>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ position: 'relative', display: 'inline-block' }}
            >
                <Dropdown isOpen={isHovered} onClose={() => setIsHovered(false)}>
                    <DropdownTrigger>
                        <Button data-hover={isHovered ? 'true' : 'false'} variant="light" disableRipple>
                            TFT
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="TFT Projects">
                        <DropdownItem key="search" textValue="Search Player">
                            <Link href="/tft/search" color="foreground">
                                Search Player
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="database" textValue="Database">
                            <Link href="/tft/database" color="foreground">
                                Database
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="ml" textValue="Machine Learning">
                            <Link href="/tft/ml" color="foreground">
                                Machine Learning
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </NavbarItem>
    )
}

export function NavbarAvatarDropdown({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)
    const [avatar_img, setAvatarImg] = useState<string | undefined>(undefined)

    const getProfile = useCallback(async () => {
        try {
          setLoading(true)
    
          const { data, error, status } = await supabase
            .from('profiles')
            .select(`full_name, username, avatar_url`)
            .eq('id', user?.id)
            .single()
    
          if (error && status !== 406) {
            return (<SignedOut/>)
          }
    
          if (data) {
            setFullname(data.full_name)
            setUsername(data.username)
            setAvatarUrl(data.avatar_url)
          }
        } catch (error) {
            return (<SignedOut/>)
        } finally {
          setLoading(false)
        }
      }, [user, supabase])

    useEffect(() => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path)
                if (error) {
                throw error
                }

                const url = URL.createObjectURL(data)
                setAvatarImg(url)
            } catch (error) {
                return (<SignedOut/>)
            }
        }
        if (user !== null) {
            getProfile()
            if (avatar_url) downloadImage(avatar_url)
        }
    }, [avatar_url, supabase, user, getProfile])

    return (
        <div className="flex items-center gap-4">
            {user
            ?    <SignedIn avatar_img={avatar_img} fullname={fullname} username={username}/>
            :   <SignedOut/>
            }
      </div>
    )
}

function SignedIn({avatar_img, fullname, username}: {
    avatar_img: string | undefined,
    fullname: string | null,
    username: string| null
}) {
    const handleLogout = async () => {
        try {
          const response = await fetch('/auth/signout', {
            method: 'POST',
          });
    
          if (response.ok) {
            // Redirect or update the UI after successful logout
            window.location.href = '/login';
          } else {
            console.error('Failed to logout');
          }
        } catch (error) {
          console.error('An error occurred while logging out:', error);
        }
    };

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    src={avatar_img}
                    alt="Avatar"
                    className="avatar"
                    size="sm"
                    as="button"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownSection showDivider>
                    <DropdownItem key="id" isReadOnly textValue="Avatar">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Avatar
                            src={avatar_img}
                            alt="Avatar"
                            className="avatar"
                            size="md"
                        />
                        <Spacer x={3}/>
                        <div>
                            <p>{fullname}</p>
                            <p>{username}</p>
                        </div>
                    </div>
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    <DropdownItem key="profile" textValue="Profile" href="/profile">
                        Profile
                        {/* <p className="font-semibold">Profile</p> */}
                    </DropdownItem>
                    <DropdownItem key="settings" textValue="Settings" isDisabled href="/settings">
                        Settings (Coming Soon)
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection>  
                    <DropdownItem key="signout" className="text-danger" textValue="Signout" color="danger" onClick={handleLogout}>
                        Sign Out
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

function SignedOut() {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                alt="Avatar"
                className="avatar"
                size="sm"
                as="button"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="login" textValue="Signin" href="/login">
                    Sign in
                </DropdownItem>
                <DropdownItem key="signup" textValue="Signup" href="/signup">
                    Sign up
                </DropdownItem>
            </DropdownMenu>
      </Dropdown>
    )
}
