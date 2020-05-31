//
// Canvas tutorial from MDN
//


// in HTML, setup example ...
// <body onload="draw();">
// ... or any event handler (besides draw()) like window.setTimeout() ...

function draw() {

    // multiple contexts for 2d, 3d, OpenGL ...
    var canvas = document.getElementById('tutorial');

    // test if supported in the browser
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // drawing examples
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(25, 25, 50, 50);

        // ... 2 primitives: rects and paths 
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);

        // paths are a list of points, connnected segments; curved or not
        // shapes with paths:
        //   1. create path
        //   2. drawing commands to draw path
        //   3. stroke or fill to render it

        // here is a triangle
        ctx.fillStyle = 'rgba(120, 0, 50, 0.8)';
        ctx.beginPath();
        ctx.moveTo(75, 50); // 1st path command treated a moveTo anyways
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();

        // a face
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.stroke();
    }

}
