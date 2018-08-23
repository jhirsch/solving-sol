/*

    Wall Drawing #118 (1971)
    On a wall surface, any continuous stretch of wall, using a hard pencil, place fifty points at random. 
    The points should be evenly distributed over the area of the wall. All of the points should be connected by straight lines.

*/

var points = [];

function createPoints(){
    for(var i = 0;i < 50;i++){
        var x = Math.round(Math.random() * paper.view.bounds.right);
        var y = Math.round(Math.random() * paper.view.bounds.bottom);
        points[i] = new Point(x,y);
        // /* draw points
        var p = new Path.Circle({
            center: points[i], 
            radius: 2,
            fillColor: new Color (.5,.5,.5,.25)
        });
        // */
    }
}

function drawLines(){
    var pTo = points.slice(0);
    for(var i = 0;i < points.length;i++){
        var p = pTo.shift();
        for(var j = 0; j < pTo.length;j++){
            var l = new Path.Line({
                from: points[i],
                to: pTo[j],
                strokeColor: new Color (.5,.5,.5,.25)
            });
        }
    }
}

function onResize() {
    // Handle resizes
    // Paper.js will call this handler automatically on resize.
}

function drawIt(){
    createPoints();
    drawLines();
}

function reset(){
    paper.project.clear();
    points = [];
}

function init() {
    drawIt();
}

tool.onKeyDown = function(evt){
    if(evt.key == 'space'){
        reset();
        drawIt();
    }
}


// This will fire when Paper.js is ready
init();

