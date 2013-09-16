define(['Entity'], function(Entity) {

var Projectile = Entity.extend({
    init: function(evt) {
        this._super();
        
        // Initialize position, visuals, target and data
        this.startX = canvas.width/2 - 16;
        this.startY = canvas.height/2 - 16;
        
        this.setPosition(this.startX,this.startY);

        this.destX = evt.clientX - 16;
        this.destY = evt.clientY - 16;
        
        this.setSprite("projectile");
        this.setAnimation("spin",50);
        
        this.startTime = new Date().getTime();
        this.lastTime = this.startTime;
             
        this.distance = Math.sqrt(Math.pow(this.startX - this.destX,2) + Math.pow(this.startY - this.destY,2));
        
        // Flight duration
        this.duration = this.distance * 3;
               
        // 3-point-parabola
        this.p1 = [this.destX,this.destY];
        this.p2 = [this.startX,this.startY];
        this.p3 = [(this.x + this.destX) / 2, Math.min(this.y,this.destY) - Math.abs(this.x - this.destX)/2];
    },
    
    update: function() {
        var now = new Date().getTime();
        var dt = (now - this.lastTime)/1000;
        this.lastTime = now;
        this.currentAnimation.update(now);
        this.setDestroy(true);

        if(now - this.startTime < this.duration) {
            // Do not destroy if target has not been reached
            this.setDestroy(false);
            
            var dx = this.destX - this.startX;
            
            var x = this.startX + dx * ((now-this.startTime)/this.duration)
            var y = this.f(x);
            
            this.setPosition(x,y);
        }
        
        
        if(this.x > canvas.width || this.y > canvas.height) {
            // Destroy out of bounds
            this.setDestroy(true);
        }
        
    },
    
    f: function(x) {
        // Calculate y-position
        if(this.p1[0] == this.p2[0] || this.p1[0] == this.p3[0] || this.p2[0] == this.p3[0]) {
            now = new Date().getTime();
            dy = this.destY-this.startY;
            
            return this.startY + dy * ((now-this.startTime)/this.duration)
        }
        else {
            coeffs = solve(this.p1,this.p2,this.p3);
            var a = coeffs[0];
            var b = coeffs[1];
            var c = coeffs[2];
            return a*x*x + b*x + c;
        }
    }
    
});
return Projectile;

});