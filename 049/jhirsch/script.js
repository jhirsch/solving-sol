/*

    ## Wall Drawing #49 (1970)

    A wall divided equally into fifteen equal parts, each with a different line direction and color, and all combinations.

    Red, Yellow, Blue, Black pencil

*/

var sections = [];
var lineSpacing = 8;
var lineWidth = 2;

function fill1(g){
    var x = g.bounds.left;
    while(x <= g.bounds.right){
        var l = new Path.Line({
            from: [x,g.bounds.top],
            to: [x,g.bounds.bottom],
            strokeColor: 'black',
            strokeWidth: lineWidth
        })
        l.strokeColor.alpha = 0.5;
        x += lineSpacing;
    }
}

function fill2(g){
    var y = g.bounds.top;
    while(y <= g.bounds.bottom){
        var l = new Path.Line({
            from: [g.bounds.left,y],
            to: [g.bounds.right,y],
            strokeColor: 'yellow',
            strokeWidth: lineWidth
        })
        l.strokeColor.alpha = 0.5;
        y += lineSpacing;
    }
}

function fill3(g){
    var y = g.bounds.top;
    while(y <= g.bounds.bottom + g.bounds.size.width){
        var l = new Path.Line({
            from: [g.bounds.left,y],
            to: [g.bounds.right,y - g.bounds.size.width],
            strokeColor: 'red',
            strokeWidth: lineWidth
        })
        l.strokeColor.alpha = 0.5;
        y += lineSpacing;
    }  
}

function fill4(g){
    var y = g.bounds.top - g.bounds.size.width;
    while(y <= g.bounds.bottom){
        var l = new Path.Line({
            from: [g.bounds.left,y],
            to: [g.bounds.right,y + g.bounds.size.width],
            strokeColor: 'blue',
            strokeWidth: lineWidth
        })
        l.strokeColor.alpha = 0.5;
        y += lineSpacing;
    } 
}

function createSections(){
    var sectionWidth = paper.view.size.width / 15;
    var sectionHeight = paper.view.size.height;
    for(var i = 0;i < 15;i++){
        var x = i * sectionWidth;
        sections[i] = new Group([new Path.Rectangle({
            from: [x,0],
            to: [x + sectionWidth,sectionHeight],
            strokeColor: 'black'
        })]);
        sections[i].clipped = true;
    }
}

function drawIt(){
    fill1(sections[0]);
    fill2(sections[1]);
    fill3(sections[2]);
    fill4(sections[3]);

    fill1(sections[4]);
    fill2(sections[4]);

    fill1(sections[5]);
    fill3(sections[5]);

    fill1(sections[6]);
    fill4(sections[6]);

    fill2(sections[7]);
    fill3(sections[7]);

    fill2(sections[8]);
    fill4(sections[8]);

    fill3(sections[9]);
    fill4(sections[9]);

    fill1(sections[10]);
    fill2(sections[10]);
    fill3(sections[10]);

    fill1(sections[11]);
    fill2(sections[11]);
    fill4(sections[11]);

    fill1(sections[12]);
    fill3(sections[12]);
    fill4(sections[12]);

    fill2(sections[13]);
    fill3(sections[13]);
    fill4(sections[13]);

    fill1(sections[14]);
    fill2(sections[14]);
    fill3(sections[14]);
    fill4(sections[14]);   
}

function onResize() {
    // Handle resizes
    // Paper.js will call this handler automatically on resize.
}

function init() {
    createSections();
    drawIt();
}

// This will fire when Paper.js is ready
init();

