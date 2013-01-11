function Texture(texture,src,wid,heig){
    this.source = src;
    this.textureID = texture;
    this.width = wid;
    this.height = heig;
	
}
Texture.prototype.SOURCE_UNDEFINED = -1;
Texture.prototype.SOURCE_FILE=0;
Texture.prototype.SOURCE_BUFFER=1;
Texture.prototype.SOURCE_STREAM=2;
	
// Methods 
TexturegetSource = function(texture) {
    return texture.source;
};
TexturesetSource = function(texture,A) {
    texture.source=A;
};
TexturegetTextureID = function(texture) {
    return texture.textureID;
};
TexturesetTextureID = function(texture,B) {
    texture.textureID=B;
};
TexturegetWidth = function(texture){
    return texture.width;
};
TexturesetWidth = function(texture,C){
    texture.width = C;
};
TexturegetHeight = function(texture){
    return texture.height;
};
TexturesetHeight = function(texture,D){
    texture.height = D;
};	
