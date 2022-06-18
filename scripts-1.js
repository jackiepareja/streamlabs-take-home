function init() {
  const CANVAS = document.getElementById('canvas');
  const CONTEXT = canvas.getContext('2d');
  let pieces = [];
  let SELECTED_PIECE = null;

  let isDragging = false;

  const imageDog = new Image();

  const createShape = (leftX, topY, width, height, backgroundColor) => {
    CONTEXT.fillStyle = backgroundColor;
    CONTEXT.fillRect(leftX, topY, width, height);
  }
  //  create canvas
  createShape(0, 0, CANVAS.width, CANVAS.height, '#FAF7F8');

  // renders dog image
  imageDog.onload = function() {
    CONTEXT.drawImage(imageDog, 20, 20, 150, 150);
  }
  imageDog.src = './assets/dog.png';
  imageDog.class = "imageDog";

  // Drag start
  function handleMouseDown(e) {
    // let xCoord = e.clientX - CANVAS.offsetLeft;
    // let yCoord = e.clientY - CANVAS.offsetTop;
    // isDragging = true;

    SELECTED_PIECE = getPressedPiece(e);
  }

  // Drag end
  function handleMouseUp(e) {
    let xCoord = e.clientX - CANVAS.offsetLeft;
    let yCoord = e.clientY - CANVAS.offsetTop;
    isDragging = false;
    console.log('clientX', e.clientX);
    console.log('offset', CANVAS.offsetLeft)
  }

  // Clear canvas and draw the image at the mouse position
  function handleMouseMove(e) {
    let xCoord = e.clientX - CANVAS.offsetLeft;
    let yCoord = e.clientY - CANVAS.offsetTop;
    if (isDragging) {
      CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
      CONTEXT.drawImage(imageDog, xCoord, yCoord, 150, 150)
    }
  }

  CANVAS.addEventListener('mousedown', handleMouseDown)
  CANVAS.addEventListener('mouseup', handleMouseUp)
  CANVAS.addEventListener('mousedown', handleMouseMove)

}

window.addEventListener('load', init);










  //const imageCat = new Image();
  // renders cat image
  // imageCat.onload = function() {
  //   CONTEXT.drawImage(imageCat, 100, 300, 150, 150)
  // }
  // imageCat.src = './assets/cat.png';

  // const colorCircle = (centerX, centerY, radius, drawColor) => {
  //   CONTEXT.fillStyle = drawColor;
  //   CONTEXT.beginPath();

  //   CONTEXT.arc(centerX, centerY, radius, 0, Math.PI * 2, true);

  //   CONTEXT.fill();
  // }

  // const drawNet = () => {
  //   for (let i = 0; i < canvas.height; i+= 40) {
  //     createShape(canvas.width / 2 -1, i, 2, 20, "red");
  //   }
  // }

  // drawNet();

  // colorCircle(300, 600, 10, "red");
  // CONTEXT.fillText("GO", 300, 600, "white" )
