
function Module (module,nam,texture,typ) 
{
    //Attributes
    this.moduleID = module;
    this.name = nam;
    this.textureID = texture;
    this.type = typ;
	
    this.divElement=document.createElement('div');
    this.divElement.id=this.name;
    this.divElement.className="Module";

}
//Constants
Module.MODULE_UNDEFINED = -1;
Module.MODULE_TRIANGLE = 0;
Module.MODULE_RECTANGLE = 1;
    
	
//Methods 
ModulegetModuleID = function(module){
    return module.moduleID;
};
ModulegetName = function (module){
    return module.name;
};
ModulegetImageID = function(module){
    return module.textureID;
};
ModulegetType = function(module){
    return module.type;
};

