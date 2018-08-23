/*

    Wall Drawing #11 (1969)

    A wall divided horizontally and vertically into four equal parts. Within each part, three of the four kinds of lines are superimposed.

*/

var midX, midY, maxX, maxY;
var quads = [];
var lineColor = new Color(0.7,0.7,0.7,1);
var increment = 10;
var lineWidth = 1;
var padding = 10;

function setRefs(){
    midX = paper.view.center.x;
    midY = paper.view.center.y;
    maxX = paper.view.size.width;
    maxY = paper.view.size.height;
}

function createGroups(){
    // TL
    quads[0] = new Group([new Path.Rectangle({
        from: [padding * 2,padding * 2],
        to: [midX-padding,midY-padding],
    })]);
    quads[0].clipped = true;

    // TR
    quads[1] = new Group([new Path.Rectangle({
        from: [midX+padding,padding * 2],
        to: [maxX - (padding * 2),midY-padding],
    })]);
    quads[1].clipped = true;

    // BL
    quads[2] = new Group([new Path.Rectangle({
        from: [padding * 2,midY+padding],
        to: [midX-padding,maxY - (padding * 2)],
    })]);
    quads[2].clipped = true;

    // BR
    quads[3] = new Group([new Path.Rectangle({
        from: [midX+padding,midY+padding],
        to: [maxX - (padding * 2),maxY - (padding * 2)],
    })]);
    quads[3].clipped = true;
}

function onResize() {
    // Handle resizes
    // Paper.js will call this handler automatically on resize.
}

function drawVert(g){
    var x = g.bounds.left;
    while(x <= g.bounds.right){
        var p = new Path.Line({
            from: [x,g.bounds.top],
            to: [x,g.bounds.bottom],
            strokeColor: lineColor,
            strokeWidth: lineWidth
        })
        x += increment;
    }
}

function drawHoriz(g){
    var y = g.bounds.top;
    while(y <= g.bounds.bottom){
        var p = new Path.Line({
            from: [g.bounds.left,y],
            to: [g.bounds.right,y],
            strokeColor: lineColor,
            strokeWidth: lineWidth
        })
        y += increment;
    }
}

function drawForwardSlash(g){
    var y = g.bounds.top;
    while(y <= g.bounds.bottom + g.bounds.size.width){
        var l = new Path.Line({
            from: [g.bounds.left,y],
            to: [g.bounds.right,y - g.bounds.size.width],
            strokeColor: lineColor,
            strokeWidth: lineWidth
        })
        g.addChild(l);
        y += increment;
    }  
}

function drawBackSlash(g){
    var y = g.bounds.top - g.bounds.size.width;
    while(y <= g.bounds.bottom){
        var l = new Path.Line({
            from: [g.bounds.left,y],
            to: [g.bounds.right,y + g.bounds.size.width],
            strokeColor: lineColor,
            strokeWidth: lineWidth
        })
        g.addChild(l);
        y += increment;
    } 
}

function fillQuad(g, lineTypes){
    if(lineTypes[0]) drawVert(g);
    if(lineTypes[1]) drawHoriz(g);
    if(lineTypes[2]) drawForwardSlash(g);
    if(lineTypes[3]) drawBackSlash(g);
}

function drawIt(){
    setRefs();
    createGroups();

    for(var i = 0; i < 4;i++){
        var arr = [1,1,1,1];
        var j = Math.floor(Math.random() * 4);
        arr[j] = 0;

        fillQuad(quads[i], arr);
    }
}

function reset(){
    quads = [];
    paper.project.clear();
}

function init() {
    drawIt();

    tool.onKeyDown = function(evt){
        if(evt.key == 'up' || evt.key == 'down' || evt.key == 'left' || evt.key == 'right'){
            paper.project.clear();
            switch(evt.key){
                case 'up':
                    lineWidth++;
                    break;
                case 'down':
                    if(lineWidth > 1) lineWidth--;
                    break;
                case 'right':
                    increment++;
                    break;
                case 'left':
                    if(increment > 1) increment--;
                    break;
            }
            reset();
            drawIt();
        }
    }

}

// This will fire when Paper.js is ready
init();

