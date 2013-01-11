function Vertex2DF(X,Y){

    this.C = new Array();
    // Constructors 
    if(typeof(X)==='string'){
	
        var str= new Array();
        str = X.replace(/\(/gi,"").replace(/\)/gi,"").split(",");
        this.C[0] = parseFloat(str[0]);
        this.C[1] = parseFloat(str[1]);
	
    }else if(typeof(X)==='number'){
		
        this.C[0]=X;
        this.C[1]=Y;
    }else if(typeof(X)==='undefined'){
        this.C[0]=0;
        this.C[0]=0;
    }else{
        this.C[0]=X.X;
        this.C[1]=X.Y;
    }
}
// Methods 
Vertex2DFtoString = function(vertex){
    return "("+vertex.C[0]+","+vertex.C[1]+")";
};
Vertex2DFgetX = function(vertex) {
    return vertex.C[0];
};
Vertex2DFsetX = function(vertex,A) {
    vertex.C[0]=A;
};
Vertex2DFgetY = function(vertex) {
    return vertex.C[1];
};
Vertex2DFsetY = function(vertex,B) {
    vertex.C[1]=B;
};
Vertex2DFgetCoordsAsVector = function(vertex){
    return vertex.C;
};
Vertex2DFadd = function(vertex,v){
    vertex.C[0]+=Vertex2DFgetX(v);
    vertex.C[1]+=Vertex2DFgetY(v);
};
Vertex2DFadded = function(vertex,v){
    var x = vertex.C[0]+Vertex2DFgetX(v);
    var y = vertex.C[1]+Vertex2DFgetY(v);
    var ver = new Vertex2DF(x,y);
    return ver;
};
Vertex2DFsubstract = function(vertex,v){
    vertex.C[0]-=Vertex2DFgetX(v);
    vertex.C[1]-=Vertex2DFgetY(v);
};	
Vertex2DFsubstracted = function(vertex,v){
    var x = vertex.C[0]-Vertex2DFgetX(v);
    var y = vertex.C[1]-Vertex2DFgetY(v);
    var ver = new Vertex2DF(x,y);
    return ver;
};	
Vertex2DFdot = function(vertex,v){
    vertex.C[0]*=Vertex2DFgetX(v);
    vertex.C[1]*=Vertex2DFgetY(v);
};	
Vertex2DFscale = function(vertex,f){
    vertex.C[0]*=f;
    vertex.C[1]*=f;
};
Vertex2DFscaled = function(vertex,f){
    return new Vertex2DF(vertex.C[0]*f,vertex.C[1]*f);
};
Vertex2DFscaleArray = function(vertex,ar,f){
    var x=0;
    for(x=0;x<ar.length;x++){
        ar[x].C[0] *= f;
        ar[x].C[1] *= f;
    }
};
Vertex2DFrotate = function(vertex,rad) {
    var x = (vertex.C[0] * Math.cos(rad) - vertex.C[1] * Math.sin(rad));
    var y = (vertex.C[0] * Math.sin(rad) + vertex.C[1] * Math.cos(rad));
    vertex.C[0] = x;
    vertex.C[1] = y;
};

Vertex2DFrotated = function(vertex,rad) {
    var x =(C[0] * Math.cos(rad) - C[1] * Math.sin(rad));
    var y = (C[0] * Math.sin(rad) + C[1] * Math.cos(rad));
    var ver =new Vertex2DF(x, y);
    return ver;
};

Vertex2DFrotateArray = function(vertex,ar,rad){
    var i=0;
    for(i=0;i<ar.length;i++){
        x = (ar[i].C[0] * Math.cos(rad) - ar[i].C[1] * Math.sin(rad));
        y = (ar[i].C[0] * Math.sin(rad) + ar[i].C[1] * Math.cos(rad));
        ar[i].C[0] = x;
        ar[i].C[1] = y;
    }
};
Vertex2DFtranslate = function(vertex,o,y){
    if(typeof(o)==='number'){
        vertex.C[0]+=o;
        vertex.C[1]+=y;
    }
    else{
        vertex.C[0]+=o.C[0];
        vertex.C[1]+=o.C[1];
    }
};
Vertex2DFtranslateArray = function(vertex,ar,f){
    var x=0;
    for(x=0;x<ar.length;x++){
        ar[x].C[0] += f;
        ar[x].C[1] += f;
    }
};
Vertex2DFlenght = function(vertex){
    return Math.sqrt(vertex.C[0]*vertex.C[0]+vertex.C[1]*vertex.C[1]);
};
Vertex2DFnormalize = function(vertex){
    var l = vertex.lenght();
    vertex.C[0]/=l;
    vertex.C[1]/=l;
};
Vertex2DFnormalized = function(vertex){
    var l = vertex.length;
    return new Vertex2DF(vertex.C[0]/l,vertex.C[1]/l);
};
	
