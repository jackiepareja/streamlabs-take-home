(function init() {

  const CANVAS = document.getElementById("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  const DOG_IMG = new Image();
  const CAT_IMG = new Image();

  // starter positions for dog image which is centered
  let currX = CANVAS.width / 2;
  let currY = CANVAS.height / 2;
  let draggable = false;

  const main = () => {
    updateCanvas();
  }

  const clearCanvas = () => {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
  }

  const handleDragEvents = () => {
    CANVAS.addEventListener("mousedown", onMouseDownHandler);
    CANVAS.addEventListener("mousemove", onMouseMoveHandler);
    CANVAS.addEventListener("mouseup", onMouseUpHandler);
  }
  
  const onMouseDownHandler = (evt) => {
    let isXBounds = evt.layerX <= (currX + DOG_IMG.width / 2) && 
      evt.layerX >= (currX - DOG_IMG.width / 2);
    let isYBounds = evt.layerY <= (currY + DOG_IMG.width / 2) && 
      evt.layerY >= (currY - DOG_IMG.width / 2);
    // detect if the click was on the image
    if(isXBounds && isYBounds) {
      draggable = true;
    } 
    else {
      console.log('didnt click image')
    }
  }

  const onMouseMoveHandler = (evt) => {
    if(draggable) {
      currX = evt.layerX;
      currY = evt.layerY;
    }
  }

  const onMouseUpHandler = (evt) => {
    draggable = false;
  }

  const updateCanvas = () => {
    DOG_IMG.src = "./assets/dog.png";
    CAT_IMG.src = "./assets/cat.png";

    window.onload = () => {
      setInterval(() => {
        clearCanvas();
        CONTEXT.drawImage(
          DOG_IMG, currX - DOG_IMG.width / 2,
          currY - DOG_IMG.height / 2)
        CONTEXT.drawImage(
          CAT_IMG, 0, 0
        )
      }, 200)
    }

    // DOG_IMG.onload = () => {
    //   setInterval(() => {
    //     clearCanvas();
    //     CONTEXT.drawImage(
    //       DOG_IMG, currX - DOG_IMG.width / 2, 
    //       currY - DOG_IMG.height /2)
    //   }, 200)}
    
      
    //   CAT_IMG.onload = () => {
    //     setInterval(() => {
    //       CONTEXT.drawImage(
    //         CAT_IMG, 0, 0
    //       )
    //     }, 200)
    //   }
  }

  main();
  handleDragEvents();
}())
