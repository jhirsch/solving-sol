/*

## Wall Drawing #340 (1980)

Six-part drawing. The wall is divided horizontally and vertically into six equal parts. 
1st part: On red, blue horizontal parallel lines, and in the center, a circle within which are yellow vertical parallel lines; 
2nd part: On yellow, red horizontal parallel lines, and in the center, a square within which are blue vertical parallel lines; 
3rd part: On blue, yellow horizontal parallel lines, and in the center, a triangle within which are red vertical parallel lines; 
4th part: On red, yellow horizontal parallel lines, and in the center, a rectangle within which are blue vertical parallel lines; 
5th part: On yellow, blue horizontal parallel lines, and in the center, a trapezoid within which are red vertical parallel lines; 
6th part: On blue, red horizontal parallel lines, and in the center, a parallelogram within which are yellow vertical parallel lines. 
The horizontal lines do not enter the figures.

*/

var padding = 8;
var lineSpacing = 5;
var lineWidth = 1;
var lineAlpha = 1;
var sections = [];
var bgColors = ['red','yellow','blue'];
var sectionWidth, sectionHeight;

function createSections(){
    sectionWidth = ((paper.view.size.width - (padding * 4)) / 3);
    sectionHeight = ((paper.view.size.height - (padding * 3)) * .5);
    var x = padding;
    var y = padding;
    for(var i = 0;i < 3;i++){
        sections[i] = new Group([new Path.Rectangle({
            from: [x,y],
            to: [x + sectionWidth, y + sectionHeight],
            fillColor: bgColors[i]
        })]);
        x += sectionWidth + padding;
    }
    x = padding;
    y = (padding * 2) + sectionHeight;
    for(var i = 0;i < 3;i++){
        sections[i+3] = new Group([new Path.Rectangle({
            from: [x,y],
            to: [x + sectionWidth,y + sectionHeight],
            fillColor: bgColors[i]
        })]);
        x += sectionWidth + padding;
    }
}

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
    createSections();
    var shapeWidth = sections[1].bounds.width * .6;
    
    // 1st part
    fillHorizontal(sections[0], 'blue');
    // circle with red vertical lines
    var c = new Group([
        new Path.Circle({
            center: sections[0].bounds.center, 
            radius: shapeWidth * .5
        }),
        new Path.Circle({
            center: sections[0].bounds.center, 
            radius: shapeWidth * .5,
            fillColor: 'red'
        })
    ]);
    c.clipped = true;
    fillVertical(c, 'yellow');

    // 2nd part
    fillHorizontal(sections[1], 'red');
    // square with blue vert lines
    var fromX = sections[1].bounds.left + ((sections[1].bounds.width - shapeWidth) * .5);
    var fromY = sections[1].bounds.top + ((sections[1].bounds.height - shapeWidth) * .5);
    var sq = new Group([
        new Path.Rectangle({
            from: [fromX, fromY],
            to: [fromX + shapeWidth, fromY + shapeWidth]
        }),
        new Path.Rectangle({
            from: [fromX, fromY],
            to: [fromX + shapeWidth, fromY + shapeWidth],
            fillColor: 'yellow'
        }),
    ]);
    c.clipped = true;
    fillVertical(sq, 'blue');

    // 3rd part
    fillHorizontal(sections[2], 'yellow');
    // triangle with red vert lines
    var tLeft = sections[2].bounds.left + ((sections[2].bounds.width - shapeWidth) * .5);
    var tBottom = sections[2].bounds.top + ((sections[2].bounds.height - shapeWidth) * .5) + shapeWidth;
    var triangle = new Path();
    triangle.add(new Point(tLeft,tBottom));
    triangle.add(new Point(tLeft + (shapeWidth * .5), tBottom - shapeWidth));
    triangle.add(new Point(tLeft + shapeWidth, tBottom));
    triangle.closed = true;
    triangle.fillColor = 'blue';
    var t2 = triangle.clone();
    var tGroup = new Group([triangle, t2]);
    tGroup.clipped = true;
    fillVertical(tGroup, 'red');

    // 4th part
    fillHorizontal(sections[3], 'yellow');
    // rectangle with blue vert lines
    var rectWidth = shapeWidth * 1.25;
    var fromX = sections[3].bounds.left + ((sections[3].bounds.width - rectWidth) * .5);
    var fromY = sections[3].bounds.top + ((sections[3].bounds.height - shapeWidth) * .5);
    var rect = new Group([
        new Path.Rectangle({
            from: [fromX, fromY],
            to: [fromX + rectWidth, fromY + shapeWidth]
        }),
        new Path.Rectangle({
            from: [fromX, fromY],
            to: [fromX + rectWidth, fromY + shapeWidth],
            fillColor: 'red'
        }),
    ]);
    rect.clipped = true;
    fillVertical(rect, 'blue');
    
    // 5th part
    fillHorizontal(sections[4], 'blue');
    // trapezoid with red vert lines
    var leftX = sections[4].bounds.left + ((sections[4].bounds.width - shapeWidth) * .5);
    var topY = sections[4].bounds.top + ((sections[4].bounds.height - shapeWidth) * .5);
    var topInset = shapeWidth * .2;
    var trapezoid = new Path();
    trapezoid.add(new Point(leftX + topInset, topY));
    trapezoid.add(new Point((leftX + shapeWidth) - topInset, topY));
    trapezoid.add(new Point(leftX + shapeWidth, topY + shapeWidth));
    trapezoid.add(new Point(leftX, topY + shapeWidth));
    trapezoid.closed = true;
    trapezoid.fillColor = 'yellow';
    var trap2 = trapezoid.clone();
    var trapGroup = new Group([trapezoid, trap2]);
    trapGroup.clipped = true;
    fillVertical(trapGroup, 'red');

    // 6th part
    fillHorizontal(sections[5], 'red');
    // parallelogram with yellow vert lines
    var leftX = sections[5].bounds.left + ((sections[5].bounds.width - shapeWidth) * .5);
    var topY = sections[5].bounds.top + ((sections[5].bounds.height - shapeWidth) * .5);
    var topOffset = shapeWidth * .2;
    var pgram = new Path();
    pgram.add(new Point(leftX + topOffset, topY));
    pgram.add(new Point(leftX + shapeWidth, topY));
    pgram.add(new Point(leftX + shapeWidth - topOffset, topY + shapeWidth));
    pgram.add(new Point(leftX, topY + shapeWidth));
    pgram.closed = true;
    pgram.fillColor = 'blue';
    var pgram2 = pgram.clone();
    var pgramGroup = new Group([pgram, pgram2]);
    pgramGroup.clipped = true;
    fillVertical(pgramGroup, 'yellow');

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

