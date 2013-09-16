requirejs(['Game','lib/jquery'],
function(Game) {
    $canvas = $('canvas');
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    game = new Game();
    game.start();
}
)