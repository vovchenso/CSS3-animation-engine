
/**
 * @class SpriteManager
 * Manage
 */

var SpriteManager = function() {
	
}

var AnimationObject = function() {
	this.objectID = null;
	this.parentID = null;
	this.transAngle = null;
	this.transX = null;
	this.transY = null;
	this.transScale = null;
}

var TransformedFrame = function() {
	this.frameID = null;
	this.transformations = null;
	this.modules = null;
}

/**
* get the animation, first we calculate the current transformation for each frameobject in the current frame and keyframe
* then for each frameobject, we get all its father's transformations and send it as parameter to the drawFrame function
*/
SpriteManagergetAnimation = function(sprite,element, advance) {
	var transformations = new Array();
	var transformedFrames= new Array();
	var animation = AdvanceSpritegetAnimationByID(advance, element.animationID);
	var keyframe = null;
	var frame = element.frame;
	var incAngle = 0;
	var incX = 0;
	var incY = 0;
	var i = 0;
	var j = 0;
	var parentsTransformation = new Array();
	
	var num = animation.objects.length;    
	for(i = 0; i < num; i++)
	{
		animationObject = new AnimationObject();
		keyframe = SpriteManagergetAnimationKeyframe(sprite,animation.objects[i], frame);
		incAngle = SpriteManagergetAngleInframe(sprite,frame, animation.objects[i].keyframes, keyframe, animation.frameEnd);
		
		incAngle = 0 - incAngle;
		
		animationObject.objectID = animation.objects[i].objectID;
		animationObject.parentID = animation.objects[i].parentID;
		animationObject.transAngle = incAngle;
		animationObject.transX = SpriteManagergetXInframe(sprite,frame, animation.objects[i].keyframes, keyframe, animation.frameEnd );
		animationObject.transY = SpriteManagergetYInframe(sprite,frame, animation.objects[i].keyframes, keyframe, animation.frameEnd );
		animationObject.transScale = SpriteManagergetScaleInframe(sprite,frame, animation.objects[i].keyframes, keyframe, animation.frameEnd);
		transformations.push(animationObject);
	}
	
	num = animation.objects.length; 
	for(j = 0; j < num; j++)
	{	
		var transformedFrame = new TransformedFrame()
		keyframe = SpriteManagergetAnimationKeyframe(sprite,animation.objects[j], frame);
		currentFrame = AdvanceSpritegetFrameByID(advance, animation.objects[j].keyframes[keyframe].object);//frames[animation.objects[j].keyframes[keyframe].object];
		transformedFrame.modules = currentFrame.modules;
		transformedFrame.frameID = animation.objects[j].keyframes[keyframe].object;
		transformedFrame.transformations= SpriteManagergetParentsTransformations(sprite,transformations, j);
		//this.drawFrame(currentFrame, advance.modules, animation.objects[j].transAngle, animation.objects[j].transX, animation.objects[j].transY, animation.objects[j].transScale, parentsTransformation, animationScale);
		transformedFrames.push(transformedFrame);
		
	}
	return transformedFrames;
}




/**
* draw a module as and independent object
*/
SpriteManagerdrawModule = function(sprite,image, posX, posY, w, h) {
	if (image) {
		SpriteManagercontext.drawImage(sprite,image, SpriteManagerget2DX(sprite,posX, posY), SpriteManagerget2DY(sprite,posX, posY), w, h);
	}
}

/**
* draw a module, using the scale and offsets asigned in the current frame
*/
SpriteManagerdrawModuleInAnimation = function(sprite,module, moduleInFrame, animationScale, incScale) {
	var w = 0;
	var h = 0;
	var posX = 0;
	var posY = 0;
	
		if(module.image)
		{
			w = SpriteManagerscale2D(sprite,module.image.width) * moduleInFrame.scale.C[0];
			h = SpriteManagerscale2D(sprite,module.image.height) * moduleInFrame.scale.C[1];
			posX = 0 + SpriteManagerscale2D(sprite,moduleInFrame.position.C[0]);
			posY = 0 - h - SpriteManagerscale2D(sprite,moduleInFrame.position.C[1]);
			SpriteManagercontext.drawImage(sprite,module.image, posX * (animationScale * incScale.x), posY * (animationScale * incScale.y), w * (animationScale * incScale.x) , h * (animationScale * incScale.y));
		}
}

