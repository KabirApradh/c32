class Boat {
    constructor(x,y,w,h,boatPos,boatAnimation) {
        let options ={
            restitution: 0.8,
            friction:1,
            density:1.0
        }
        this.w = w
        this.h = h
        this.boatPos = boatPos
        this.animation = boatAnimation
        this.speed = 0.05
        this.body = Bodies.rectangle(x,y,this.w,this.h,options)
        this.image = loadImage("assets/boat.png")
        World.add(world,this.body)        
    }

    animate() {
        this.speed += 0.05 % 1.1 
    }

    display() {
        var angle = this.body.angle
        var pos = this.body.position
        var index = floor(this.speed % this.animation.length)

        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.animation[index],0,this.boatPos,this.w,this.h)
        pop()
    }

}