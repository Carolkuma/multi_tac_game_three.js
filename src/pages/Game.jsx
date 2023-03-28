import React, { useEffect } from 'react';
import {Vector2, Raycaster} from "three";

import SceneInit from "../components/SceneInit";
import TicTacToe from "../components/TicTacToe";
import {int} from "three/nodes";

const Game = () => {
    useEffect(() => {
        // Initialize scene
        const scene = new SceneInit("3jsCanvas");
        scene.initScene();
        scene.animate();

        // Initialize game
        const ticTacToe = new TicTacToe();
        scene.scene.add(ticTacToe.board);

        // Pointers to mouse and raycaster
        const mouse = new Vector2();
        const raycaster = new Raycaster();

        function onMouseDown(event) {
            // Obtain mouse's position
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Set up raycaster
            raycaster.setFromCamera(mouse, scene.camera);

            // Obtain list of objects raycaster intersects with
            const intersects = raycaster.intersectObjects(
                ticTacToe.hiddenTiles.children
            );

            console.log(intersects);

            // If raycaster intersects with any tiles, identify it by UUID, and delete it
            if (intersects.length > 0) {
                const index = ticTacToe.hiddenTiles.children.findIndex(
                    (c) => c.uuid === intersects[0].object.uuid
                );
                ticTacToe.hiddenTiles.children.splice(index, 1);
            }
        }

        // Scale up element
        const scaleUp = (obj) => {
            if (obj.scale.x < 1) {
                obj.scale.x += 0.04;
            }
            if (obj.scale.y < 1) {
                obj.scale.y += 0.04;
            }
            if (obj.scale.z < 1) {
                obj.scale.z += 0.04;
            }
        };

        // Animate board
        const animate = () => {
            ticTacToe.boardLines.children.forEach(scaleUp);
            requestAnimationFrame(animate);
        };

        window.addEventListener("mousedown", onMouseDown, false);

        animate();
    });

    return (
        <div className="Game">
            <canvas id="3jsCanvas" />
        </div>
    );
};

export default Game;