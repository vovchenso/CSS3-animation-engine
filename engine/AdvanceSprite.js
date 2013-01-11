    
//AdvanceSprite Class
function AdvanceSprite() 
{
    this.modules = new Array();
    this.frames = new Array();
    this.textures = new Array();
    this.animations = new Array();
    this.xmlDoc = null;	
    this.totalModules = 0;
    this.xmlNames;
    this.files = new Array();
    this.filesNumber = 0;
    this.texts = new Array();
}

function Files(fileName, index)
{
    this.index = index;
    this.fileName = fileName;
}


//Methods
AdvanceSpriteinit = function(advance, dname) {
    AdvanceSpriteloadXMLDoc(advance, dname);	
    AdvanceSpriteloadTextures(advance);	
    AdvanceSpriteloadFrames(advance);
    AdvanceSpriteloadAnimations(advance);		
    AdvanceSpriteloadModules(advance);	
    AdvanceSpriteafterLoadImages(advance);
};

AdvanceSpriteloadXMLDoc = function(advance, dname) {
    var fileName = null;
    var xhttp=new XMLHttpRequest();
    xhttp.open("GET",dname,false);
    xhttp.send();
    advance.xmlDoc= xhttp.responseXML;
    //var aux = dname;
    fileName = dname.split('/');
    fileName = fileName[fileName.length-1].split('.');
    advance.xmlName = fileName[0];
	
    advance.files.push(new Files(advance.xmlName, advance.filesNumber));
	
    //hash = 0;
    //this.xmlName = parseInt(hash);
	
    advance.filesNumber ++;
};

AdvanceSpritegetAnimationByFile = function(file, animationInFile) {
    //Hash?
    /*
	var fileIndex = 0;
	var index = 0;
	for( var i=0; i < filesNumber; i++)	
	{
		if(file == files[i].fileName)
		{
			fileIndex = i;
			break;
		}
		index = ((files[fileIndex].index * 10000) + 10000) + animationInFile;
	}
	*/
    return animationInFile;
};

AdvanceSpriteloadModules = function(advance){
    //Getting the modules from the xml file
    var i=0;           //General module count
    var tri=0;         //Triangle count
    //xmlDoc contains the XML extracted with loadXMLDoc function
    var modu = advance.xmlDoc.getElementsByTagName("Modules")[0].getElementsByTagName("Module"); //Getting how many modules there are
    var a=0;
	
    for (i=0; i < modu.length ; i++){ //While there are modules left
        var xmlmod = modu[i].attributes;  //Get into the modules section
        var ID = xmlmod.getNamedItem("ModuleID").nodeValue;
        var name = xmlmod.getNamedItem("Name").nodeValue;
        var texture = xmlmod.getNamedItem("TextureID").nodeValue;
        var type = xmlmod.getNamedItem("Type").nodeValue;
        var X1, X2, X3, Y1, Y2, Y3;
		
		
        if(type=="RECTANGLE"){ //If it's a ModuleRec
			
            X1= parseFloat(xmlmod.getNamedItem("X").nodeValue);
            Y1= parseFloat(xmlmod.getNamedItem("Y").nodeValue);
            X2 = xmlmod.getNamedItem("Width").nodeValue;
            Y2 = xmlmod.getNamedItem("Height").nodeValue;
            X2= parseFloat(X2);
            Y2= parseFloat(Y2);
            //Checking the module height value doesn't exceed the max
            if(Y2 > 1)
                Y2 = 0.999;
            if(Y1 > 1)
                Y1 = 0.999;
            //Creating the Vertex2DF objects
            var A = new Vertex2DF(X1,Y1);
            var B = new Vertex2DF(X2,Y2);
            //Then we finally create the ModuleRec
            advance.modules.push(new ModuleRec(ID, name, texture, A, B));
	
			
        }
        else{  				   //If it's a ModuleTri
            //If it's a triangle then we need to move and check every point
            //Point A
            var mods = advance.xmlDoc.getElementsByTagName("Modules");
            xmlmod= mods[0].getElementsByTagName("VertexA")[tri].attributes;
            X1= parseFloat(xmlmod.getNamedItem("X").nodeValue);
            Y1= parseFloat(xmlmod.getNamedItem("Y").nodeValue);
            //Point B
            xmlmod= mods[0].getElementsByTagName("VertexB")[tri].attributes;
            X2= parseFloat(xmlmod.getNamedItem("X").nodeValue);
            Y2= parseFloat(xmlmod.getNamedItem("Y").nodeValue);
            //Point C
            xmlmod= mods.getElementsByTagName("VertexC")[tri].attributes;
            X3= parseFloat(xmlmod.getNamedItem("X").nodeValue);
            Y3= parseFloat(xmlmod.getNamedItem("Y").nodeValue);
						
            //Creating the Vertex2DF objects
            var A =  new Vertex2DF(X1,Y1);
            var B =  new Vertex2DF(X2,Y2);
            var C =  new Vertex2DF(X3,Y3);
	
            tri++; //Increase the triangle count
            //Then we finally create the ModuleTri
            advance.modules.push(new ModuleTri(ID, name, texture, A, B, C));
			
        }				
    }
};