/**
* draw a frame object, we recive the frame object, his rotation and transformation in X and Y in the current frame
* the X and Y offset in the screen (the position of the animation, originaly in 3D, but now transformed in 2D and scaled 
* accordin to the editor) and a vector with all the parents transformation, we start savin the canvas, applaying the 
* offset transformation, then the parents transformations, and finally the frame transformation in order to draw it, 
* the canvas is restores at the end
*/
SpriteManagerdrawFrame = function(sprite,element, modulos, keyFrameRotation, keyFrameOffsetx, keyFrameOffsety, incX, incY, incScale, parentsTransformation, animationScale) {
	var i = 0;
	var x = 0;
	var j = 0;
	var posX = 0;
	var posY = 0;
	var scale = null;
	var transform = null;
	var transformations = 0;
	var myScale = new Scale(1,1);
	
	
	
	transformations = parentsTransformation;
	SpriteManagercontext.save(sprite);
	SpriteManagercontext.translate(sprite, keyFrameOffsetx, keyFrameOffsety);
			
	for (x = transformations.length-1; x>=0; x--) {
		transform = transformations[x];
		
		if (x < transformations.length-1) {
			myScale.x =  /*myScale.x **/ transformations[x + 1].scale.x;
			myScale.y =  /*myScale.y **/ transformations[x + 1].scale.y;
		}
		
		SpriteManagercontext.translate(sprite, SpriteManagerscale2D(sprite,transform.x * animationScale * myScale.x), -SpriteManagerscale2D(sprite,transform.y * animationScale * myScale.y));
		SpriteManagercontext.rotate(sprite,transform.angle*(Math.PI/180));
		//incScale.x = incScale.x * transform.scale.x;
		//incScale.y = incScale.y * transform.scale.y;
		
		if (x == 0) {
			myScale.x = /*myScale.x **/ transform.scale.x;
			myScale.y = /*myScale.y **/ transform.scale.y;
		}
	}
	
	posX = 0 + SpriteManagerscale2D(sprite,incX * animationScale * myScale.x);
	posY = 0 - SpriteManagerscale2D(sprite,incY * animationScale * myScale.y);
	
	SpriteManagercontext.translate(sprite,posX , posY);
	SpriteManagercontext.rotate(sprite,keyFrameRotation*(Math.PI/180));
	
	for (i = 0; i < element.modules.length; i++ ) {
		module = element.getModuleByID(modulos,element.modules[i].moduleID);
		SpriteManagerdrawModuleInAnimation(sprite,module, element.modules[i], animationScale, incScale);
	}
	
	SpriteManagercontext.restore(sprite);
}



/**
* just a clase to use as coordinates and angle of a transformation
*/
function Transformation(angle, x, y, scale) {
    this.angle = angle;
    this.scale = scale;
    this.x = x;
    this.y = y;
}

function Scale(x, y) {
    this.x = x;
    this.y = y;
}

/**
* get all the parents transfomrations of an animation object, we recive his index, get the transformations using the parents ID and the
* objects ID, pushing it in a vector, which is returned
*/
SpriteManagergetParentsTransformations = function(sprite,objects, index) {
	var trans = null;
	var parentsTransformation = new Array();
	var parentID = objects[index].parentID;
	
	if (parentID >= -1) {
		do {
			trans = new Transformation(0,0,0,0);
			trans.angle = objects[index].transAngle;
			trans.x = objects[index].transX;
			trans.y = objects[index].transY;
			trans.scale = objects[index].transScale;
			parentsTransformation.push(trans);
			if(parentID != -1) {
				index = SpriteManagergetIndexByPID(sprite,parentID, objects);
				parentID = objects[index].parentID;
			} else {
				index = -1;
			}
		} while(index != -1);
	}
    
	return parentsTransformation;
}

/**
* search an object index in the animations object, by a parentID recived
*/
SpriteManagergetIndexByPID  = function(sprite,parentID, objects) {
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].objectID == parentID) {
			return i;
		}
	}
	
	return -2;
}


