"use client";

import React from "react";

type SpaLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const isModifiedClick = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

const isExternalHref = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

export const SpaLink: React.FC<SpaLinkProps> = ({
  href,
  onClick,
  target,
  children,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      isModifiedClick(event) ||
      (target && target !== "_self") ||
      typeof window === "undefined"
    ) {
      return;
    }

    if (href.startsWith("#") || isExternalHref(href)) {
      return;
    }

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={href} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
