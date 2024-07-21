"use strict";
const shape = {
    getVertexCount(indices) {
        return indices.length;
    },
    generateNormals(points, indices) {
        let normals = [];
        for (let i = 0; i < indices.length; i += 3) {
            let triangleStart = indices[i] * 3;
            let p1 = vec3.fromValues(points[triangleStart], points[triangleStart + 1], points[triangleStart + 2]), p2 = vec3.fromValues(points[triangleStart + 3], points[triangleStart + 4], points[triangleStart + 5]), p3 = vec3.fromValues(points[triangleStart + 6], points[triangleStart + 7], points[triangleStart + 8]);
            let l1 = vec3.subtract([], p2, p1);
            let l2 = vec3.subtract([], p3, p1);
            let normal = vec3.create();
            vec3.normalize(normal, vec3.cross(normal, l1, l2));
            normals = normals.concat(...normal, ...normal);
        }
        return normals;
    }
};
//# sourceMappingURL=shape.js.map