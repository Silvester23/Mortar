define(['lib/jquery'], function($) {
    var Renderer = Class.extend({
        init: function(game) {
            
            this.game = game;
            this.lastFrame = new Date().getTime();
            this.lastTime = this.lastFrame;
            
            // Canvas and Context
            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');

            // Backbuffer and -context
            this.backBuffer = document.createElement('canvas');
            this.backBuffer.width = this.canvas.width;
            this.backBuffer.height = this.canvas.height;
            this.backBuffercontext = this.backBuffer.getContext('2d');
            
            this.frameCount = 0;
            this.realFPS = 0;
            
            // temp solution
            this.pit = new Image();
            this.pit.src = "img/pit.png";
            
            
        },
        
        drawEntities: function() {
            var self = this;
            
            // calculate the time since the last frame
            var thisFrame = new Date().getTime();
            var dt = (thisFrame - this.lastFrame)/1000;
            this.lastFrame = thisFrame;            
            
            // Draw all game objects
            this.game.forEachEntity(function(entity) {
                self.drawEntity(entity,self.backBuffercontext);
            });
            
            
        
        },
        
        drawEntity: function(entity,context) {
            var sprite = entity.sprite;
            var anim = entity.currentAnimation;
            
            if(anim && sprite) {
                var frame = anim.currentFrame,
                x = frame.x,
                y = frame.y,
                w = sprite.width,
                h = sprite.height,
                dx = entity.x,
                dy = entity.y;
                
            }
            
            context.save();
            context.translate(dx,dy);
            context.drawImage(sprite.image, x, y, w, h, 0, 0, w, h);
            context.restore();
            
        },
        
        drawText: function(text, x, y, font, align, ctx) {
            var font = typeof font !== 'undefined' ? font : '15px Courier';
            var ctx = typeof ctx !== 'undefined' ? ctx : this.backBuffercontext;
            ctx.save();
            if(typeof align !== 'undefined') {
                ctx.textAlign = align;
            }
            ctx.font = font;
            ctx.fillStyle = "black";
            ctx.fillText(text,x,y)
            ctx.restore();

        },
        
        renderFrame: function(hud) {
            var hud = typeof hud !== 'undefined' ? hud : true;
            // Clear contexts
            this.backBuffercontext.clearRect(0,0,this.backBuffer.width,this.backBuffer.height);
            this.context.clearRect(0,0,this.backBuffer.width,this.backBuffer.height);
            
            // Draw Pit
            this.backBuffercontext.drawImage(this.pit, canvas.width/2 - 32, canvas.height/2 - 28);
            
            // Draw visible entities
            this.drawEntities();
            
            // draw Hud
            if(hud) {
                player = this.game.player;
                this.drawText("Score: " + player.getScore(), 5,15);
                this.drawText("Ammo: " + player.getAmmo(), 5,30);
            }
            
            // Debug FPS
            this.drawFPS();
            
            // Copy buffer to canvas
            this.context.drawImage(this.backBuffer,0,0);
        },
        
        
        drawRect: function(x,y,w,h,ctx) {
            ctx.fillRect(x,y,w,h);
        },
        
        clearRect: function(x,y,w,h,ctx) {
            ctx.clearRect(x,y,w,h);
        },
        
        drawEndScreen: function() {
            this.renderFrame(false);
            ctx = this.context;
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(100,100,440,280);
            ctx.lineWidth = 2.0;
            ctx.strokeRect(100,100,440,280);
            ctx.restore();
            
            player = this.game.player;
            
            this.drawText("Game Over.",320,210,"25px Courier","center",ctx);
            this.drawText("Score: " + player.getScore(),320,250,"15px Courier","center",ctx);
            
            
 
        },
        
        drawButton: function(button) {
            ctx = this.context;
            ctx.save();
            ctx.font = button.font;
            button.adjustWidth(ctx);
            ctx.strokeRect(button.x,button.y,button.width,button.height);
            this.drawText(button.text, button.x + button.width/2, button.y + button.height*2/3 ,'undefined','center',ctx);
            ctx.restore();
            
        },
        
        drawFPS: function() {
            var nowTime = new Date(),
                diffTime = nowTime.getTime() - this.lastTime;

            if (diffTime >= 1000) {
                this.realFPS = this.frameCount;
                this.frameCount = 0;
                this.lastTime = nowTime;
            }
            this.frameCount++;
        
            //this.drawText("FPS: " + this.realFPS + " / " + this.maxFPS, 30, 30, false);
            this.drawText("FPS: " + this.realFPS, 5, 90);
        }
    });
    return Renderer;
});