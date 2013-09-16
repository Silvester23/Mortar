define(['Projectile','Renderer','Splash', 'Target','Player','Button','Clickable',], function(Projectile,Renderer,Splash,Target,Player,Button,Clickable) {
    var Game = Class.extend({
    init: function() {
        var self = this;
        
        // Array of game objects
        this.entities = new Array();
        
        // Create Renderer
        this.renderer = new Renderer(this);
        
        // Create Player
        this.player = new Player(this);
        
        // Handle User Input
        $canvas.click(function(evt){
            self.click(evt);
        });

        
    },
    
    forEachEntity: function(callback) {
            _.each(this.entities, function(entity) {
                callback(entity);
            });
        },
    
    setRenderer: function(renderer) {
        this.renderer = renderer;
    },
    
    addEntity: function(entity) {
        this.entities.push(entity);
    },
    
    removeEntity: function(entity) {
        this.entities = deleteIndex(this.entities,this.entities.indexOf(entity));
    },
    
    click: function(evt) {
        var self = this;
        var offset = $canvas.offset();
        evt.clientX -= offset.left;
        evt.clientY -=  offset.top;
        var player = this.player;
        if(player.hasAmmo()) {
            projectile = new Projectile(evt);
            this.addEntity(projectile);
            player.reduceAmmo();
        } else if(this.endScreenShowing) {
            this.forEachEntity(function(entity) {
                
                if(entity instanceof Clickable) {
                    var clickCallback = entity.click(evt);
                    if(clickCallback) {
                        clickCallback.apply(self);
                    }
                }
            });
        }
        
    },
    
    start: function() {
        // Set all stop-variables to false
        this.endScreenShowing = false;
        this.isStopped = false;
        this.stopping = false;
        
        // Create first Target
        target = new Target();
        this.addEntity(target);
        
        this.tick();
        
        console.log("Game started");
    },
    
    stop: function() {
        var self = this;
        // Stop if all projectiles and splashes have been destroyed, otherwise set flag to try again
        var stop = true;
        this.forEachEntity(function(entity) {
            if(entity instanceof Projectile || entity instanceof Splash) {
                stop = false;
                self.stopping = true;
            }
        });
        if(stop) {
            console.log("Game stopped.");
            this.isStopped = true;
        }
    },
    
    reset: function() {
        this.hideEndScreen();
        
        // Clear entities
        this.entities.length = 0;
        
        this.player.reset();
        this.start();
    },
    
    updateEntity: function(entity) {
        var self = this;
        if(entity.update) {
            entity.update();
        }
        if(entity.destroy) {
            // Destroy all flagged entities
            self.removeEntity(entity);
            
            if(entity instanceof Projectile) {
                // If destroyed object is a projectile, create a Splash and check for collision with target
                
                // Get impact position
                var impactX = entity.destX + entity.sprite.width/2;
                var impactY = entity.destY + entity.sprite.height/2;
                
                //Create Splash
                splash = new Splash(impactX-32, impactY-32);
                self.addEntity(splash);
                
                self.forEachEntity(function(entity) {
                    if(entity instanceof Target) {
                        // Collision?
                        if((entity.x < impactX && impactX < entity.x+entity.sprite.width)
                        && (entity.y < impactY+2 && impactY+2 < entity.y+entity.sprite.height)) {
                        
                            player.increaseScore();
                        
                            // Destroy Target and create a new one if player still has ammo
                            entity.setDestroy(true);
                            if(self.player.hasAmmo()) {
                                target = new Target();
                                self.addEntity(target);
                            }
                        }
                    }
                });
                
            }
        }
    },
    
    updateEntities: function() {
        // Update all entities
        
        this.forEachEntity(this.updateEntity.bind(this));    
    },
    
    tick: function() {
        // Loop function
        var player = this.player;
        this.renderer.renderFrame();
        this.updateEntities();
        
        // Loop if game is running, try to stop if necessary
        if(!this.isStopped) {
            requestAnimFrame(this.tick.bind(this));
            if(!player.hasAmmo() || this.stopping) {
                this.stop();
            }
        } else {
            this.showEndScreen();
        }
    },
    
    showEndScreen: function() {
        this.renderer.drawEndScreen();
        button = new Button(320,290.5,"Restart",20,true);
        this.addEntity(button);
        this.renderer.drawButton(button);
        
        this.endScreenShowing = true;
    },
    
    hideEndScreen: function() {
        this.removeEntity(button);
    }
    
    });
return Game;
});
