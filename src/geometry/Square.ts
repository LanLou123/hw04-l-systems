import {vec3, vec4} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Square extends Drawable {
  indices: Uint32Array;
  positions: Float32Array;
  colors: Float32Array;
  spos: Float32Array; // Data for bufTranslate
  len :number = 10;

  constructor(len:number) {

    super(); // Call the constructor of the super class. This is required.
    this.len = len;
  }

  create() {

  this.indices = new Uint32Array([0, 1, 2,
                                  0, 2, 3]);

  this.positions = new Float32Array([-this.len, 0, -this.len, 1,
                                      this.len, 0, -this.len, 1,
                                        this.len, 0, this.len, 1,
                                     -this.len, 0, this.len, 1]);

    this.generateIdx();
    this.generatePos();
    this.generateSpos();


    this.count = this.indices.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

    console.log(`Created square`);
  }

  setInstanceVBOs(offsets: Float32Array) {
    this.spos = offsets;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufSPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.spos, gl.STATIC_DRAW);


  }
};

export default Square;
