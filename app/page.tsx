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

  return (
    <>
      <header>
        <h1>Neediness</h1>
        <h2>By Bea Duncan</h2>
      </header>
      <section>
        {content.map(({ icon, subtitle, title, text }) => (
          <>
            <aside>
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
      <div className="sidebar left" ></div>
      <div className="sidebar right"></div>
    </>
  );
}
