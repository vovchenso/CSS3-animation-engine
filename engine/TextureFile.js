function TextureFile (textureID,width,height,fileName) {
    this.fileName = fileName;
    //Super constructor
    Texture.call(this,textureID,0,width,height);
}
TextureFile.prototype = new Texture;
	
TextureFilegetFileName = function(texture) {
    return texture.fileName;
};
TextureFilesetFileName = function(texture,A) {
    texture.fileName = A;
};
TextureFiletoString = function(texture){
    return texture.textureID +"\n"+texture.source+"\n"+texture.width+"\n"+texture.height+"\n"+texture.fileName;
};