AdvanceSpriteloadFrames = function(advance){

    //Getting the frames from the xml file
    var i=0;           //General frame count
    //xmlDoc contains the XML extracted with loadXMLDoc function
    var frame = advance.xmlDoc.getElementsByTagName("Frames")[0].getElementsByTagName("Frame"); //Getting how many frames there are

    for(i=0; i< frame.length;i++) {
        var mif = new Array(); //ModulesInFrame array
        var xmlfr = frame[i].attributes; //Getting the Frame information
        var ID = xmlfr.getNamedItem("FrameID").nodeValue; //FrameID
        var name = xmlfr.getNamedItem("Name").nodeValue;  //Name
        var mods = advance.xmlDoc.getElementsByTagName("Frame")[i].getElementsByTagName("Module"); //Getting how many modules that frame has
		
        for(var count=0; count < mods.length; count++) {
            var fram = advance.xmlDoc.getElementsByTagName("Frames")[0].getElementsByTagName("Frame")[i];
            xmlfr = fram.getElementsByTagName("Module")[count].attributes; //Getting the module in frame information
            var MID = xmlfr.getNamedItem("ModuleID").nodeValue; //ModuleID
            xmlfr = fram.getElementsByTagName("Position")[count].attributes; //Getting to the position information
            var X = parseFloat( xmlfr.getNamedItem("X").nodeValue ); 
            var Y = parseFloat( xmlfr.getNamedItem("Y").nodeValue ); 
            var pos =  new Vertex2DF(X,Y);
            xmlfr = fram.getElementsByTagName("Scale")[count].attributes; //Getting the scale information
            var sX = parseFloat( xmlfr.getNamedItem("X").nodeValue ); 
            var sY = parseFloat( xmlfr.getNamedItem("Y").nodeValue ); 
            var sca =  new Vertex2DF(sX,sY);
            xmlfr = fram.getElementsByTagName("Color")[count].attributes; //getting the color information
            var A = parseFloat( xmlfr.getNamedItem("A").nodeValue );
            var R = parseFloat( xmlfr.getNamedItem("R").nodeValue );
            var G = parseFloat( xmlfr.getNamedItem("G").nodeValue );
            var B = parseFloat( xmlfr.getNamedItem("B").nodeValue );
            var color;
            if(A===null)
                color = new ColorRGBF(R, G, B, A);
            else
                color = new ColorRGBAF(R, G, B);
            mif[count] = new ModuleInFrame(ID, MID, pos, sca, color);
        }
        advance.frames.push( new Frame(ID, name, mif, count));
    //console.log(this.frames[i]); 
    }
};

AdvanceSpriteloadTextures = function(advance){

    var i = 0; //Generic texture count
    var tex = advance.xmlDoc.getElementsByTagName("Textures")[0].getElementsByTagName("Texture"); //Getting how many Textures there are
    for(i=0;i<tex.length;i++)
    {
        var xmltex = tex[i].attributes; //Getting the Texture information
        var type = xmltex.getNamedItem("Type").nodeValue;
        var ID = xmltex.getNamedItem("ImageID").nodeValue;
        var height = parseFloat(xmltex.getNamedItem("Height").nodeValue); 
        var width = parseFloat(xmltex.getNamedItem("Width").nodeValue);
        var filename;
        if(type=="FILE")
        {
            filename = xmltex.getNamedItem("FileName").nodeValue;
            advance.textures.push(new TextureFile(ID, width, height, filename));
        }
    }
};

