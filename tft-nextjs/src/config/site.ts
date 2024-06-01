export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "WilliamKuDev",
  description: "Another NextJS Site",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "TFT",
      href: "/tft",
    },
  ],
  navMenuItems: [
  ],
  links: {
    github: "https://github.com/WilliamKuDS",
    discord: "https://discord.gg",
    //sponsor: "https://patreon.com/",
  },
};
