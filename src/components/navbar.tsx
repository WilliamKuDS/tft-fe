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
  import { TFTDropDown, NavBarSearch } from "@/components/navbar-client";
  import { ThemeSwitch } from "@/components/theme-switch";
  import {
    GithubIcon,
    DiscordIcon,
    Logo,
  } from "@/components/icons";
  
  export const Navbar = async () => {  

    return (
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">TFT Home</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            <Link color="foreground" href="/tft/search"> Search </Link>
            <Link color="foreground" href="/tft/database"> Database </Link>
            <Link color="foreground" href="/tft/predict"> Predict </Link>
            <Link color="foreground" href="/tft/stats"> Stats </Link>
          </ul>
        </NavbarContent>

        <NavbarContent>
          <NavBarSearch/>
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
          </NavbarItem>
        </NavbarContent>
      </NextUINavbar>
    );
  };
  