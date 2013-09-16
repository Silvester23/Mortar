define(function(){

    var Clickable = Class.extend({
        init: function() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        },
        
        click: function(evt) {
            if(this.x < evt.clientX && evt.clientX < this.x + this.width &&
               this.y < evt.clientY && evt.clientY < this.y + this.height) {
                return this.action();
            }
        },
        
        action: function() {
            // To be overriden by subclasses
        },
        
        setPosition: function(x,y) {
            this.x = x;
            this.y = y;
        }
        
    });
    return Clickable;

});