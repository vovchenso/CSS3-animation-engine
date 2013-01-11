

//Animation class
function Animation(animationID, name, frames) {
    AnimationBase.call(this,animationID,name);
    frames = [];
    
    this.frames = frames;
}	
		
//Animation methods
Animation.prototype = new AnimationBase;

AnimationgetFrame = function(animation, index) {
    return animation.frames[index];
};

AnimationgetFrames = function(animation) {
    return animation.frames;
};

AnimationsetFrames = function(animation, frames) {
    animation.frames = frames;
};

AnimationaddFrame = function(animation, fia) {
    animation.frames.push(fia);
};

AnimationinsertFrame = function(animation, index, fia) {
    var l = animation.frames.length;  
    if (index > l || index < 0) {
        return false;
    }

    for (var x =l - 1; x >= index; x--) {
        animation.frames[x + 1]= animation.frames[x];
    }
    animation.frames[x + 1]=val;
    
    return true;
}

AnimationsetFrame = function(animation, index,fia) {
    animation.frames[index]=fia;
};

AnimationremoveFrame = function(animation, index) {
    if (typeof(index) === 'number')
        animation.frames.splice(index,1);
    else {
        var i = animation.indexOfFrame(index);
        if (i!=-1) {
            animation.frames.splice(i,1);
        }
    }
};

AnimationgetFrameStart = function(animation) {
    return 0;
};

AnimationgetFrameEnd = function(animation) {
    return animation.frames.length-1;
};

AnimationgetFramesCount = function(animation){
    return animation.frames.length;
};

AnimationindexOfFrame = function(animation, fia) {
    for (var i in animation.frames) {
        if (frames.slice(i)[0].frameInAnimationID==fia.frameInAnimationID) {
            return i;
        }
    }
    
    return -1;
};

//FrameInAnimation class
function FrameInAnimation(frameInAnimationID,frameID,position,time) {
    this.frameInAnimationID = frameInAnimationID;
    this.frameID = frameID;
    this.position = position;
    this.time = time;
}

FrameInAnimationgetFrameInAnimationID = function(animation) {
    return animation.frameInAnimationID;
};

FrameInAnimationgetFrame = function(animation) {
    return animation.frameID;
};

FrameInAnimationgetPosition = function(animation) {
    return animation.position;
};

FrameInAnimationgetTime = function(animation) {
    return animation.time;
};

FrameInAnimationequals = function(animation, o) {
    if (o == null || (o instanceof FrameInAnimation)) {
        return false;
    }
    
    return o.frameID == animation.frameID 
        && o.position.equals(animation.position)
        && o.time == animation.time 
        && o.frameInAnimationID == animation.frameInAnimationID;
}
