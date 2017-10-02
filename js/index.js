window.onload = function() {
  
  // get the canvas and context and store in vars
  
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");
  
  // set canvas dimensions to window height and width
  
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  
  window.addEventListener("resize", function () {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });
  
  // generate the snowflakes and apply attributes
  
  var mf = 100; // max flakes
  var flakes = [];
  var time = Date.now();
  
  // look through the empty flakes and apply attributes
  
  for (var i = 0; i < mf; i++){
    flakes.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*5+2, //min radius of 2px and max 7px 
      d: Math.random() + 1 //density of the flake
    })
  }
  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (var i = 0; i < mf; i++) {
      var f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    moveFlakes();
    requestAnimationFrame(drawFlakes);
  }
  
  // animate the flakes
  var angle = 0;
  
  function moveFlakes() {
    var now = Date.now();
    var delta = (now - time);
    time = now;

    var tickratio = (delta * (1 / 25));

    angle += 0.01 * tickratio;
    if(angle > Math.PI * 2){
        angle -= Math.PI * 2; //large angle perf.
    }
    
    var dx = Math.sin(angle) * 2;
    
    for(var i = 0; i < mf; i++){
      // store current flake

      var f = flakes[i];

      //update X and Y coordinates for each snowflake

      f.y += (f.d * f.d + 1) * tickratio;
      f.x += dx * 2;

      //if the snowflake reaches the bottom, send a new one to the top

      if (f.y > H) {
          f.x = Math.random() * W;
          f.y = -f.r;
      } else if (f.x < -f.r){
          //snowflake wrapping
          f.x = W;
      }else if(f.x > W){
          f.x = -f.r;
      }
    }
  }
  requestAnimationFrame(drawFlakes);
};
