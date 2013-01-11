function KeyframedAnimation (KanimationID, Kname, Kobjects, frameStart, frameEnd) {
    AnimationBase.call(this,KanimationID,Kname);
    this.objects = Kobjects;
    this.frameStart = frameStart;
    this.frameEnd = frameEnd;
}
KeyframedAnimation.prototype = new AnimationBase;
KeyframedAnimationgetFrameStart = function(keyframedanimation) {
    return keyframedanimation.frameStart;
};
KeyframedAnimationgetFrameEnd = function(keyframedanimation) {
    return keyframedanimation.frameEnd;
};
KeyframedAnimationsetFrameStart = function(keyframedanimation, frame) {
    if(frame == keyframedanimation.frameStart)
        return 0;
    if(frame < 0)
        keyframedanimation.frameStart =0;
    else if(frame > keyframedanimation.frameEnd){
        keyframedanimation.frameStart = keyframedanimation.frameEnd;
        keyframedanimation.frameEnd = frame;
    } else
        keyframedanimation.frameStart = frame;
};
KeyframedAnimationsetFrameEnd = function(keyframedanimation, frame) {
    if(frame == keyframedanimation.frameEnd)
        return 0;
    if(frame < 0)
        keyframedanimation.frameEnd =0;
    else if(frame < keyframedanimation.frameStart){
        keyframedanimation.frameEnd = keyframedanimation.frameStart;
        keyframedanimation.frameStart = frame;
    } else
        keyframedanimation.frameEnd = frame;
};
KeyframedAnimationaddObject = function(keyframedanimation, obj) {
    keyframedanimation.objects.push(obj);
};
KeyframedAnimationremoveObject = function(keyframedanimation, i) {
    if (typeof(i)==='number'){
        for (var x in objects)
            if (i==objects[x].objectID)
                objects.splice(x,1);
    } else {
        for (var x in objects)
            if (i.objectID==objects[x].objectID)
                objects.splice(x,1);
    }
};
	
KeyframedAnimationgetObjectByID = function(keyframedanimation,objectID) {
    for (var x in keyframedanimation.objects)
        if (objectID ==  KeyframedAnimationObjectgetObjectID(keyframedanimation.objects.slice(x)[0]))
            return keyframedanimation.objects.slice(x)[0];
    return null;
};
	
KeyframedAnimationgetObjects = function(keyframedanimation) {
    return keyframedanimation.objects;
};
KeyframedAnimationinsertObject = function(keyframedanimation, index, val) {
    var l = keyframedanimation.objects.length;  
    if (index > l || index < 0)
        return false;

    for (var x = l-1 ; x >= index; x--)
        keyframedanimation.objects[x+1]= keyframedanimation.objects[x];

    keyframedanimation.objects[x+1]=val;
    return true;
};
KeyframedAnimationgetObjectCount = function(keyframedanimation) {
    return keyframedanimation.objects.length;
};
KeyframedAnimationindexOfObject = function(keyframedanimation,objectID) {
    for (var cont in objects){
        if(objectID==KeyframedAnimationObjectgetObjectID(keyframedanimation.objects.slice(cont)[0])){
            return cont;
        }
    }
    return -1;
};
KeyframedAnimationtoString = function(keyframedanimation) {
    return "animationID: " +KeyframedAnimationgetAnimationID(keyframedanimation)+ " name: "+KeyframedAnimationgetName(keyframedanimation); 
};