'use server'
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
  } from "@nextui-org/navbar";
  import { Link } from "@nextui-org/link";
  import NextLink from "next/link";
  
  import { siteConfig } from "@/config/site";
  import { TFTDropDown, NavbarAvatarDropdown } from "@/components/navbar-client";
  import { ThemeSwitch } from "@/components/theme-switch";
  import {
    GithubIcon,
    DiscordIcon,
    Logo,
  } from "@/components/icons";
import { createClient } from "./supabase/server";
  
  export const Navbar = async () => {  
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    return (
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">WilliamKu</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            <Link color="foreground" href="/"> Home </Link>
            <TFTDropDown/>
            <Link color="foreground" href="/homelab"> Homelab </Link>
          </ul>
        </NavbarContent>
  
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarAvatarDropdown user={user}/>
          </NavbarItem>
        </NavbarContent>
  
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>
      </NextUINavbar>
    );
  };
  