/**
* recive an object of an animation, and his current frame, search the keyframe that must be wich is currently displayed and return it
*/
SpriteManagergetAnimationKeyframe  = function(sprite,object, frame) {
	var i;
	for (i = 0; i < object.keyframes.length; i++) {
		if( i == object.keyframes.length -1) {
			return i;
		} else {
			if (frame >= object.keyframes[i].frameStart && frame < object.keyframes[i+1].frameStart) {
				return i;
			}
		}
	}
	return 0;
}

/**
* calculate the angle of a frame based in the actual keyframe and the frame
*/
SpriteManagergetAngleInframe  = function(sprite,frame, keyframes, keyframe, animationEndFrame) {
	var angle = keyframes[keyframe].rotation
	
	if(keyframes.length == 1 || keyframe == keyframes.length - 1) {
		return angle;
	}
	
	var incAngle = keyframes[keyframe + 1].rotation - keyframes[keyframe].rotation;
	
	var init = keyframes[keyframe].frameStart;
	if(keyframe == keyframes.length - 1) {
		end = animationEndFrame - init;
	} else {
		end = (keyframes[keyframe + 1].frameStart) - init;
	}
	
	frame  = frame - init;
	var rotate = incAngle / end;
	
	angle += (rotate * frame); 
	
	return angle;

}

/**
* calculate the transformation in X of a frame based in the actual keyframe and the frame
*/
SpriteManagergetXInframe  = function(sprite,frame, keyframes, keyframe, animationEndFrame) {
	
	var distance = keyframes[keyframe].position.C[0];
	
	if (keyframes.length == 1 || keyframe == keyframes.length - 1) {
		return distance;
	}
	var incdistance = keyframes[keyframe + 1].position.C[0] - keyframes[keyframe].position.C[0];
	
	var init = keyframes[keyframe].frameStart;
	if(keyframe == keyframes.length - 1) {
		end = animationEndFrame - init;
	} else {
		end = (keyframes[keyframe + 1].frameStart) - init;
	}
	
	frame  = frame - init;
	var travel = incdistance / end;
	
	return distance + (travel * frame);

}

/**
* calculate the transformation in Y of a frame based in the actual keyframe and the frame
*/
SpriteManagergetYInframe  = function(sprite,frame, keyframes, keyframe, animationEndFrame) {
	
	var distance = keyframes[keyframe].position.C[1];
	
	if(keyframes.length == 1 || keyframe == keyframes.length - 1) {
		return distance;
	}
	var incdistance = keyframes[keyframe + 1].position.C[1] - keyframes[keyframe].position.C[1];
	
	var init = keyframes[keyframe].frameStart;
	if (keyframe == keyframes.length - 1) {
		end = animationEndFrame - init;
	} else {
		end = (keyframes[keyframe + 1].frameStart) - init;
	}
	
	frame  = frame - init;
	var travel = incdistance / end;
	
	return distance + (travel * frame);

}

SpriteManagergetScaleInframe  = function(sprite,frame, keyframes, keyframe, animationEndFrame)
{
	var scale = new Scale(keyframes[keyframe].scale.C[0],keyframes[keyframe].scale.C[1])
	
	if(keyframes.length == 1 || keyframe == keyframes.length - 1) {
		return scale;
	}
	
	var incScale = new Scale(keyframes[keyframe + 1].scale.C[0] - keyframes[keyframe].scale.C[0],keyframes[keyframe + 1].scale.C[1] - keyframes[keyframe].scale.C[1])
		
	var init = keyframes[keyframe].frameStart;
	if(keyframe == keyframes.length - 1) {
		end = animationEndFrame - init;
	}
	else {
		end = (keyframes[keyframe + 1].frameStart) - init;
	}
	
	frame  = frame - init;
	
	var scaleChange = new Scale(0,0);
	scaleChange.x = incScale.x / end;
	scaleChange.y = incScale.y / end;
	
	scale.x += scaleChange.x * frame;
	scale.y += scaleChange.y * frame;
	return scale;

}
