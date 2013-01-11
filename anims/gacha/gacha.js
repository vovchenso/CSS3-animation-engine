var support3D=GG.UTILS.support3D();

var canvasOnClick=function () {
}

function start() {

    var canvas=document.getElementById("canvas");
    jQuery(canvas).click(function() {
        canvasOnClick();
    });
    
    while(canvas.hasChildNodes()) {
        canvas.removeChild( canvas.firstChild );
    }
    animations.length=0;
    
    var sprite=new AdvanceSprite();
    sprite.texts["MESSAGE_MODULE"]=GG.global.message;
    if(GG.global.paid) {
        if(GG.global.multi) {
            AdvanceSpriteinit(sprite, "/scripts/mex/anims/gacha/paidGacha.xml");
        } else {
            AdvanceSpriteinit(sprite, "/scripts/mex/anims/gacha/paidGacha.xml");
        }
    } else {
        if(GG.global.multi) {
            AdvanceSpriteinit(sprite, "/scripts/mex/anims/gacha/gachaMultiple.xml");
        } else {
            AdvanceSpriteinit(sprite, "/scripts/mex/anims/gacha/gacha.xml");
        }
    }
    var a0=addAnimation(canvas,sprite,0);
    
    a0.onFinish=function () {
        removeAnimation(canvas,a0);
        var a1=addAnimation(canvas,sprite,1);
        a1.loop=true;
        canvasOnClick=function() {
            removeAnimation(canvas,a1);
            var a2=addAnimation(canvas,sprite,2);
            canvasOnClick=function() {};
            a2.onFinish=function() {
                removeAnimation(canvas,a2);
                var a3=addAnimation(canvas,sprite,3);
                a3.onFinish=function() {
                    removeAnimation(canvas,a3);
                    var a4=addAnimation(canvas,sprite,4);
                    a4.loop=true;
                    canvasOnClick=function() {
                        window.location.href = GG.global.redirect;
                    };
                }
            }
        }
    };
    canvasOnClick=function() {};
    run(canvas);
}
