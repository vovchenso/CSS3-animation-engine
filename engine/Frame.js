
//Frame class
function Frame(EframeID, Ename, mif, EmodulesCount) {
    this.frameID = EframeID;
    this.name = Ename;
    this.modules = mif;  //ModuleInFrame array
    
    this.divElement = document.createElement('div');
    this.divElement.id = this.name;
    this.divElement.className = "Frame";
}

//Frame methods
FramegetModuleByID = function(frame, modules, index)  {
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].moduleID == index) {
            return modules[i];
        }
    }
    return null;
}


FramegetFrameID = function(frame) {
    return frame.frameID;
};
FramesetFrameID = function(EframeID) {
    frame.frameID = EframeID;
};
FramesetModuleID = function(frame, index, EmoduleID) {
    frame.modules[index].moduleID = EmoduleID;
};
FramegetModuleID = function(frame, index) {
    return frame.modules[index].moduleID;
};
FramesetModuleX = function(frame, index, X) {
    Vertex2DFsetX(frame.modules[index].position,X);
};
FramesetModuleY = function(frame,index, Y) {
    Vertex2DFsetY(frame.modules[index].position,Y);
};
FramesetModuleScaleX = function(frame, index, scaleX) {
    Vertex2DFsetX(frame.modules[index].scale,scaleX);
};
FramesetModuleScaleY = function(frame, index, scaleY) {
    Vertex2DFsetY(frame.modules[index].scale,scaleY);
};
FramegetModules = function(frame) {
    return frame.modules;
};
FrametoString = function(frame) {
    return "FrameID: " + frame.frameID + " ModulesCount: " + frame.modulesCount;
};
FramegetName = function(frame) {
    return frame.name;
};
FramesetName = function(frame, Ename) {
    frame.name = Ename;
};
FramegetModulesCount = function(frame) {
    return frame.modules.length;
};
FrameaddModuleInFrame = function(frame,mif) {
    frame.modules.push(mif);
};
FrameremoveModuleInFrame = function(frame, mif){
    if (typeof(mif) === 'number') {
        frame.modules.splice(mif, 1);
    } else {
        var x=0;
        for (x = 0; x < frame.modules.length; x++) {
            if (frame.modules[x].equals(mif)) {
                frame.modules.splice(x, 1);
                return 0;
            }
        }
    }
};
FramesetModuleInFrame = function(frame,index,mif) {
    var l = frame.objects.length;  
    if(index>l||index<0)
        return false;
    frame.modules[index]=mif;
};
FrameaddModuleInFrame = function(frame, index, mif) {
    var l = frame.modules.length;  
    if (index > l || index < 0) {
        return false;
    }
    for (var x = l - 1 ; x >= index; x--) {
        frame.modules[x + 1]= frame.modules[x];
    }
    frame.modules[x + 1]=val;
    
    return true;
};

//ModuleInFrame class

function ModuleInFrame(ID, MID, pos, sca, co) {	
    this.moduleInFrameID = ID;
    this.moduleID = MID;
    this.position = pos;
    this.scale = sca;
    this.color = co;
}

//ModuleInFrame methods
ModuleInFrametoString = function(frame) {
    return "ModuleID: "+frame.moduleID+" Position: "+frame.position+" Scale: "+frame.scale+" Color: "+frame.color;
};
ModuleInFramegetTransformedModule = function(frame,m, pixelRatio, pixelSize){
    switch(m.type) {
        case 1://Module.RECTANGLE
            var modrec = new ModuleRec (ModulegetModuleID(m), ModulegetName(m), ModulegetImageID(m), ModuleRecgetA(m), ModuleRecgetB(m) );
		
            // A vertex is the origin reference
            var off = ModuleRecgetA(modrec);
            modrec.setA( new Vertex2DF(Vertex2DFgetX(frame.position) * pixelSize * pixelRatio,Vertex2DFgetY(frame.position) * pixelSize) );
            modrec.setB( new Vertex2DF(((Vertex2DFgetX(ModuleRecgetB(modrec)) - Vertex2DFgetX(off)) * Vertex2DFgetX(frame.scale) + Vertex2DFgetX(frame.position) * pixelSize) * pixelRatio,
                (Vertex2DFgetY(ModuleRecgetB(modrec)) - Vertex2DFgetY(off)) * Vertex2DFgetY(frame.scale) + Vertex2DFgetY(frame.position) * pixelSize));
		
            return modrec;
            break;
		
        case 0: //Module.TRIANGLE
	
            var modtri = new ModuleTri(ModulegetModuleID(m), ModulegetName(m), ModulegetImageID(m), ModuleTrigetA(m), ModuleTrigetB(m), ModuleTrigetC(m));

            // A vertex is the origin reference
            var off = ModuleTrigetA(modrec);
            modtri.setA(new Vertex2DF(Vertex2DFgetX(frame.position) * pixelSize * pixelRatio, Vertex2DFgetY(frame.position) * pixelSize));
            modtri.setB(new Vertex2DF(((Vertex2DFgetX(ModuleTrigetB(modtri)) - Vertex2DFgetX(off)) * Vertex2DFgetX(frame.scale) + Vertex2DFgetX(frame.position) * pixelSize) * pixelRatio, (Vertex2DFgetY(ModuleTrigetB(modtri)) - Vertex2DFgetY(off)) * Vertex2DFgetY(frame.scale) + Vertex2DFgetY(frame.position) * pixelSize));
            modtri.setC(new Vertex2DF(((Vertex2DFgetX(ModuleTrigetC(modtri)) - Vertex2DFgetX(off)) * Vertex2DFgetX(frame.scale) + Vertex2DFgetX(frame.position) * pixelSize) * pixelRatio, (Vertex2DFgetY(ModuleTrigetC(modtri)) - Vertex2DFgetY(off)) * Vertex2DFgetY(frame.scale) + Vertex2DFgetY(frame.position) * pixelSize));
            return modtri;
            break;
    }
    return null;
};

ModuleInFrameequals = function(frame,o) {
    if (o != null && o instanceof ModuleInFrame) {
        var mif = o;
        if (mif.moduleID == frame.moduleID
            && mif.position.equals(frame.position)
            && mif.scale.equals(frame.scale)
            && mif.Colorequals(color, frame.color)) {
            return true;
        }
    }
    return false;
};

ModuleInFramegetModuleID = function(frame) {
    return frame.moduleID;
};

ModuleInFramegetPosition = function(frame) {
    return frame.position;
};

ModuleInFramesetPosition= function(frame, position) {
    frame.position = position;
};

ModuleInFramegetScale = function(frame) {
    return frame.scale;
};

ModuleInFramesetScale = function(frame, scale) {
    frame.scale = scale;
};

ModuleInFramegetColor = function(frame) {
    return frame.color;
};

ModuleInFramesetColor = function(frame, color) {
    frame.color = color;
};




