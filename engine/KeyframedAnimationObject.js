function KeyframedAnimationObject(objectid, parentID, nam, keyfrs) {
    this.parentID = parentID;
    this.objectID = objectid;
    this.name = nam;
    this.keyframes = keyfrs;
    
    this.currentObjectID=-1;
	
	
    function compare(a,b) {
        if (a.frameStart < b.frameStart)
            return -1;
        if (a.frameStart > b.frameStart)
            return 1;
        return 0;
    }

    if (typeof(this.keyframes) === 'undefined') {
        this.keyframes = [];
    }else {
        this.keyframes.sort(compare);
    }
    
    this.divElement=document.createElement('div');
    this.divElement.id=this.name;
    this.divElement.className="KeyframeAnimationObject";
    
    var divObject=document.createElement('div');
    divObject.id="object";
    
    this.divElement.appendChild(divObject);
}

KeyframedAnimationObjectsetName = function(keyani, name) {
    keyani.name = name;
};
KeyframedAnimationObjectgetName = function(keyani) {
    return keyani.name;
};
KeyframedAnimationObjectsetObjectID = function(keyani, objectID) {
    keyani.objectID = objectID;
}
KeyframedAnimationObjectgetObjectID = function(keyani) {
    return keyani.objectID;
};
KeyframedAnimationObjecttoString = function(keyani) {
    return keyani.name+"   "+keyani.keyframes.length ;
};
KeyframedAnimationObjectputKeyframe = function(keyanik) {
    keyani.keyframes.push(k);
    keyani.keyframes.sort(compare);
};
KeyframedAnimationObjectdeleteKeyframe = function(keyani, frame) {
    keyani.keyframes.splice(frame,1);
};
KeyframedAnimationObjectgetKeyframeAtIndex = function(keyani, index) {
    return keyani.keyframes[index];
};

KeyframedAnimationObjectgetKeyframeAffecting = function(keyani, frame) {
    if (keyani.keyframes.length==0) {
        return null;
    }
    var l = 0;
    if (keyani.keyframes[0].frameStart > frame) {
        return null;
    }
    while (l<(keyani.keyframes.length-1)) {
        if (frame >= keyani.keyframes[l].frameStart && frame < keyani.keyframes[l+1].frameStart) {
            return keyani.keyframes[l];
        }
        l++;
    }
    return keyani.keyframes[l];
};

KeyframedAnimationObjectgetKeyframesAffecting = function(keyani, frame) {
    if (keyani.keyframes.length==0) {
        return null;
    }
    var l = 0;
    if (keyani.keyframes[0].frameStart > frame) {
        return new Array(null,keyani.keyframes[0]);
    }
    while (l<(keyani.keyframes.length-1)) {
        if (frame >= keyani.keyframes[l].frameStart && frame < keyani.keyframes[l+1].frameStart) {
            return new Array(keyani.keyframes[l],keyani.keyframes[l+1]);
        }
        l++;
    }
    return new Array(keyani.keyframes[l],null);
};
KeyframedAnimationObjectgetObjectAtFrame = function(keyani, frame){
    var k = KeyframedAnimationObjectgetKeyframesAffecting(keyani, frame);
    if (k == null || k[0] == null) {
        return null;
    }
    return k[0].object;
};

KeyframedAnimationObjectgetKeyframesCount= function(keyani) {
    return keyani.keyframes.length;
};
KeyframedAnimationObjectinterpolateScalar = function(keyani,l,s,e) {
    var d = s + l * (e - s);
    return d;
};
KeyframedAnimationObjectinterpolateVector = function(keyani,l,s,e) {
    var x = Vertex2DFgetX(s) + l * (Vertex2DFgetX(e) - Vertex2DFgetX(s));
    var y = Vertex2DFgetY(s) + l * (Vertex2DFgetY(e) - Vertex2DFgetY(s));
    var d = new Vertex2DF(x, y);
    return d;
};
KeyframedAnimationObjectgetLocationAtFrame= function(keyani, frame){
    var ks = KeyframedAnimationObjectgetKeyframesAffecting(keyani, frame);
    if(ks == null || ks[0] == null)
        return null;
    if(ks[1] == null || Vertex2DFequals(ks[0].position,ks[1].position) )
        return ks[0].position;	
    var r = (frame - ks[0].frameStart) / (ks[1].frameStart - ks[0].frameStart);
    var i = KeyframedAnimationObjectinterpolateVector(keyani, r, ks[0].position, ks[1].position);
    return i;
};
KeyframedAnimationObjectgetRotationAtFrame = function(keyani, frame){
    var ks= KeyframedAnimationObjectgetKeyframesAffecting(keyani, frame);
    if(ks == null || ks[0] == null)
        return 0;
    if(ks[1] == null || ks[0].rotation == ks[1].rotation )
        return ks[0].rotation;
    var r = (frame - ks[0].frameStart) / (ks[1].frameStart - ks[0].frameStart);
    var i =  KeyframedAnimationObjectinterpolateScalar(keyani, r, ks[0].rotation, ks[1].rotation);
    return i;
};
KeyframedAnimationObjectgetScaleAtFrame = function(keyani, frame){
    var ks = KeyframedAnimationObjectgetKeyframesAffecting(keyani, frame);
    if(ks == null || ks[0] == null)
        return null;
    if(ks[1] == null || Vertex2DFequals(ks[0].scale,ks[1].scale) )
        return ks[0].scale;
    var r = (frame - ks[0].frameStart) / (ks[1].frameStart - ks[0].frameStart);
    var i = KeyframedAnimationObjectinterpolateVector(keyani, r, ks[0].scale, ks[1].scale);
    return i;
};
KeyframedAnimationObjectgetAlphaAtFrame = function(keyani, frame){
    var ks= KeyframedAnimationObjectgetKeyframesAffecting(keyani, frame);
    if(ks == null || ks[0] == null)
        return 0;
    if(ks[1] == null || ks[0].alpha == ks[1].alpha )
        return ks[0].alpha;
    var r = (frame - ks[0].frameStart) / (ks[1].frameStart - ks[0].frameStart);
    var i =  KeyframedAnimationObjectinterpolateScalar(keyani, r, ks[0].alpha, ks[1].alpha);
    return i;
};
    
KeyframedAnimationObjectgetParentID = function(keyani){
    return keyani.parentID;
};
KeyframedAnimationObjectsetParentID = function(keyani, parentID){
    keyani.parentID = parentID;
};