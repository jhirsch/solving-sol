/*

## Wall Drawing #328 (1980)

On a black wall, a white circle within which are white vertical parallel lines, 
and a white parallelogram within which are white horizontal parallel lines. 
The vertical lines within the circle do not enter the parallelogram, 
and the horizontal lines within the parallelogram do not enter the circle.

*/

var lineSpacing = 5;
var lineWidth = 1;
var lineAlpha = 1;

function fillHorizontal(g, color){
    var y = g.bounds.top;
    while(y <= g.bounds.bottom){
        var l = new Path.Line({
            from: [g.bounds.left,y],
            to: [g.bounds.right,y],
            strokeColor: color,
            strokeWidth: lineWidth
        })
        l.strokeColor.alpha = lineAlpha;
        g.addChild(l);
        y += lineSpacing;
    }
}

function fillVertical(g, color){
    var x = g.bounds.left;
    while(x <= g.bounds.right){
        var l = new Path.Line({
            from: [x,g.bounds.top],
            to: [x,g.bounds.bottom],
            strokeColor: color,
            strokeWidth: lineWidth
        })
        l.strokeColor.alpha = lineAlpha;
        g.addChild(l);
        x += lineSpacing;
    }
}

function drawIt(){
    // black background
    var bg = new Path.Rectangle({
        from: [0,0],
        to: [paper.view.bounds.right, paper.view.bounds.bottom],
        fillColor: 'black'
    });

    // circle 
    var cMin = 200;
    var cRadius = (Math.random() * ((Math.min(paper.view.bounds.height, paper.view.bounds.width) * .5) - cMin)) + cMin;
    // var cCenterX = cRadius + (Math.random() * (paper.view.bounds.width - (cRadius * 2)));
    // var cCenterY = cRadius + (Math.random() * (paper.view.bounds.height - (cRadius * 2)));
    var circle = new Path.Circle({
        center: paper.view.center,  
        radius: cRadius
    });
    var c2 = circle.clone();
    c2.strokeColor = 'white';
    c2.fillColor = 'black';
    c2.strokeWidth = lineWidth;
    var cGroup = new Group([circle, c2]);
    cGroup.clipped = true;
    fillVertical(cGroup, 'white');

    // parallelogram
    var pMinWidth = 100; 
    var pWidth = (pMinWidth + (Math.random() * ((cRadius * 2) - pMinWidth))) * .5;
    var pMinHeight = 100; 
    var pHeight = (pMinHeight + (Math.random() * ((cRadius * 2) - pMinHeight))) * .5;
    var offsetMin = 20;
    var offset = offsetMin + ((pWidth - offsetMin) * Math.random());
    var pgram = new Path();
    pgram.add(new Point( paper.view.center.x - pWidth + offset, paper.view.center.y - pHeight));
    pgram.add(new Point( paper.view.center.x + pWidth, paper.view.center.y - pHeight));
    pgram.add(new Point( paper.view.center.x + pWidth - offset, paper.view.center.y + pHeight));
    pgram.add(new Point( paper.view.center.x - pWidth, paper.view.center.y + pHeight));
    pgram.closed = true;
    var pgram2 = pgram.clone();
    pgram2.strokeWidth = lineWidth;
    pgram2.strokeColor = 'white';
    pgram2.fillColor = 'black';
    var pgramGroup = new Group([pgram, pgram2]);
    pgramGroup.clipped = true;
    fillHorizontal(pgramGroup, 'white');

}

function onResize() {
    // Handle resizes
    // Paper.js will call this handler automatically on resize.
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
                    lineSpacing++;
                    break;
                case 'left':
                    if(lineSpacing > 1) lineSpacing--;
                    break;
            }
            sections = [];
            drawIt();
        }
    }
    
}



// This will fire when Paper.js is ready
init();

