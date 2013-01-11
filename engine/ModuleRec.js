function ModuleRec (module,nam,texture,A,B) {
    //Super constructor
    this.vertex = new Array();
    Module.call(this,module,nam,texture,Module.MODULE_RECTANGLE);
    this.vertex[0] = A;
    this.vertex[1] = B;
}
ModuleRec.prototype = new Module;
	
ModuleRectoString = function(module){
    return "ModuleID: "+module.moduleID+" Name: "+module.name+" ImageID: "+module.textureID+" A: "+ModuleRectoString(module.vertex[0])+" B: "+ModuleRectoString(module.vertex[1]);
};
	
ModuleRecgetA = function(module) {
    return module.vertex[0];
};
	
ModuleRecsetA = function(module,A) {
    module.vertex[0] = A;
};
	
ModuleRecgetB = function(module) {
    return module.vertex[1];
};

ModuleRecsetB = function(module,B) {
    module.vertex[1] = B;
};
	
ModuleRecgetVertexAsArray= function(module) {
    var f = new Array();
    f[0]=Vertex2DFgetX(module.vertex[0]);
    f[1]=Vertex2DFgetY(module.vertex[0]);
    f[2]=Vertex2DFgetX(module.vertex[1]);
    f[3]=Vertex2DFgetY(module.vertex[1]);
    return f;
};
ModuleRecgetAsFourVertexAsArray= function(module) {
    var vs = [
    new Vertex2DF(Vertex2DFgetX(module.vertex[0]), Vertex2DFgetY(module.vertex[0])),
    new Vertex2DF(Vertex2DFgetX(module.vertex[0]), Vertex2DFgetY(module.vertex[1])),
    new Vertex2DF(Vertex2DFgetX(module.vertex[1]), Vertex2DFgetY(module.vertex[1])),
    new Vertex2DF(Vertex2DFgetX(module.vertex[1]), Vertex2DFgetY(module.vertex[0]))]
    return vs;
};
ModuleRecgetWidth = function(module) {
    return Math.abs(Vertex2DFgetX(module.vertex[1]) - Vertex2DFgetX(module.vertex[0]));
};

ModuleRecgetHeight= function(module) {
    return Math.abs(Vertex2DFgetY(module.vertex[1]) - Vertex2DFgetY(module.vertex[0]));
};
    