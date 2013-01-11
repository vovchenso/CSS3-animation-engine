
//"Abstract" class Color
function Color(type) {
	this.TYPEUNDEFINED = -1;
    this.TYPERGBAF = 0;
    this.TYPERGBF = 1;
	this.type = type;
}

ColorgetType = function(color) {
	return color.type;
};


//ColorRGBAF Class, child of Color
function ColorRGBAF(r, g, b, a) {
	Color.call(this, 0);
    
	if (typeof(r) === 'number') {
		this.f = [1, 1, 1, 1];
		this.f[0] = r;
		this.f[1] = g;
		this.f[2] = b;
		this.f[3] = a;
	} else if (typeof(r) === 'string') {
		var str = X.replace(/\(/gi,"").replace(/\)/gi,"").replace(/E-/gi,E-0).split(",");
		this.f[0] = parseFloat(str[0]);
		this.f[1] = parseFloat(str[1]);
		this.f[2] = parseFloat(str[2]);
		this.f[2] = parseFloat(str[3]);
	} else if (r instanceof ColorRGBAF) {
		this.f[0] = r.f[0];
        this.f[1] = r.f[1];
        this.f[2] = r.f[2];
        this.f[3] = r.f[3];
	} else if (r instanceof ColorRGBF) {
	    this.f[0] = r.f[0];
        this.f[1] = r.f[1];
        this.f[2] = r.f[2];
        this.f[3] = 1.0;
	}
}

//ColorRGBAF methods
ColorRGBAF.prototype = new Color;
ColorRGBAFtoString = function(color) {
	return "("+color.f[0]+", "+color.f[1]+", "+color.f[2]+", "+color.f[3]+")";
};
ColorRGBAFgetAsVector = function(color) {
	return color.f;
};
ColorRGBAFequals = function(color, o) {
	if (o instanceof Color) {
		switch (o.type) {
			case 0: //TYPERGBAF
				if (o.f[0] == color.f[0]
                        && o.f[1] == color.f[1]
                        && o.f[2] == color.f[2]
                        && o.f[3] == color.f[3]) {
                    return true;
                }
				break;
            case 1: //TYPERGBF
                if (o.f[0] == color.f[0]
                        && o.f[1] == color.f[1]
                        && o.f[2] == color.f[2]) {
                    return true;
                }
                break;
        }
    }
    return false;
};

ColorRGBAFmultiply = function(color, c) {
    switch (c.type) {
        case 0://TYPERGBAF:
            return new ColorRGBAF(o.f[0] * color.f[0], o.f[1] * color.f[1], o.f[2] * color.f[2], o.f[3] * color.f[3]);
        case 1://TYPERGBF:
            return new ColorRGBAF(o.f[0] * color.f[0], o.f[1] * color.f[1], o.f[2] * color.f[2], 1);
    }
    return null;
}



//ColorRGBF class
function ColorRGBF(r, g, b) {
	Color.call(this, 1);
	if (typeof(r) === 'number') {
		this.f=[1, 1, 1];
		this.f[0] = r;
		this.f[1] = g;
		this.f[2] = b;
	} else if (typeof(r) === 'string') {
		var str = X.replace(/\(/gi,"").replace(/\)/gi,"").replace(/E-/gi,E-0).split(",");
		this.f[0] = parseFloat(str[0]);
		this.f[1] = parseFloat(str[1]);
		this.f[2] = parseFloat(str[2]);
	} else if (r instanceof ColorRGBAF) {
		this.f[0] = r.f[0];
        this.f[1] = r.f[1];
        this.f[2] = r.f[2];
	} else if (r instanceof ColorRGBF) {
	    this.f[0] = r.f[0];
        this.f[1] = r.f[1];
        this.f[2] = r.f[2];
	}
}


//ColorRGBF methods
ColorRGBF.prototype = new Color;
ColorRGBFtoString = function(color) {
	return "("+color.f[0]+", "+color.f[1]+", "+color.f[2]+")";
};
ColorRGBFgetAsVector = function(color) {
	return color.f;
};
ColorRGBFequals = function(color,o){
	if (o instanceof Color) {
		switch (o.type) {
			case 0: //TYPERGBAF
				if (o.f[0] == color.f[0]
                        && o.f[1] == color.f[1]
                        && o.f[2] == color.f[2]) {
                    return true;
                }
				break;
            case 1: //TYPERGBF
                if (o.f[0] == color.f[0]
                        && o.f[1] == color.f[1]
                        && o.f[2] == color.f[2]) {
                    return true;
                }
                break;
        }
    }
    return false;
};

ColorRGBFmultiply = function(color, c) {
    switch (c.type) {
        case 0://TYPERGBAF:
            return new ColorRGBAF(o.f[0] * color.f[0], o.f[1] * color.f[1], o.f[2] * color.f[2]);
        case 1://TYPERGBF:
            return new ColorRGBAF(o.f[0] * color.f[0], o.f[1] * color.f[1], o.f[2] * color.f[2]);
    }
    return null;
};