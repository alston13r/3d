"use strict";
const shaderManager = {
    sources: {
        vsSource: `
      attribute vec4 aVertexPosition;
      attribute vec3 aVertexNormal;
      attribute vec4 aVertexColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uNormalMatrix;
      uniform mat4 uProjectionMatrix;

      varying lowp vec4 vColor;
      varying highp vec3 vLighting;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;

        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
      }
    `,
        fsSource: `
      varying lowp vec4 vColor;
      varying highp vec3 vLighting;

      void main() {
        gl_FragColor = vec4(vColor.rgb * vLighting, 1.0);
      }
    `
    },
    initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = shaderManager.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = shaderManager.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            let log = gl.getProgramInfoLog(shaderProgram);
            throw `Unable to initialize the shader program: ${log}`;
        }
        return shaderProgram;
    },
    loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            let log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw `An error occurred compiling the shaders: ${log}`;
        }
        return shader;
    },
    createProgramInfo(gl, shaderProgram) {
        return {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
                vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
            }
        };
    },
    useProgram(gl, program) {
        gl.useProgram(program);
        return gl;
    }
};
//# sourceMappingURL=shaders.js.map