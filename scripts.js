(function init() {
  const CANVAS = document.getElementById("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  const DOG_IMG = new Image();
  const CAT_IMG = new Image();
  DOG_IMG.src = "./assets/dog.png";
  CAT_IMG.src = "./assets/cat.png";
  const aspectRatio = 16 / 9;

  /**
   * Array of all draggable items on the canvas.  
   */ 
  let draggableItems = [
    {
      itemName: "DOG_IMG",
      currX: 300,
      currY: 100,
      width: DOG_IMG.width,
      height: DOG_IMG.height,
      draggable: false
    },
    {
      itemName: "CAT_IMG",
      currX: 100,
      currY: 100,
      width: CAT_IMG.height,
      height: CAT_IMG.height,
      draggable: false
    }
  ];

  CANVAS.style.position = "absolute";
  CANVAS.style.left = "0px";
  CANVAS.style.top = "0px";
  CANVAS.width = CANVAS.clientWidth;
  CANVAS.height = CANVAS.clientHeight;

  
  
  /**
   * Draws and re-draws the items on the canvas.
   */
   window.onload = () => {
    setInterval(() => {
      clearCanvas();
      draw();
    }, 200)
  }

  window.addEventListener('resize', function() {
    // FIXME: image currX and currY are not accurate
  })


    /**
     * Draws on the canvas.
     */
    const draw = () => {
      
      for (let item of draggableItems) {
        let imageXPos = item.currX - item.width / 2;
        let imageYPos = item.currY - item.height / 2;
        let imageHeight = item.height;
        let imageWidth = item.width;
        
        if(item.itemName === "DOG_IMG") {
          CONTEXT.drawImage(
            // x and y positions are not accurate
            DOG_IMG, imageXPos, imageYPos, imageWidth, imageHeight
          )
          console.log('height', imageHeight, 'width', imageWidth)
        }
        if(item.itemName === "CAT_IMG") {
          CONTEXT.drawImage(
            CAT_IMG, imageXPos, imageYPos, imageWidth, imageHeight
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
        let isXBounds = evt.layerX - CANVAS.getBoundingClientRect().x <= (item.currX + item.width / 2) && evt.layerX - CANVAS.getBoundingClientRect().x >= (item.currX - item.width / 2);
        let isYBounds = evt.layerY - CANVAS.getBoundingClientRect().y <= (item.currY + item.width / 2) && evt.layerY - CANVAS.getBoundingClientRect().y >= (item.currY - item.width / 2);
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
          item.currX = evt.layerX - CANVAS.getBoundingClientRect().x;
          item.currY = evt.layerY - CANVAS.getBoundingClientRect().y;
          addGreenBorder(item);
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
     * @param {object} item - adds green border around clicked item
     */
    const addGreenBorder = (item) => {
      CONTEXT.beginPath();
      CONTEXT.strokeRect(item.currX - item.width / 2, item.currY - item.height / 2, item.width, item.height);
      CONTEXT.lineWidth = 2;
      CONTEXT.strokeStyle = "green";
      CONTEXT.closePath();
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
