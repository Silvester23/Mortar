define([], function() {
    var Player = Class.extend({
        init: function(game) {
            this.startAmmo = 10;
            this.game = game;
            this.score = 0;
            this.ammo = this.startAmmo;
        },
    
        hasAmmo: function() {
            return (this.ammo > 0);
        },
        
        increaseScore: function() {
            this.score += 1;
        },
        
        reduceAmmo: function() {
            if(this.ammo > 0) {
                this.ammo -= 1;
            }
        },
        
        getScore: function() {
            return this.score;
        },
        
        getAmmo: function() {
            return this.ammo;
        },
        
        reset: function() {
            this.ammo = this.startAmmo;
            this.score = 0;
        }
        
        });
    return Player;
});