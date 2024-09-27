import { useState } from "react";
import NavigationItems from "./NavigationItems";

type Props = {
  media: any[];
};

const Navbar = ({ media }: Props) => {
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const items = media
    .slice(0)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((media) => ({
      type: "link",
      text: media.name,
      href: "/media/" + media.htmlFileName,
    }));

  function toggle() {
    setShowMediaDropdown((shown) => !shown);
  }
  return (
    <>
      <nav className="">
        <div className="logo">
          <a href="/">IPM</a>
        </div>
        <details className="menu-sm">
          <summary className="hmbrgr">
            <img src="/images/hmbrgr.png" width="30" height="25" />
          </summary>
          <ul>
            <NavigationItems media={media} />
          </ul>
        </details>
        <ul className="menu-md">
          <li>
            <a href="/key-findings">VAŽNI NALAZI</a>
          </li>
          <li id="media-nav-md" onClick={toggle}>
            MEDIJI
          </li>
          <li>
            <a href="/recommendations">PREPORUKE</a>
          </li>
          <li>
            <a href="/methodology">METODOLOGIJA</a>
          </li>
        </ul>
      </nav>
      <div
        id="md-media-dropdown-wrapper"
        style={showMediaDropdown ? { display: "block" } : { display: "none" }}
      >
        <ul className="md-media-dropdown">
          <div className="left-column">
            {items.slice(0, Math.ceil(items.length / 3)).map((mediaLink) => (
              <li key={mediaLink.href}>
                <a href={mediaLink.href}>{mediaLink.text}</a>
              </li>
            ))}
          </div>
          <div className="center-column">
            {items
              .slice(
                Math.ceil(items.length / 3),
                Math.ceil((2 * items.length) / 3)
              )
              .map((mediaLink) => (
                <li key={mediaLink.href}>
                  <a href={mediaLink.href}>{mediaLink.text}</a>
                </li>
              ))}
          </div>
          <div className="right-column">
            {items
              .slice(Math.ceil((2 * items.length) / 3), items.length)
              .map((mediaLink) => (
                <li key={mediaLink.href}>
                  <a href={mediaLink.href}>{mediaLink.text}</a>
                </li>
              ))}
          </div>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
