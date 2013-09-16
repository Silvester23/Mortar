define(['Sprite'], function(Sprite) {
    var Entity = Class.extend({
        init: function() {
            this.x = 0;
            this.y = 0;
            
            // Visuals
            this.sprite = null;
            this.animations = null;
            this.currentAnimation = null;
            this.destroy = false;
        },
        
        setPosition: function(x,y) {
            this.x = x;
            this.y = y;
        },
        
        setSprite: function(name) {
            sprite = new Sprite(name);
            if(this.sprite && this.sprite === sprite) {
                return;
            }
            
            this.sprite = sprite;
            
            this.animations = sprite.createAnimations();
        },
        
        getSprite: function() {
            return this.sprite;
        },
        
        setAnimation: function(name, speed) {
        
            a = this.getAnimationByName(name);
            
            if(a) {
                this.currentAnimation = a;
                this.currentAnimation.setSpeed(speed);
            }
       },
       
       
       getAnimationByName: function(name) {
            var animation = null;
        
            if(name in this.animations) {
                animation = this.animations[name];
            }
            else {
                console.error("No animation called "+ name);
            }
            return animation;
        },
        
        setDestroy: function(v) {
            this.destroy = v;
        }
           
    })
    
return Entity;
});


