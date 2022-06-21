/**
 * TO DO:
 * 1. Add conditional that if both images are touching each other, the top (z-level) is the only clickable one, unless the bottom level one is visible and clickable.
 * 2. Center the canvas without affecting the x, y orientations
 * 3. When clicked and dragged, remove the clear canvas on the image bug
 * 4. Remove the green border re-drawing
 */

(function init() {
  const CANVAS = document.getElementById("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  const DOG_IMG = new Image();
  const CAT_IMG = new Image();
  DOG_IMG.src = "./assets/dog.png";
  CAT_IMG.src = "./assets/cat.png";

  /**
   * Array of all draggable items on the canvas.  
   */ 
  let draggableItems = [
    {
      itemName: "DOG_IMG",
      currX: CANVAS.width / 2,
      currY: CANVAS.height / 2,
      width: DOG_IMG.width,
      height: DOG_IMG.height,
      draggable: false
    },
    {
      itemName: "CAT_IMG",
      currX: 100,
      currY: 100,
      width: CAT_IMG.width,
      height: CAT_IMG.height,
      draggable: false
    }
  ];

  /**
   * Draws and re-draws the items on the canvas.
   */
  window.onload = () => {
    setInterval(() => {
      clearCanvas();
      draw();
    }, 200)
  }

  /**
   * Draws on the canvas.
   */
  const draw = () => {
    for (let item of draggableItems) {
      if(item.itemName === "DOG_IMG") {
        CONTEXT.drawImage(
          DOG_IMG, item.currX - item.width / 2, item.currY - item.height / 2
        )
      }
      if(item.itemName === "CAT_IMG") {
        CONTEXT.drawImage(
          CAT_IMG, item.currX - item.width / 2, item.currY - item.height / 2
        )
      }
    }
  }

  /**
   * Clears the canvas.
   */
  const clearCanvas = () => {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
  }

  /**
   * Drag event handlers.
   */
  const handleDragEvents = () => {
    CANVAS.addEventListener("mousedown", onMouseDownHandler);
    CANVAS.addEventListener("mousemove", onMouseMoveHandler);
    CANVAS.addEventListener("mouseup", onMouseUpHandler);
  }
  
  /**
   * @event evt - mouse down event
   */
  const onMouseDownHandler = (evt) => {
    for(let item of draggableItems) {
      let isXBounds = evt.layerX <= (item.currX + item.width / 2) && evt.layerX >= (item.currX - item.width / 2);
      let isYBounds = evt.layerY <= (item.currY + item.width / 2) && evt.layerY >= (item.currY - item.width / 2);
      if(isXBounds && isYBounds) {
        item.draggable = true;
        addGreenBorder(item);
      }
    }
  }

  /**
   * @event evt - mouse move event
   */
  const onMouseMoveHandler = (evt) => {
    for(let item of draggableItems) {
      if(item.draggable) {
        item.currX = evt.layerX;
        item.currY = evt.layerY;
        addGreenBorder(item);
        clearGreenBorder(item);
      }
    }
  }

  /**
   * @event evt - mouse up event
   */
  const onMouseUpHandler = (evt) => {
    for(let item of draggableItems) {
      item.draggable = false;
    }
  }

  /**
   * 
   * @param {object} item - adds green border around clicked item
   */
  const addGreenBorder = (item) => {
    CONTEXT.beginPath();
    CONTEXT.strokeRect(item.currX - item.width / 2, item.currY - item.height / 2, item.width, item.height);
    CONTEXT.lineWidth = 2;
    CONTEXT.strokeStyle = "green";
    CONTEXT.closePath();
    clearGreenBorder(item);
  }

  /**
   * 
   * @param {*} item - removes green border
   */
  const clearGreenBorder = (item) => {
    CONTEXT.clearRect(item.currX - item.width / 2, item.currY - item.height / 2, item.width, item.height);
  }

  // Invoke mouse events immediately.
  handleDragEvents();
}())
