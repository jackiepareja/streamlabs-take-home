(function init() {
  const CANVAS = document.getElementById("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  const DOG_IMG = new Image();
  const CAT_IMG = new Image();
  DOG_IMG.src = "./assets/dog.png";
  CAT_IMG.src = "./assets/cat.png";

  CANVAS.width = 0.8 * CANVAS.clientWidth

  CONTEXT.drawImage(
    DOG_IMG, 0, 0, 100, 100, 20, 20
  )
}())