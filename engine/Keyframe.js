function Keyframe (KframeStart, Kobject, Krotation, Kposition, Kscale, Kalpha, Kvisible){

    this.frameStart = KframeStart;
    this.object = Kobject;
    this.rotation = Krotation;
    this.position = Kposition;
    this.scale = Kscale;
    this.alpha = Kalpha;
    this.visible = Kvisible;
}
KeyframetoString = function(keyframe) {
    return "frameStart: " + keyframe.frameStart + " rotation: " + keyframe.rotation + " translation: " + keyframe.position + " scale: " + keyframe.scale + " alpha: " + keyframe.alpha + " visible: " + keyframe.visible;
};
KeyframecompareTo = function(keyframe,o){
    return (keyframe.frameStart - o.frameStart);
};
KeyframesetFrameStart = function(keyframe,frameStart) {
    keyframe.frameStart = frameStart;
};
KeyframegetFrameStart = function(keyframe) {
    return keyframe.frameStart;
};
KeyframesetPosition = function(keyframe,position) {
    keyframe.position = position;
};
KeyframegetPosition = function(keyframe) {
    return keyframe.position;
};
KeyframesetRotation =function(keyframe,rotation) {
    keyframe.rotation = rotation;
};
KeyframegetRotation = function(keyframe) {
    return keyframe.rotation;
};
KeyframesetScale = function(keyframe,scale) {
    keyframe.scale = scale;
};
KeyframegetScale = function(keyframe) {
    return keyframe.scale;
};
KeyframesetAlpha = function(keyframe,alpha) {
    keyframe.alpha = alpha;
};
KeyframegetAlpha = function(keyframe) {
    return keyframe.alpha;
};
KeyframesetVisible = function(keyframe,visible) {
    keyframe.visible = visible;
};
KeyframeisVisible = function(keyframe) {
    return keyframe.visible;
};
KeyframesetObject = function(keyframe,obj) {
    keyframe.object = obj;
};
KeyframegetObject = function(keyframe) {
    return keyframe.object;
};
KeyframehasTransformation = function(keyframe,n) {
    if (keyframe.rotation != n.rotation) {
        return true;
    }
    if (!keyframe.position.equals(n.position)) {
        return true;
    }
    if (!keyframe.scale.equals(n.scale)) {
        return true;
    }
    if (keyframe.alpha!=n.alpha) {
        return true;
    }
    return false;
};
Keyframeequals = function(keyframe,o) {
    if (!(o instanceof Keyframe)) {
        return false;
    }
    
    return o.position.equals(keyframe.position) 
        && o.rotation == keyframe.rotation
        && o.scale.equals(keyframe.scale) 
        && o.visible == keyframe.visible
        && o.alpha == keyframe.alpha 
        && KeyframegetObject(o)==keyframe.object;
};