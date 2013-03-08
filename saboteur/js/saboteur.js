var container = document.getElementById('container');
var canvas = document.getElementById('main-board');
var ctx = canvas.getContext('2d');
var scroller = null;

function initBoard() {
  scroller = new Scroller(function(left, top, zoom) {
    console.log('left: '+left+' / top:'+top+' / zoom:'+zoom);
    ctx.fillStyle = 'rgb(0,125,0)';
    ctx.fillRect(20, 20, 55, 50);
    console.log('Done creating scroller');
  });

  scroller.setDimensions(400, 300, 3000, 3000);
}

var mousedown = false;

container.addEventListener("mousedown", function(e) {
  if (e.target.tagName.match(/input|textarea|select/i)) {
    return;
  }
  
  scroller.doTouchStart([{
    pageX: e.pageX,
    pageY: e.pageY
  }], e.timeStamp);

  mousedown = true;
}, false);

document.addEventListener("mousemove", function(e) {
  if (!mousedown) {
    return;
  }
  
  scroller.doTouchMove([{
    pageX: e.pageX,
    pageY: e.pageY
  }], e.timeStamp);

  mousedown = true;
}, false);

document.addEventListener("mouseup", function(e) {
  if (!mousedown) {
    return;
  }
  
  scroller.doTouchEnd(e.timeStamp);

  mousedown = false;
}, false);