AdvanceSpriteloadAnimations = function(advance){

    var i = 0; //Generic animation count
    var ani = advance.xmlDoc.getElementsByTagName("Animations")[0].getElementsByTagName("KeyframeAnimation"); //Getting how many animations there are
    for(i=0;i<ani.length;i++)
    {
        var xmlanim = ani[i].attributes; //Getting the Texture information
        var ID = xmlanim.getNamedItem("AnimationID").nodeValue; //AnimationID
        var name = xmlanim.getNamedItem("Name").nodeValue;      //Name
        var start = xmlanim.getNamedItem("Start").nodeValue;    //FrameStart
        var end = xmlanim.getNamedItem("End").nodeValue;        //FrameEnd
        var kaObjects = new Array(); //Array of KeyFramedAnimationObjects
        var o = ani[i].getElementsByTagName("Object"); //Getting how many objects this animations has
        var j;  //Generic keyframeobjects count
        for(j=0;j<o.length;j++)
        {
            xmlanim = o[j].attributes;
            var aName = xmlanim.getNamedItem("Name").nodeValue;
            var objectID = xmlanim.getNamedItem("ObjectID").nodeValue;
			
            var parentID;
            if(xmlanim.getNamedItem("ParentID") != null)
            {
                parentID = xmlanim.getNamedItem("ParentID").nodeValue;
            }
            else
            {
                parentID = -1; 
            }
            var keyframes = new Array();
            var ke = advance.xmlDoc.getElementsByTagName("KeyframeAnimation")[i].getElementsByTagName("Object")[j].getElementsByTagName("Keyframe"); //Getting how many keyframes this object has
            var k;  //Generic keyframes count
            for(k=0; k<ke.length;k++)
            {
                xmlanim = ke[k].attributes; //Getting the Frame information
                var frame = xmlanim.getNamedItem("Frame").nodeValue;        //Frame
                var object = xmlanim.getNamedItem("Object").nodeValue;      //Object   
                var visible = xmlanim.getNamedItem("Visible").nodeValue;    //Visible
				
                xmlanim = ke[k].getElementsByTagName("Position")[0].attributes; //Getting the position of the frame
                var X= parseFloat(xmlanim.getNamedItem("X").nodeValue);
                var Y= parseFloat(xmlanim.getNamedItem("Y").nodeValue);
                var pos = new Vertex2DF(X,Y);            //Position
				
                xmlanim = ke[k].getElementsByTagName("Scale")[0].attributes; //Getting the scale of the frame
                var sX= parseFloat(xmlanim.getNamedItem("X").nodeValue);
                var sY= parseFloat(xmlanim.getNamedItem("Y").nodeValue);
                var scale = new Vertex2DF(sX,sY);        //Scale
				
                xmlanim = ke[k].getElementsByTagName("Rotation")[0] //Getting the rotation of the frame
                var rotation = parseFloat(xmlanim.childNodes[0].nodeValue);
                
                xmlanim = ke[k].getElementsByTagName("Alpha")[0] //Getting the alpha of the frame
                var alpha = parseFloat(xmlanim.childNodes[0].nodeValue);
				
                var patron = "FID: ";
                object=object.replace(patron,'');
                keyframes.push( new Keyframe(parseInt(frame), object, rotation, pos, scale, alpha, visible));		
            }
				
            kaObjects[j] = new KeyframedAnimationObject(objectID, parentID, aName, keyframes); //Creating a Keyframed Animation Object
        }
        advance.animations.push( new KeyframedAnimation(ID, name, kaObjects, parseInt(start), parseInt(end)));//Creating a Keyframed Animation
    }
};

