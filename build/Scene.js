"use strict";
class Scene {
    graphics;
    nearPlaneDistance;
    farPlaneDistance;
    nearPlane;
    farPlane;
    distancePlanes;
    leftPlane;
    topPlane;
    rightPlane;
    bottomPlane;
    borderPlanes;
    projectionMatrix;
    objects = [];
    camera;
    constructor(fov = 90, nearPlaneDistance = 0.1, farPlaneDistance = 1000) {
        this.graphics = new Graphics().appendTo(document.body);
        this.nearPlaneDistance = nearPlaneDistance;
        this.farPlaneDistance = farPlaneDistance;
        this.createCamera(fov, nearPlaneDistance, farPlaneDistance);
        this.nearPlane = new Plane(new Vec3(0, 0, nearPlaneDistance), new Vec3(0, 0, 1));
        this.farPlane = new Plane(new Vec3(0, 0, farPlaneDistance), new Vec3(0, 0, -1));
        this.distancePlanes = [this.nearPlane, this.farPlane];
        this.leftPlane = new Plane(new Vec3(0, 0, 0), new Vec3(1, 0, 0));
        this.topPlane = new Plane(new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        this.rightPlane = new Plane(new Vec3(this.width, 0, 0), new Vec3(-1, 0, 0));
        this.bottomPlane = new Plane(new Vec3(0, this.height, 0), new Vec3(0, -1, 0));
        this.borderPlanes = [this.leftPlane, this.topPlane, this.rightPlane, this.bottomPlane];
    }
    get width() {
        return this.graphics.width;
    }
    get height() {
        return this.graphics.height;
    }
    createCamera(fov = 90, nearPlane = 0.1, farPlane = 1000) {
        if (this.camera) {
            const oldCamera = this.camera;
            this.camera = new Camera().translate(oldCamera.position);
            this.camera.orientation = oldCamera.orientation.copy();
        }
        else
            this.camera = new Camera();
        this.projectionMatrix = this.graphics.createProjectionMatrix(fov, nearPlane, farPlane);
        return this;
    }
    clipTriangleAgainstNearFarPlanes(triangle) {
        return Plane.ClipTriangle(triangle, this.distancePlanes);
    }
    clipTriangleAgainstBorderPlanes(triangle) {
        return Plane.ClipTriangle(triangle, this.borderPlanes);
    }
}
//# sourceMappingURL=Scene.js.map