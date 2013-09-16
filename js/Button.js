define(['Clickable'], function(Clickable) {

    var Button = Clickable.extend({
        init: function(x,y,text,height,centered,font) {
            this._super();
            
            this.font = typeof font !== 'undefined' ? font : "15px Courier";
            
            this.width = 0;
            this.height = height;
            this.text = text;
            
            this.centered = centered;
            this.setPosition(x,y);
            
            
            
        },
        
        adjustWidth: function(ctx) {
            var x = this.x;
            this.width = ctx.measureText(this.text).width + 10;
            if(this.centered) {
                x -= this.width/2;
            }
            this.setPosition(x, this.y);
        },
        
        action: function(evt) {
            // Check whether click was inside button area
            return function() { this.reset(); }
        }
        
        
    });
    return Button;

});