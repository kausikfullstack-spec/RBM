# Project videos

Edit `lib/project-videos.json` to manage videos on project detail pages.
Each top-level key is a project slug, such as `hideaway`. Add more objects to
that project's array for more videos, with a unique `id` for each entry.

- `title` and `description`: text displayed on the page.
- `provider`: use `terabox` for the TeraBox link label.
- `shareUrl`: the public sharing page, used as the watch link and playback fallback.
- `src`: a local video path or direct, browser-playable HTTPS video URL, or an empty string.
- `poster`: a local image path or HTTPS image URL, or an empty string.
- `embedUrl`: a provider-supported iframe player URL, or an empty string.
- `aspectRatio`: the iframe player ratio, for example `9 / 16` for portrait.

An `embedUrl` takes precedence over `src`. Iframe autoplay, sound, looping,
and controls depend on the provider's player settings; the website cannot
override another origin's player controls. Use only a documented embed URL.

A TeraBox `/s/` link is a sharing page, not a direct media file. Leave `src`
empty for that link: the page displays a preview card linking to TeraBox.
To play within the website, provide a stable direct video URL in `src`.
Direct videos autoplay muted, loop, and show no player controls. The player
preserves the video's intrinsic aspect ratio without cropping or stretching,
within the card width and 75% of the viewport height. Browsers may restrict
autoplay based on device settings. Share-only preview cards do not autoplay.
Do not paste temporary session URLs or private credentials into this file.
The current Hideaway share contains the portrait `HIDEAWAY 6.2.26 2.mp4`.
Its share page redirects to `www.1024tera.com` and returns
`X-Frame-Options: SAMEORIGIN`; a browser test confirmed iframe embedding is
blocked. Both `embedUrl` and `src` are intentionally empty, so this entry
opens the share rather than playing the previously imported local MP4.
Set `embedUrl` when a provider-supported iframe player becomes available.
The poster is retained from the previous import. No video is downloaded or
proxied by this configuration.

Rebuild and deploy after changing this JSON in production. No database or
TeraBox API credentials are needed for share links.
