//get canvas variable from document
var canvas = document.querySelector('canvas');
    canvasLeft = canvas.offsetLeft;
    canvasTop = canvas.offsetTop;
    elements = [];

var homePage = document.getElementById('home');


//reference canvas width and set it equal to the window inner width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




//reference get "drawing" Context library
var c = canvas.getContext('2d');




//Jquery library
//display nothing on website

//website transition

$('body').css('display','none');
	$(document).ready(function() {
        //fade in website
		$('body').fadeIn(5000);
        
        //on a tag click event
		$('a').on('click',function(event){
			var thetarget = this.getAttribute('target')
            var thehref = this.getAttribute('href')
            //if the target is opening in a new window
			if ((thetarget != "_blank") && (thehref != "#")){			
				event.preventDefault();
				$('body').fadeOut(3000, function(){
					//alert(thehref)
					window.location = thehref					
				});
			}
		});
	});
	setTimeout(function(){
		$('body').fadeIn();
	},1000)




//mouse variable
var mouse = {
    x: undefined,
    y: undefined
    
}




// minimum and maximum radius of circles upon nearing mouse position
var maxRadius = 60;
var minRadius = 10;








//mouse position recording
window.addEventListener('mousemove', 
    function(event) {
    //console.log(mouse);
    mouse.x = event.x;
    mouse.y = event.y;
    
});



//S/N only the window has a console
//resize canvas
window.addEventListener('resize', function() {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    
    init();
});


//circle object that has its own arguments and subsequent variables
//circle function

function getDistance(x1,y1,x2,y2){
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    
    
    
}


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color='white';
    
    
    this.draw = function() {
        //console.log('circle');
        c.beginPath();
        c.font = "20px Montserrat";
        c.fillStyle = 'rgba(0, 0, 0, 1)';
        c.textAlign = "center";
//        c.fillText("me",this.x, this.y+6);

        
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle='black';
        c.lineWidth='5';
        c.stroke();
        c.globalCompositeOperation='destination-over';
        
//        if ((mouse.x = this.x) && (mouse.y = this.y)){
//            
//            onclick = function(){
//                window.location = "https://www.w3schools.com"
//            
//        };
//            
//        }
//   
        c.beginPath();
        c.lineWidth="1";
        c.strokeStyle="rgba(0, 0, 0, 0.15)";
        
        //map this to a static circle
        c.moveTo(innerWidth/2, innerHeight/2);
        c.lineTo(this.x,this.y);
        c.stroke();
        
        
        
    }
    
    this.update = function(){ 
        //if the x cordinate of the cirlce plus it's radius becomes greater than innerwidth "of the canvas" which is the innerwidth of the window then reverse it's "velocity" and it's origin being 0 coordinate where as innerwidth is the "max" value of the window
        
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
        }
    
        // increment x and y by the value/variable dx and or dy by it's set value every frame
        this.x += this.dx;
        this.y += this.dy;
        
        
        
        //interactivity 
        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            
            if (this.radius < maxRadius){
                this.radius +=1;
            }
            
        } else if (this.radius > this.minRadius) {
            
            this.radius -= 1;
        }
        
        //draw
        
        this.draw();
    
    }
}






//circle array
var circleArray = [];





//initialize array function
function init() {
    
    circleArray = [];
    
    for (var i = 0; i < 15; i++){
    
    
        var radius = Math.random() * 20 + 1;
    
        //coordinate
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;

        // velocity
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;

    
        circleArray.push(new Circle(x, y, dx, dy, radius));
//        circleArray.push(new Circle(x, y, dx, dy, radius));
    
    }
}



//animate function
function animate() {
    requestAnimationFrame(animate);
    //console.log('power');
    
    //clear canvas
    c.clearRect(0,0,innerWidth,innerHeight)
    
    
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
        
    }
    
    
    
};






init();
animate();
