"use client";

import { useEffect, useState } from "react";
import React from "react";
import NewWindow from "./window";
import "./styles.css";
import { content } from "./essay";

export default function Page() {
  const [openWindows, setOpenWindows] = useState(new Set());

  const handleIconClick = (icon) => {
    const newOpenWindows = new Set(openWindows);
    if (newOpenWindows.has(icon)) {
      newOpenWindows.delete(icon);
    } else {
      newOpenWindows.add(icon);
    }
    setOpenWindows(newOpenWindows);
  };

  const closeWindow = (icon) => {
    const newOpenWindows = new Set(openWindows);
    newOpenWindows.delete(icon);
    setOpenWindows(newOpenWindows);
  };

  const [sidebarMargin, setSidebarMargin] = useState("0px");

  const updateMargin = () => {
    const backgroundAspectRatio = 1919 / 1051; // Original aspect ratio of the background image
    const sidebarProportion = 242 / 1919; // Proportion of the sidebar width to the total image width
    const currentAspectRatio = window.innerWidth / window.innerHeight;

    let newMargin;

    if (currentAspectRatio > backgroundAspectRatio) {
      // Calculate the current proportional width of the sidebar
      newMargin = `${window.innerWidth * sidebarProportion}px`;
    } else {
      // Sidebar is fully or partially off-screen
      newMargin = "0px";
    }

    setSidebarMargin(newMargin);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMargin);

    // Initial update
    updateMargin();

    return () => {
      window.removeEventListener("resize", updateMargin);
    };
  }, []);

  return (
    <>
      <header>
        <h1>Neediness</h1>
        <h2>By Bea Duncan</h2>
      </header>
      <section>
        {content.map(({ icon, subtitle, title, text }) => (
          <>
            <aside style={{ marginLeft: sidebarMargin }}>
              <img src={icon} onClick={() => handleIconClick(icon)} />
              <p>{subtitle}</p>
            </aside>
            {openWindows.has(icon) && (
              <NewWindow
                title={title}
                text={text}
                close={() => closeWindow(icon)}
              />
            )}
          </>
        ))}
      </section>
    </>
  );
}
