define(['Entity'], function(Entity) {

var Splash = Entity.extend({
    init: function(x,y) {
        this._super();
        this.setPosition(x,y);
        
        this.setSprite("splash");
        this.setAnimation("fade",80);
        
        this.startTime = new Date().getTime();

        this.duration = 500;

    },
    
    update: function() {
        var now = new Date().getTime();
        var dt = (now - this.lastTime)/1000;
        this.lastTime = now;
        this.currentAnimation.update(now);
        
        this.setDestroy(now - this.startTime > this.duration);
    }
    
});
return Splash;

});