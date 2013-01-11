var animations=new Array();
var animationTimer;
var FPS = 24;

function createDIVContainer(id, className) {
    var divElement=document.createElement('div');
    divElement.id=id;
    divElement.className=className;
    return divElement;
}

function setDivTransform(div,x,y,z,r,sx,sy) {
    
    var transform = (support3D)
    ? "translate3d(" + x + "px," + y + "px, 0px) rotate(" + r + "deg) scale(" + sx + "," + sy +  ")"
    : "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy +  ")";
    div.style.webkitTransform = transform;
    div.style.MozTransform = transform;
    div.style.OTransform = transform;
}

function setDivAlpha(div,a) {
    div.style.opacity=a;
}

function render(canvas) {
    
    canvas.style.display="none";
    for (a in animations) {
        var animation=animations[a];
        AdvanceSpriteAnimationManagerAdvance(animation, 1);
    }
   
    if(typeof onRender !== 'undefined') {
        onRender(canvas);
    }
    
    canvas.style.display="block";
}

function run(canvas) {
    clearTimeout(animationTimer);
    animationTimer=setTimeout(function() {
        run(canvas);
    },1000/FPS);
    render(canvas);
}

function AdvanceSpriteAnimationManagerAdvance(advance, delta) {
    if(advance.speed==0) {
        return;
    }
    advance.currentFrame+=delta*advance.speed;
    if(advance.speed>0) {
        if(advance.currentFrame>advance.animation.frameEnd) {
            if(advance.loop) {
                advance.currentFrame=advance.animation.frameStart;
            } else {
                advance.currentFrame=advance.animation.frameEnd;
                advance.speed=0;
                advance.onFinish(this);
                if(advance.animation.frameEnd-advance.animation.frameStart!=0) {
                    return;
                }
                
            }
        }
    } else {
        if(advance.currentFrame<advance.animation.frameStart) {
            if(advance.loop) {
                advance.currentFrame=advance.animation.frameEnd;
            } else {
                advance.currentFrame=advance.animation.frameStart;
                advance.speed=0;
                advance.onFinish(this);
                if(advance.animation.frameEnd-advance.animation.frameStart!=0) {
                    return;
                }
            }
        }
    }
    
    for(i in advance.animation.objects) {
        var kao=advance.animation.objects[i];
        var k=KeyframedAnimationObjectgetKeyframeAffecting(kao, advance.currentFrame);
        if(k !== null && KeyframeisVisible(k)=="true") {
            
            kao.divElement.firstChild.style.visibility="";
            
            var frame=AdvanceSpritegetFrameByID(advance.sprite, k.object);
            var sc=KeyframedAnimationObjectgetScaleAtFrame(kao, advance.currentFrame);
            var r=KeyframedAnimationObjectgetRotationAtFrame(kao, advance.currentFrame);
            var p=KeyframedAnimationObjectgetLocationAtFrame(kao, advance.currentFrame);
            var a=KeyframedAnimationObjectgetAlphaAtFrame(kao, advance.currentFrame);
            
            setDivAlpha(kao.divElement,a);
            setDivTransform(kao.divElement,Vertex2DFgetX(p),-Vertex2DFgetY(p),kao.divElement.z,-r,Vertex2DFgetX(sc),Vertex2DFgetY(sc));
            
            if(kao.currentObjectID != k.object) {
                kao.currentObjectID=k.object;
                kao.divElement.replaceChild(frame.divElement.cloneNode(true), kao.divElement.firstChild);
            }
        } else {
            kao.divElement.firstChild.style.visibility="hidden";
        }
    }
}

function AdvanceSpriteAnimationManager(sprite,animationID) {
        
    this.sprite=sprite;
    this.animation=AdvanceSpritegetAnimationByID(sprite, animationID);
    this.currentFrame=this.animation.frameStart;
    this.loop=false;
    this.speed=1;
    
    this.divElement=document.createElement('div');
    this.divElement.id=this.animation.name;
    this.divElement.className="Animation";
    
    for(i in this.animation.objects) {
        var kao=this.animation.objects[i];
        if(kao.parentID==-1) {
            this.divElement.appendChild(kao.divElement);
        }
        var ks=KeyframedAnimationObjectgetKeyframesAffecting(kao, this.currentFrame);
        
        if(ks != null) {
            var frame;
            
            if(ks[0]==null) {
                frame=AdvanceSpritegetFrameByID(this.sprite, ks[1].object);
                
            } else {
                frame=AdvanceSpritegetFrameByID(this.sprite, ks[0].object);
            }
            
            
            kao.divElement.replaceChild(frame.divElement.cloneNode(true), kao.divElement.firstChild);
            kao.divElement.firstChild.style.visibility="hidden";
        }
    }
    this.onFinish= function(asam) {};
}

function addAnimation(canvas,sprite,animationId){
    var an=new AdvanceSpriteAnimationManager(sprite,animationId);
    setDivTransform(an.divElement,160,380,0,0,1,1);
    animations.push(an);
    canvas.appendChild(an.divElement);
    render(canvas);
    return an;
}

function removeAnimation(canvas,ani){
    var index=animations.indexOf(ani);
    //if(index!=-1){
    canvas.removeChild(ani.divElement);
    animations.splice(index,1);
//}
}
