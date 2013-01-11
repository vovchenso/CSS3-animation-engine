var support3D = GG.UTILS.support3D();

var canvasOnClick=function () {
}

function start() {
    var canvas=document.getElementById("canvas");
    jQuery(canvas).click(function() {
        canvasOnClick();
    });
    var sprite=new AdvanceSprite();
    AdvanceSpriteinit(sprite, "/scripts/mex/anims/bossIntro/bossIntro.xml");
    while(canvas.hasChildNodes()) {
        canvas.removeChild( canvas.firstChild );
    }
    animations.length=0;
    canvasOnClick=function() {};
    var a0 = addAnimation(canvas,sprite,0);
    var a2 = addAnimation(canvas,sprite,2);
    var a3;
    a0.onFinish=function () {
        removeAnimation(canvas,a0);
        var a1 = addAnimation(canvas,sprite,1);
        canvas.appendChild(a3.divElement);
        a1.loop=true;
        canvasOnClick=function() {
            document.location.href = GG.global.redirect;
        }
    };
    
    a2.onFinish=function () {
        removeAnimation(canvas,a2);
        a3 = addAnimation(canvas,sprite,3);
        a3.loop=true;
    }
    
    
    
    run(canvas);
}