AdvanceSpriteafterLoadImages = function(advance) {

    for(var i = advance.totalModules; i < advance.modules.length; i++) 
    {                                       //For each module	
        switch(advance.modules[i].type) {
            case Module.MODULE_RECTANGLE:
                var moduleRec=advance.modules[i];
                var texture=advance.textures[moduleRec.textureID];
                
                var xa = parseInt( Vertex2DFgetX(ModuleRecgetA(moduleRec))  *  texture.width);
                var ya = parseInt( Vertex2DFgetY(ModuleRecgetA(moduleRec))  *  texture.height);
                var xb = parseInt( Vertex2DFgetX(ModuleRecgetB(moduleRec))  *  texture.width);
                var yb = parseInt( Vertex2DFgetY(ModuleRecgetB(moduleRec))  *  texture.height);
                
                //If A "is not" A
                if( xa > xb ) {
                    var aux = xb;
                    xb = xa;
                    xa = aux;
                }
                //If A "is not" A
                if(ya > yb) {
                    var aux = yb;
                    yb = ya;
                    ya = aux;
                }
                
                var width = xb - xa;
                var height = yb - ya;
                
                
                /*
                var canvas=document.createElement('canvas');
                canvas.width=width;
                canvas.height=height;
                
                var ctx = canvas.getContext('2d');
                
                var img=document.getElementById("sprite_png");
                
                ctx.drawImage(img,-xa,-yb);
                
                var dataURL = canvas.toDataURL("image/png");
                moduleRec.divElement.style.backgroundImage="url("+dataURL+")";
                */
                
                
                
                
                moduleRec.divElement.style.width=width+"px";
                moduleRec.divElement.style.height=height+"px";
                
                
                switch(advance.textures[advance.textures.length-1].source) {
                    case Texture.prototype.SOURCE_FILE:
                        moduleRec.divElement.style.backgroundImage="url("+advance.textures[moduleRec.textureID].fileName+")";
                        break;
                }

                moduleRec.divElement.style.backgroundPosition=-xa+"px "+yb+"px";
                
                break;
        }
    }
    advance.totalModules = advance.modules.length;
    for(t in advance.texts) {
        var modules=AdvanceSpritegetModulesByName(advance,t);
        for(m in modules) {
            modules[m].divElement.innerHTML=advance.texts[t];
        }
    }
    
    for(f in advance.frames) {
        var frame=advance.frames[f];
        for(m in frame.modules) {
            var mif=frame.modules[m];
            var module=AdvanceSpritegetModuleByID(advance, mif.moduleID);
            var h=getModuleHeight(module,advance.textures[module.textureID]);
            
            var divElement=module.divElement.cloneNode(true);
            frame.divElement.appendChild(divElement);
            
            setDivTransform(divElement, Vertex2DFgetX(mif.position),-Vertex2DFgetY(mif.position)-h,0,0,Vertex2DFgetX(mif.scale),Vertex2DFgetY(mif.scale))
        }
    }
    
    for(a in advance.animations) {
        var animation=advance.animations[a];
        for(o in animation.objects) {
            var kao=animation.objects[o];
            //kao.divObject.style.zIndex=o;
            if(kao.parentID != -1) {
                var parentkao=KeyframedAnimationgetObjectByID(animation,kao.parentID);
                parentkao.divElement.appendChild(kao.divElement);
            }
            
        }
    }
};

function getModuleHeight(module,texture) {
    switch(module.type) {
        case Module.MODULE_RECTANGLE:
            var moduleRec=module;
            var ya = parseInt(Vertex2DFgetY(ModuleRecgetA(moduleRec))  *  texture.height);
            var yb = parseInt(Vertex2DFgetY(ModuleRecgetB(moduleRec))  *  texture.height);
			
            if(ya > yb) {
                var aux = yb;
                yb = ya;
                ya = aux;
            }
            return yb - ya;
    }
}

function getModuleWidth(module,texture) {
    switch(module.type) {
        case Module.MODULE_RECTANGLE:
            var moduleRec=module;
            var xa = parseInt(Vertex2DFgetX(ModuleRecgetA(moduleRec))  *  texture.width);
            var xb = parseInt(Vertex2DFgetX(ModuleRecgetB(moduleRec))  *  texture.width);

            if( xa > xb ) {
                var aux = xb;
                xb = xa;
                xa = aux;
            }
            return xb - xa;
    }
}

AdvanceSpritegetModuleByID = function(advance, moduleID) {
    for (var i = 0; i < advance.modules.length; i++) {
        if (advance.modules[i].moduleID == moduleID) {
            return advance.modules[i];
        }
    }
    return null;
};

AdvanceSpritegetModulesByName = function(advance, name) {
    var modules = [];
    for (var i = 0; i < advance.modules.length; i++) {
        if (advance.modules[i].name == name) {
            modules.push(advance.modules[i]);
        }
    }
    return modules;
};

AdvanceSpritegetAnimationByID = function(advance, index) {
    for (var i = 0; i < advance.animations.length; i++) {
        if (advance.animations[i].animationID == index) {
            return advance.animations[i];
        }
    }
};

AdvanceSpritegetFrameEndByID = function(advance, index) {
    for (var i = 0; i < advance.animations.length; i++) {
        if (advance.animations[i].animationID == index) {
            return advance.animations[i].frameEnd;
        }
    }
};

AdvanceSpritegetFrameByID = function(advance, index) {
    for (var i = 0; i < advance.frames.length; i++) {
        if (advance.frames[i].frameID == index) {
            return advance.frames[i];
        }
    }
};

AdvanceSpritegetTextureWithID= function(advance, id) {
    for(var i in advance.textures) {
        if(advance.textures[i].textureID == id) {
            return advance.textures[i];
        }
    }
    return false;
};
