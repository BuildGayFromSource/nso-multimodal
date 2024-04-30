import { useCallback, useEffect, useRef, useState } from "react";

export default function NewWindow({ title, text, figure, close }) {
  const WindowTitle = title;
  const WindowText = text;

  const isDragging = useRef(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e) => {
      console.log("Down");
      e.preventDefault();
      isDragging.current = true;
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      // Add global event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e) => {
      console.log("Moving:", isDragging);
      if (isDragging.current) {
        const screenWidth = window.innerWidth - 8;
        const screenHeight = window.innerHeight - 8;
        const mouseX = Math.min(Math.max(8, e.clientX), screenWidth);
        const mouseY = Math.min(Math.max(8, e.clientY), screenHeight);
        setPosition({
          x: mouseX - offset.x,
          y: mouseY - offset.y,
        });
      }
    },
    [offset],
  );

  const handleMouseUp = useCallback(() => {
    console.log("Up");
    isDragging.current = false;
    // Remove global event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    return () => {
      // Clean up global event listeners when the component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  const imageStyle = {
    maxWidth: "100%", // Ensure the image shrinks to fit within the container
    maxHeight: "100%", // Ensure the image shrinks to fit within the container
  };

  return (
    <article style={style}>
      <div className="heading" onMouseDown={handleMouseDown}>
        <p>{WindowTitle}</p>
        <button onClick={close}>X</button>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: WindowText }}
      />
      {figure && (
        <div className="image-container">
          <img src={figure} alt="Figure" className="image" style={imageStyle} />
        </div>
      )}
    </article>
  );
}
