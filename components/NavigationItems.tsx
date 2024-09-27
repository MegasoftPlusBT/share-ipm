const NavigationItems = ({ media }) => {
  const navigationItems: any[] = [
    {
      type: "link",
      text: "VAŽNI NALAZI",
      href: "/key-findings",
    },
    {
      type: "dropdown",
      text: "MEDIJI",
      items: media
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
        })),
    },
    {
      type: "link",
      text: "PREPORUKE",
      href: "/recommendations",
    },
    {
      type: "link",
      text: "METODOLOGIJA",
      href: "/methodology",
    },
  ];

  return (
    <>
      {navigationItems.map((navItem) => {
        if (navItem.type == "link") {
          return (
            <li key={navItem.text}>
              <a href={navItem.href}>{navItem.text}</a>
            </li>
          );
        } else {
          return (
            <li key={navItem.text}>
              <details className="media-nav">
                <summary>
                  {navItem.text}
                  <div className="close-media-dropdown">+</div>
                </summary>
                <div className="media-dropdown-wrapper">
                  <ul className="media-dropdown">
                    {navItem.items.map((mediaLink) => (
                      <li key={mediaLink.href}>
                        <a href={mediaLink.href}>{mediaLink.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          );
        }
      })}
    </>
  );
};
export default NavigationItems;
