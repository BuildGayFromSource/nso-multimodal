import { useCallback, useState } from "react";


export default function NewWindow({ title, text, close }) {
  const WindowTitle = title;
  const WindowText = text;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
      setIsDragging(true);
      setOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
      });
  }, [position.x, position.y]);

  const handleMouseMove = useCallback((e) => {
      if (isDragging) {
          setPosition({
              x: e.clientX - offset.x,
              y: e.clientY - offset.y,
          });
      }
  }, [isDragging, offset.x, offset.y]);

  const handleMouseUp = useCallback(() => {
      setIsDragging(false);
  }, []);

  const style = {
      left: `${position.x}px`,
      top: `${position.y}px`,
  };

  return (
        <article style={style} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className="heading" onMouseDown={handleMouseDown}>
          <p>{WindowTitle}</p>
         <button onClick={close}>
            X
            </button> 
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: WindowText }} />
        </article>
  );
}
