/*

    ## Wall Drawing #392 (1983)

    A 12" (30 cm) grid covering the black wall. 
    Within each 12" (30 cm) square, a vertical, horizontal, diagonal right or diagonal left line bisecting the square. 
    All squares are filled. (The direction of the line in each square is determined by the drafter)

*/

var sqSize = 40;
var halfSize = sqSize * .5;
var lineWidth = 1;

function drawIt(){
    // black background
    var bg = new Path.Rectangle({
        from: [0,0],
        to: [paper.view.bounds.right, paper.view.bounds.bottom],
        fillColor: 'black'
    })

    // figure out starting x
    var row = 0;
    var y = (paper.view.size.height % sqSize) * .5;
    while(y < paper.view.size.height - sqSize){
        var x = (paper.view.size.width % sqSize) * .5;
        while(x <= paper.view.size.width - sqSize){
            var i = Math.floor(Math.random() * 4);
            var from, to;
            switch (i){
                // horizontal
                case 0:
                    from = new Point(x, y + halfSize);
                    to = new Point(x + sqSize, y + halfSize);
                    break;
                // vertical
                case 1:
                    from = new Point(x + halfSize, y);
                    to = new Point(x + halfSize, y + sqSize);
                    break;
                // diagonal right
                case 2:
                    from = new Point(x, y + sqSize);
                    to = new Point(x + sqSize, y);
                    break;
                // diagonal left
                case 3:
                    from = new Point(x, y);
                    to = new Point(x + sqSize, y + sqSize);
                    break;
            }
            var line = new Path.Line({
                from: from,
                to: to,
                // strokeColor: new Color(.8,.8,.8)
                strokeColor: 'white',
                strokeWidth: lineWidth
            })
            x += sqSize;
        }
        y += sqSize;
    }
}

function onResize() {
    // Handle resizes
    // Paper.js will call this handler automatically on resize.
}

function init() {
    drawIt();
}

function reset(){
    paper.project.clear();
}

tool.onKeyDown = function(evt){
    if(evt.key == 'space' || evt.key == 'up' || evt.key == 'down'){
        switch(evt.key){
            case 'up':
                lineWidth++;
                break;
            case 'down':
                if(lineWidth > 1) lineWidth--;
                break;
        }       
        reset();
        drawIt();
    }
}

// This will fire when Paper.js is ready
init();

