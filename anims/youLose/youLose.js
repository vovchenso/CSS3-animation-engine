var support3D = GG.UTILS.support3D();

var canvasOnClick=function () {
}
function start() {
    var canvas=document.getElementById("canvas");
    jQuery(canvas).click(function() {
        canvasOnClick();
    });
    var sprite=new AdvanceSprite();
    sprite.texts["MESSAGE_MODULE"]=GG.global.message;
    AdvanceSpriteinit(sprite, "/scripts/mex/anims/youLose/youLose.xml");
    while(canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild );
    }
    animations.length=0;
    var a0 = addAnimation(canvas,sprite,0);
    canvasOnClick=function() {
        window.location.href = GG.global.redirect;
    }
    run(canvas);
}