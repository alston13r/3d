"use strict";
class UVSphere extends MutableShape {
    constructor(radius = 1, verticalDivisions = 1, horizontalDivisions = 3) {
        verticalDivisions = Math.max(verticalDivisions, 1);
        horizontalDivisions = Math.max(horizontalDivisions, 3);
        // points
        const points = [new Vec3(0, 1, 0), new Vec3(0, -1, 0)];
        for (let i = 0; i < horizontalDivisions; i++) {
            const phi = lerp(i, 0, horizontalDivisions, 0, 2 * Math.PI);
            const right = Vec3.RotateAround(new Vec3(0, 0, 1), points[0], phi);
            for (let j = 1; j <= verticalDivisions; j++) {
                const theta = lerp(j, 0, verticalDivisions + 1, 0, Math.PI);
                points.push(points[0].rotateAround(right, theta));
            }
        }
        const getLayerPointIndex = (layerIndex, pointIndex) => layerIndex * verticalDivisions + pointIndex + 2;
        // triangles
        const triangles = [];
        // top and bottom chunks
        const lastPointIndex = verticalDivisions - 1;
        for (let i = 0; i < horizontalDivisions - 1; i++) {
            triangles.push([0, getLayerPointIndex(i + 1, 0), getLayerPointIndex(i, 0)], [1, getLayerPointIndex(i, lastPointIndex), getLayerPointIndex(i + 1, lastPointIndex)]);
        }
        const lastSliceIndex = horizontalDivisions - 1;
        // edge case
        triangles.push([0, getLayerPointIndex(0, 0), getLayerPointIndex(lastSliceIndex, 0)], [1, getLayerPointIndex(lastSliceIndex, lastPointIndex), getLayerPointIndex(0, lastPointIndex)]);
        // the rest
        if (verticalDivisions > 1) {
            for (let i = 0; i < horizontalDivisions - 1; i++) {
                for (let j = 0; j < verticalDivisions - 1; j++) {
                    const topLeft = getLayerPointIndex(i, j);
                    const topRight = getLayerPointIndex(i + 1, j);
                    const bottomRight = getLayerPointIndex(i + 1, j + 1);
                    const bottomLeft = getLayerPointIndex(i, j + 1);
                    triangles.push([topLeft, topRight, bottomRight], [topLeft, bottomRight, bottomLeft]);
                }
            }
        }
        // edge case
        for (let i = 0; i < verticalDivisions - 1; i++) {
            const topLeft = getLayerPointIndex(lastSliceIndex, i);
            const topRight = getLayerPointIndex(0, i);
            const bottomRight = getLayerPointIndex(0, i + 1);
            const bottomLeft = getLayerPointIndex(lastSliceIndex, i + 1);
            triangles.push([topLeft, topRight, bottomRight], [topLeft, bottomRight, bottomLeft]);
        }
        points.forEach(point => Vec3.Normal(point));
        super(points, triangles);
        this.stretch(radius, radius, radius);
    }
}
//# sourceMappingURL=UVSphere.js.map