Vertex2DFgetVertexArrayAsFloatArray = function(vertex,ar) {
    var f = new Array();
    var i;
    for (i = 0; i < ar.length; i++) {
        f.push(Vertex2DFgetX(ar[i]));
        f.push(Vertex2DFgetY(ar[i]));
    }
    return f;
};
Vertex2DFequals = function(vertex,obj){
    if(obj instanceof Vertex2DF){
        if(Vertex2DFgetX(obj)==vertex.C[0]&& Vertex2DFgetY(obj)==vertex.C[1])
            return true;
    }
    return false;
};	
Vertex2DFgetRectangleFromVertexArray = function(vertex,vertexArray) {
    var rect =[
    new Vertex2DF(Number.MAX_VALUE, Number.MAX_VALUE),
    new Vertex2DF(Number.MIN_VALUE, Number.MIN_VALUE)
    ];
    var v =0;
    for (v=0;v<vertexArray.length;v++) {
        if (vertexArray[v].C[0] < rect[0].C[0]) {
            rect[0].C[0] = vertexArray[v].C[0];
        }

        if (vertexArray[v].C[1] < rect[0].C[1]) {
            rect[0].C[1] = vertexArray[v].C[1];
        }

        if (vertexArray[v].C[0] > rect[1].C[0]) {
            rect[1].C[0] = vertexArray[v].C[0];
        }

        if (vertexArray[v].C[1] > rect[1].C[1]) {
            rect[1].C[1] = vertexArray[v].C[1];
        }
    }
    return rect;
};

Vertex2DFgetMinimumFromVertexArray = function(vertex,vertexArray) {
    var min = new Vertex2DF(Number.MAX_VALUE, Number.MAX_VALUE);
    var v =0;
    for (v=0;v<vertexArray.length;v++) {
        if (vertexArray[v].C[0] < min.C[0]) {
            min.C[0] = vertexArray[v].C[0];
        }

        if (vertexArray[v].C[1] < min.C[1]) {
            min.C[1] = vertexArray[v].C[1];
        }
    }
    return min;
};
    
Vertex2DFgetMaximumFromVertexArray = function(vertex,vertexArray) {
    var max = new Vertex2DF(Number.MIN_VALUE, Number.MIN_VALUE);
    var v =0;
    for (v=0;v<vertexArray.length;v++) {
        if (vertexArray[v].C[0] > max.C[0]) {
            max.C[0] = vertexArray[v].C[0];
        }

        if (vertexArray[v].C[1] > max.C[1]) {
            max.C[1] = vertexArray[v].C[1];
        }
    }
    return max;
};
    
Vertex2DFisInsideTriangle = function(vertex,triangle,point) {

    var a = triangle[0].C[0];
    var b = triangle[0].C[1];

    var c = triangle[1].C[0];
    var d = triangle[1].C[1];

    var e = triangle[2].C[0];
    var f = triangle[2].C[1];

    var k, l, m, n, o, p;
    k = e * (b - d) + f * (c - a) + a * d - b * c;
    l = point.C[0] * (b - d) + point.C[1] * (c - a) + a * d - b * c;

    m = a * (f - d) + b * (c - e) + e * d - f * c;
    n = point.C[0] * (f - d) + point.C[1] * (c - e) + e * d - f * c;

    o = c * (b - f) + d * (e - a) + a * f - b * e;
    p = point.C[0] * (b - f) + point.C[1] * (e - a) + a * f - b * e;

    if (l == 0 || n == 0 || p == 0) {
        return true;
    } else if ((k / l >= 0) && (m / n >= 0) && (o / p >= 0)) {
        return true;
    }
    return false;
};