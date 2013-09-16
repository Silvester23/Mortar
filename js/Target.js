define(['Entity'], function(Entity) {

var Target = Entity.extend({
    init: function(x,y) {
        this._super();
        
        //Set default values
        x = typeof x !== 'undefined' ? x : 32+Math.round(Math.random()*(canvas.width-64));
        y = typeof y !== 'undefined' ? y : 32+Math.round(Math.random()*(canvas.height-64));
        this.setPosition(x,y);
        
        this.setSprite("target");
        this.setAnimation("idle",80);
        
        this.startTime = new Date().getTime();
        this.speed = 200;

        this.lastTime = new Date().getTime();
        this.updateDirection();      
        
        this.lastDirChange = this.lastTime;
    },
    
    update: function() {
        var now = new Date().getTime();
        var dt = (now - this.lastTime)/1000;
        this.lastTime = now;
        this.currentAnimation.update(now);
        

        // Change Direction at most every second
        /*if(now - this.lastDirChange > 1000) {
            this.updateDirection();
        }*/
        
        // Out of Bounds
        this.dirX = this.x <= 0 ? 1 : this.dirX;
        this.dirX = this.x >= canvas.width - this.sprite.width ? -1 : this.dirX;
        
        this.dirY = this.y <= 0 ? 1 : this.dirY;
        this.dirY = this.y >= canvas.height - this.sprite.height ? -1 : this.dirY;
        
        // Randomly move Target
        this.x += this.dirX * this.speed * dt;
        this.y += this.dirY * this.speed * dt;
        
        
    },
    
    updateDirection: function() {
        // Get new random directions
        this.dirX = Math.random() < 0.5 ? -1 : 1;
        this.dirY = Math.random() < 0.5 ? -1 : 1;
        this.lastDirChange = new Date().getTime();
    }
    
});
return Target;

});