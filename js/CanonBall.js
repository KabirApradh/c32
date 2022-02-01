class CannonBall {
    constructor(x,y) {
        let options = {
            isStatic:true,
            restitution:0.8,
            density:1.0,
            friction:1
        }
        this.r = 40
        this.trajectory = []
        this.body = Bodies.circle(x,y,this.r,options)
        this.image = loadImage("assets/cannonball.png")
        World.add(world,this.body) 
    }   
    display() {
        let pos = this.body.position
        let angle = this.body.angle
        let velocity = this.body.velocity


        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.image,0,0,this.r,this.r)
        pop()

        if (velocity.x > 0 && pos.x > 300) {
            var position = [pos.x,pos.y]
            this.trajectory.push(position)
        }

        for (var i = 0;i < this.trajectory.length;i++) {
            image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }
    }
    shoot() {
        let velocity = p5.Vector.fromAngle(cannon.angle)
        velocity.mult(20)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y})
    }
}