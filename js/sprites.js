define(['text!../sprites/projectile.json','text!../sprites/splash.json','text!../sprites/target.json',], function() {
    // Load list of sprites
    var sprites = {};
    
    _.each(arguments, function(spriteJson) {
        var sprite = JSON.parse(spriteJson);
        sprites[sprite.id] = sprite;
    });
    
    return sprites
});