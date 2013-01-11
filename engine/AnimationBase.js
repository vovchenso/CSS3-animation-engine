
//AnimationBase class
function AnimationBase(animationID,name){
	this.animationID = animationID;
	this.name = name;
}


//AnimationBase methods
AnimationBasegetAnimationID = function(animation) {
	return animation.animationID;
};

AnimationBasesetAnimationID = function(animation, value) {
	animation.animationID = value;
};

AnimationBasegetName = function(animation) {
	return animation.name;
};

AnimationBasesetName = function(animation, value) {
	animation.name = value;
};