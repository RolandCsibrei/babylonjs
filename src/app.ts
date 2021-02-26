
/// <reference path="../vendor/babylon.d.ts" />

import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, SceneLoader, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, StandardMaterial, Color3, Space } from "@babylonjs/core";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

		// load mesh

        const url = "./models/"
        const fileName = "ancient-cube.glb"
        
        var material = new StandardMaterial("red", scene)
        material.diffuseColor = Color3.Red()

        var mesh
        SceneLoader.ImportMesh("", url, fileName, scene, (loaded) => {        
            mesh = loaded[0].getChildMeshes()[0]
            mesh.position.copyFromFloats(0, 1, 0)
            mesh.scaling.copyFromFloats(0.1,0.1, 0.1)
            mesh.material = material

            camera.target = mesh.position;
            console.log(mesh)
        })
    
        //

        
        const rotate = function() {
            mesh?.rotate(new Vector3(-1, 1, -1), 7 * Math.PI / 12, Space.LOCAL);
        }
    
        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });
        // run the main render loop
        engine.runRenderLoop(() => {

            rotate();

            scene.render();
        });
    }
}
new App();