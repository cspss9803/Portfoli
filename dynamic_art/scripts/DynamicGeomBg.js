class Generate_Shape {

    constructor (shapeName, generate_data) {

        this.shapeName = shapeName;

        this.color = generate_data.color;

        this.canvas = generate_data.canvas;

        this.context = generate_data.context;

        this.size = Math.random() * generate_data.size_range + generate_data.base_size;

        this.x = Math.random() * (this.canvas.width  - this.size * 2) + this.size;

        this.y = Math.random() * (this.canvas.height - this.size * 2) + this.size;

        this.dx = ( Math.random() - 0.5 ) * generate_data.speed;

        this.dy = ( Math.random() - 0.5 ) * generate_data.speed;

        this.width = this.size * 1.5;

        this.height = this.size * 1.5;

    }

    draw () {

        this.context.beginPath();

        if ( this.shapeName === "Rect" ) {

            this.context.moveTo(this.x, this.y);

            this.context.lineTo(this.x + this.width, this.y);

            this.context.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y);

            this.context.lineTo(this.x + this.width, this.y + this.height);

            this.context.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width, this.y + this.height);

            this.context.lineTo(this.x, this.y + this.height);

            this.context.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height);

            this.context.lineTo(this.x, this.y);

            this.context.quadraticCurveTo(this.x, this.y, this.x, this.y);

        } else 

        if ( this.shapeName === "Triangle" ) {

            this.context.moveTo(this.x, this.y);

            this.context.lineTo(this.x + this.size, this.y + this.size * 2);

            this.context.lineTo(this.x - this.size, this.y + this.size * 2);

            this.context.lineJoin = "round";

        } else 

        if ( this.shapeName === "Circle" ) {
            
            this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

        }

        this.context.closePath();

        this.context.shadowBlur = this.size;

        this.context.shadowColor = this.color;

        this.context.lineWidth = this.size * 0.5;

        this.context.strokeStyle = this.color;

        this.context.stroke();

        this.context.fillStyle = this.color;

        this.context.fill();

    }

    update () {

        this.x += this.dx;

        this.y += this.dy;

        if ( this.x + this.width  >= this.canvas.width  || this.x <= 0 ) { this.dx = - this.dx; }

        if ( this.y + this.height >= this.canvas.height || this.y <= 0 ) { this.dy = - this.dy; }

        this.draw();

    }

}

class DynamicGeomBg {

    resizeCanvas ( ) {

        this.canvas.width = document.documentElement.clientWidth + 100;

        this.canvas.height = document.documentElement.clientHeight + 100;

    }

    playOnce ( ) {

        for ( let i = 0; i < this.shapes.length; i++ ) { this.shapes[i].update(); }

    }

    play ( ) {

        this.stop();

        this.animationId = requestAnimationFrame( () => this.play() );

        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

        for ( let i = 0; i < this.shapes.length; i++ ) { this.shapes[i].update(); }

    }

    stop ( ) { cancelAnimationFrame( this.animationId ); }

    constructor ( option ) {

        this.animationId = null;

        this.canvas   = document.getElementById( option.canvasID );

        this.context  = this.canvas.getContext("2d");

        this.shapes   = [];

        this.amount   = option.amount;

        this.speed    = option.speed;

        this.bgColor  = option.bgColor;

        this.triangle = option.triangle;

        this.circle   = option.circle;

        this.rect     = option.rect;

        window.addEventListener( "resize", this.resizeCanvas.bind(this) );

        this.resizeCanvas();

        this.canvas.style.backgroundColor = this.bgColor;

        for ( let i = 0; i < this.amount; i++ ) {

            const generate_data = {

                size_range: 30,

                base_size: 5,

                color: '#ffffff',

                speed: this.speed,

                canvas: this.canvas,

                context: this.context,

            };

            if ( this.triangle.enable ) {

                generate_data.size_range = this.triangle.size_range;

                generate_data.base_size  = this.triangle.base_size;

                generate_data.color      = this.triangle.color;

                this.shapes.push(new Generate_Shape( 'Triangle', generate_data ));

            }

            if ( this.circle.enable ) {

                generate_data.size_range = this.circle.size_range;

                generate_data.base_size  = this.circle.base_size;

                generate_data.color      = this.circle.color;

                this.shapes.push(new Generate_Shape( 'Circle', generate_data ));

            }
            
            if ( this.rect.enable ) {

                generate_data.size_range = this.rect.size_range;

                generate_data.base_size  = this.rect.base_size;

                generate_data.color      = this.rect.color;

                this.shapes.push(new Generate_Shape( 'Rect', generate_data ));

            }

        }

        this.playOnce();

    }

};