import React, { useRef, useEffect } from 'react';

const ConvasTest = () => {
  const canvasRef = useRef(null);

useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  let isDrawing = false;

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    context.closePath();
  });
}, []);


  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default ConvasTest;
