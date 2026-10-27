import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF, href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/share/19XLEEbP8w/" },
  { label: "Twitter", icon: FaTwitter, href: process.env.NEXT_PUBLIC_TWITTER_URL },
  { label: "Instagram", icon: FaInstagram, href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/recyclebinmedia/" },
];

export function SocialSidebar({ hidden }: { hidden: boolean }) {
  return <aside aria-label="Follow Recycle Bin Media" hidden={hidden} className="social-sidebar fixed inset-y-0 right-0 z-10 w-20 flex-col items-center justify-center gap-2 border-l border-line">
    {socialLinks.map(({ label, icon: Icon, href }) => {
      const className = "grid size-12 place-items-center rounded-full border border-brand/10 bg-black text-brand transition-colors hover:border-brand hover:bg-brand hover:text-black focus-visible:bg-brand focus-visible:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none";
      return href ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Recycle Bin Media on ${label} (opens in a new tab)`} className={className}>
        <Icon aria-hidden="true" size={17} />
      </a> : <span key={label} role="img" aria-label={`${label} — profile link coming soon`} title={`${label} — profile link coming soon`} className={className}>
        <Icon aria-hidden="true" size={17} />
      </span>;
    })}
  </aside>;
}
