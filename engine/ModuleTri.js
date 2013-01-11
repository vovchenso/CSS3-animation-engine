function ModuleTri (module,nam,texture,A,B,C) {
    /* vertex of the triangle
    * A*
    *  |\
    *  | \
    * B*--*C
    */
    this.vertex = new Array();
    // Super constructor
    // Module.TRIANGLE = 0
    Module.call(this,module,nam,texture,0);
    this.vertex[0] = A;
    this.vertex[1] = B;
    this.vertex[2] = C;
    this.boundingRect = ModuleTricalculateBoundingRectangle(this);
}
ModuleTri.prototype = new Module;
	
ModuleTritoString = function(module){
    return "ModuleID: "+module.moduleID+" Name: "+module.name+" ImageID: "+module.textureID+" A: "+Vertex2DFtoString(module.vertex[0])+" B: "+Vertex2DFtoString(module.vertex[1])+" C: "+Vertex2DFtoString(module.vertex[2]);
};
	
ModuleTrigetA = function(module) {
    return module.vertex[0];
};
	
ModuleTrisetA = function(module,A) {
    module.vertex[0] = A;
    module.boundingRect = ModuleTricalculateBoundingRectangle(module);
};
	
ModuleTrigetB = function(module) {
    return module.vertex[1];
};

ModuleTrisetB = function(module,B) {
    module.vertex[1] = B;
    module.boundingRect = ModuleTricalculateBoundingRectangle(module);
};
ModuleTrigetC = function(module) {
    return module.vertex[2];
};

ModuleTrisetC = function(module,C) {
    module.vertex[2] = B;
    module.boundingRect = ModuleTricalculateBoundingRectangle(module);
};
	
ModuleTrigetAsThreeVertexArray = function(module) {
    var vs = [
    new Vertex2DF(Vertex2DFgetX(module.vertex[0]), Vertex2DFgetY(module.vertex[0])),
    new Vertex2DF(Vertex2DFgetX(module.vertex[1]), Vertex2DFgetY(module.vertex[1])),
    new Vertex2DF(Vertex2DFgetX(module.vertex[2]), Vertex2DFgetY(module.vertex[2]))];
    return vs;
}
ModuleTrigetVertexAsArray = function(module) {
    var f = new Array();
    f[0]=Vertex2DFgetX(module.vertex[0]);
    f[1]=Vertex2DFgetY(module.vertex[0]);
    f[2]=Vertex2DFgetX(module.vertex[1]);
    f[3]=Vertex2DFgetY(module.vertex[1]);
    f[4]=Vertex2DFgetX(module.vertex[2]);
    f[5]=Vertex2DFgetY(module.vertex[3]);
    return f;
};
	
ModuleTrigetWidth = function(module) {
    return Math.abs(Vertex2DFgetX(module.boundingRect[1]) - Vertex2DFgetX(module.boundingRect[0]));
};

ModuleTrigetHeight = function(module) {
    return Math.abs(Vertex2DFgetY(module.boundingRect[1]) - Vertex2DFgetY(module.boundingRect[0]));
};

ModuleTrigetBoundingRectangle= function(module) {
    return module.boundingRect;
};

ModuleTriModuleTricalculateBoundingRectangle = function(module) {
    var rect = [
    new Vertex2DF(Number.MAX_VALUE, Number.MAX_VALUE),
    new Vertex2DF(Number.MIN_VALUE, Number.MIN_VALUE)
    ];
    for (var v in module.vertex) {
        if (Vertex2DFgetX(module.vertex[v]) < Vertex2DFgetX(rect[0])) {
            Vertex2DFsetX(rect[0],Vertex2DFgetX(module.vertex[v]));
        }

        if (Vertex2DFgetY(module.vertex[v]) < Vertex2DFgetY(rect[0])) {
            Vertex2DFsetY(rect[0],Vertex2DFgetY(module.vertex[v]));
        }

        if (Vertex2DFgetX(module.vertex[v]) > Vertex2DFgetX(rect[1])) {
            Vertex2DFsetX(rect[1],Vertex2DFgetX(module.vertex[v]));
        }

        if (Vertex2DFgetY(module.vertex[v]) > Vertex2DFgetY(rect[1])) {
            Vertex2DFsetY(rect[1],Vertex2DFgetY(module.vertex[v]));
        }
    }
    return rect;
};
