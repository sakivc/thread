var R;

function setup() {
	createCanvas(800, 800);
	R = new rope(100, 5);
}

function draw() {
	background(51);
	R.run();
}

class rope {
	constructor(_n, _len) {
		this.joint = [];
		for (let i = 0; i < _n; i++) {
			let _pos = i == 0 ? createVector(random(width), random(height)) : this.joint[i - 1].B.copy();
			let _ang = random(-PI,PI);
			this.joint[i] = new stick(_pos, _len, _ang);
		}
	}
	run() {
		for (let i = 0; i < this.joint.length; i++) {
			let _pos = i == 0 ? createVector(mouseX, mouseY) : this.joint[i - 1].B.copy();
			this.joint[i].update(_pos);
			this.joint[i].show();
		}
	}
}
class stick {
	constructor(_pos, _len, _ang) {
		this.A = _pos;
		this.len = _len;
		this.ang = _ang;
		this.B = createVector(cos(this.ang), sin(this.ang)).mult(this.len).add(this.A);
	}
	update(_pos) {
		this.A = _pos;
		let _V = this.B.copy().sub(this.A); // vector
		let _H = createVector(this.B.x, 0); // horizontal axis
		this.ang = _H.angleBetween(_V); // angle
		this.B = createVector(cos(this.ang), sin(this.ang)).mult(this.len).add(this.A);
	}
	show() {
		push();
		stroke(255);
		noFill();
		line(this.A.x, this.A.y, this.B.x, this.B.y);
		pop();
	}
}
