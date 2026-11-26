// One WebGL context and one compiled shader shared by every aurora on the site.
// Each section copies the result onto its own 2D canvas, so changing pages never
// has to create a context or compile a shader again.

const vertexSource = 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }';

const fragmentSource = `
precision mediump float;
uniform vec2 size;
uniform float time;
uniform vec2 pointer;
uniform vec3 base;
uniform vec3 glowA;
uniform vec3 glowB;
uniform vec3 glowC;
uniform float strength;
uniform int mask;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  return 0.55 * noise(p) + 0.3 * noise(p * 2.03 + 11.0) + 0.15 * noise(p * 4.01 + 23.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / size;
  vec2 p = vec2(uv.x * min(size.x / size.y, 2.4), uv.y) * 1.35;
  p += (pointer - 0.5) * 0.22;
  float t = time * 0.09;

  // Warping the lookup by a second noise field gives the slow, liquid drift.
  vec2 warp = vec2(fbm(p + vec2(t, -t * 0.6)), fbm(p + vec2(-t * 0.8, t) + 5.2));
  float a = smoothstep(0.42, 0.78, fbm(p + warp * 1.7 + vec2(t * 0.5, 0.0)));
  float b = smoothstep(0.48, 0.82, fbm(p * 0.9 - warp * 1.4 + vec2(3.1, t * 0.7)));
  float c = smoothstep(0.46, 0.8, fbm(p * 1.15 + warp.yx * 1.5 + vec2(8.4, -t * 0.4)));

  float area = 1.0;
  if (mask == 1) area = smoothstep(0.82, 0.05, uv.y);
  if (mask == 2) area = smoothstep(0.95, 0.15, distance(uv * vec2(1.0, 0.9), vec2(1.0, 0.9)));

  vec3 color = base;
  color = mix(color, glowA, a * strength * area);
  color = mix(color, glowC, c * strength * 0.8 * area);
  color = mix(color, glowB, b * strength * area);
  // Fine grain hides banding in the soft gradients.
  color += (hash(gl_FragCoord.xy) - 0.5) * 0.012;
  gl_FragColor = vec4(color, 1.0);
}
`;

let engine = null;

const createEngine = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 320;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return null;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const names = ['size', 'time', 'pointer', 'base', 'glowA', 'glowB', 'glowC', 'strength', 'mask'];
  const uniforms = Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)]));

  canvas.addEventListener('webglcontextlost', () => {
    engine = null;
  });

  return {
    /** Paints one frame and copies it onto `target`, a 2D context of the given size. */
    draw(target, { width, height, palette, mask, time, pointer }) {
      // Only ever grow, since resizing a WebGL canvas reallocates its buffers.
      if (canvas.width < width) canvas.width = width;
      if (canvas.height < height) canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uniforms.size, width, height);
      gl.uniform1f(uniforms.time, time);
      gl.uniform2f(uniforms.pointer, pointer.x, 1 - pointer.y);
      gl.uniform3fv(uniforms.base, palette.base);
      gl.uniform3fv(uniforms.glowA, palette.glows[0]);
      gl.uniform3fv(uniforms.glowB, palette.glows[1]);
      gl.uniform3fv(uniforms.glowC, palette.glows[2]);
      gl.uniform1f(uniforms.strength, palette.strength);
      gl.uniform1i(uniforms.mask, mask);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // WebGL's origin is bottom-left, so the viewport sits at the foot of the canvas.
      target.drawImage(canvas, 0, canvas.height - height, width, height, 0, 0, width, height);
    },
  };
};

export default function getAuroraEngine() {
  engine ??= createEngine();
  return engine;
}
