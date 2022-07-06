import React from 'react'

type CanvasMap = {
    width: number;
    height: number;
}

type GameSettings = {
    x: number;
    y: number;
}

type Coordinates = {
    x: number;
    y: number;
  };

// enum Colors {
//   Red =
// }

function Canvas(settings: GameSettings) {
    
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

    const canvasMap: CanvasMap = {
        width: settings.x,
        height: settings.y,
      }

    React.useEffect(() => {
    
        // randomly picks 2 coordinates
        // let timerStart: boolean = false;
        // setInterval(() => {
        //     placeRandomPixel()
        // }, 1000)
    
        // // Example function should be randomly drawing a random coodindate between the canvas
        // function placeRandomPixel() {
        //   if (!timerStart) {
        //     timerStart = true;
        //   }
    
        //   if (timerStart) {
        //     // start placing a random pixel here
        //     let randX: number = Math.floor(Math.random() * settings.x + 1);
        //     let randY: number = Math.floor(Math.random() * settings.y + 1);
        //     // console.log(`Canvas hit: ${randX},${randY}`);
    
        //     // use the X and Y coordinates to place a random pixel
        //     placePixel({
        //       x: randX,
        //       y: randY
        //     })
        //   }
        // }
    
        function placePixel(coordinates: Coordinates) {
            // console.log("CanvasRef: ", canvasRef);
          if (canvasRef.current) {
            const renderCtx = canvasRef.current.getContext('2d');
            if (renderCtx) {
              var id = renderCtx.createImageData(1,1)
              var d = id.data;
              d[0] = 0; // r
              d[1] = 0; // g
              d[2] = 0; // b
              d[3] = 255; // a (0-255)
              renderCtx.putImageData(id, coordinates.x, coordinates.y);
              // console.log(`Clicked.... ${JSON.stringify(id)}`)
              // renderCtx.fillRect(coordinates.x, coordinates.y, 1,1);
            }
          }
          // const renderCtx = canvasRef.current.getContext('2d');
          // if (renderCtx)
          //   renderCtx?.fillRect(coordinates.x, coordinates.y, 1,1);
        }
    
        let mouseDown: boolean = false;
    
        let start: Coordinates = { x:0, y:0 };
        let end: Coordinates =  { x:0, y:0 };
    
        let canvasOffsetLeft: number = 0;
        let canvasOffsetTop: number = 0;
    
        function handleMouseDown(evt: MouseEvent) {
          mouseDown = true;
          start = {
            x: evt.clientX - canvasOffsetLeft,
            y: evt.clientY - canvasOffsetTop
          }
    
          end = {
            x: evt.clientX - canvasOffsetLeft,
            y: evt.clientY - canvasOffsetTop
          }
        }
    
        function handleMouseUp(evt: MouseEvent) {
          mouseDown = false;
        }
    
        // to draw, might be a power
        function handleMouseMove(evt: MouseEvent) {
          if (mouseDown && context) {
            start = {
              x: end.x,
              y: end.y
            }
    
            end = {
              x: evt.clientX - canvasOffsetLeft,
              y: evt.clientY - canvasOffsetTop
            }
    
            // Draws path 
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.strokeStyle = '#000';
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
          }
        }
    
        function handleMouseClick(evt: MouseEvent) {
          // console.log("click: ", evt);
          placePixel({
            x: evt.offsetX,
            y: evt.offsetY
          })
        }
    
        if (canvasRef.current) {
          const renderCtx = canvasRef.current.getContext('2d');
    
          if (renderCtx) {
            canvasRef.current.addEventListener('click', handleMouseClick);
            // canvasRef.current.addEventListener('mousedown', handleMouseDown);
            // canvasRef.current.addEventListener('mouseup', handleMouseUp);
            // canvasRef.current.addEventListener('mousemove', handleMouseMove);
    
            canvasOffsetLeft = canvasRef.current.offsetLeft;
            canvasOffsetTop = canvasRef.current.offsetTop;
    
            setContext(renderCtx);
          }
        }
    
        return function cleanUp() {
          if(canvasRef.current) {
            canvasRef.current.removeEventListener('click', handleMouseClick);
            // canvasRef.current.removeEventListener('mousedown', handleMouseDown);
            // canvasRef.current.removeEventListener('mouseup', handleMouseUp);
            // canvasRef.current.removeEventListener('mousemove', handleMouseMove);
          }
        }
    
      }, [context])

    return (
        // Div is wrapped in canvas so we can handle CSS with it 
        <div>
            <canvas 
            ref={canvasRef}
            width={settings.x}
            height={settings.y}
            style={{
            border: '2px solid #000',
            marginTop: 10,
            marginLeft:10
            }}/>
        </div> 
    )
}

export default Canvas;