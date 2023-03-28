import * as THREE from "three";

export default class TicTacToe {
    constructor() {
        // Create 3JS groups
        this.board = new THREE.Group();
        this.boardLines = new THREE.Group();
        this.hiddenTiles = new THREE.Group();
        this.crosses = new THREE.Group();
        this.circles = new THREE.Group();
        this.winLine = new THREE.Group();

        // Add groups to board
        this.board.add(this.boardLines);
        this.board.add(this.hiddenTiles);
        this.board.add(this.crosses);
        this.board.add(this.circles);
        this.board.add(this.winLine);


        // Additional data
        this.currentMarker = "o";
        this.boardCopy = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
        ];

        this._createBoard();
    }

    // Draw marker on board
    addMarker(xOffset, yOffset) {
        // Draw marker depending on whose turn it is, update boardCopy, and mark
        if (this.currentMarker === "x") {
            this.crosses.add(this._crossMarker(xOffset, yOffset));
            this._updateBoardCopy(xOffset, yOffset);
            this.currentMarker = "o";
        } else {
            this.circles.add(this._circleMarker(xOffset, yOffset));
            this._updateBoardCopy(xOffset, yOffset);
            this.currentMarker = "x";
        }
    }

    // Check if either marker won
    checkWin() {
        let strike;

        for (let n = 0; n < 3; n++) {
            if (this._checkHorizontalWin(n)) {
                strike = this._strike(64, 2, 4);
                strike.position.y = this._getOffsetY(n);
                this.winLine.add(strike);
            }
            if (this._checkVerticalWin(n)) {
                strike = this._strike(2, 64, 4);
                strike.position.x = this._getOffsetX(n);
                this.winLine.add(strike);
            }
        }

        if (this._checkRightLeaningDiagonalWin()) {
            strike = this._strike(90, 2, 4);
            strike.rotation.z = -Math.PI / 4;
            this.winLine.add(strike);
        }

        if (this._checkLeftLeaningDiagonalWin()) {
            strike = this._strike(90, 2, 4);
            strike.rotation.z = Math.PI / 4;
            this.winLine.add(strike);
        }
    }

    _getOffsetX(n) {
        if (n === 0) {
            return -24;
        } else if (n === 1) {
            return 0;
        } else {
            return 24;
        }
    }

    _getOffsetY(n) {
        if (n === 0) {
            return 24;
        } else if (n === 1) {
            return 0;
        } else {
            return -24;
        }
    }

    // #TODO
    _checkHorizontalWin(i) {
        return false;
        // 0 = 1 and 0 = 2
    }

    // #TODO
    _checkVerticalWin(i) {
        return false;
        // 0 = 1 and 0 = 2
    }

    // #TODO
    _checkRightLeaningDiagonalWin(i) {
        return false;
    }

    // #TODO
    _checkLeftLeaningDiagonalWin(i) {
        return false;
    }

    _strike(x, y, z) {
        const strikeGeometry = new THREE.BoxGeometry(x, y, z);
        const strikeMaterial = new THREE.MeshNormalMaterial();
        const strike = new THREE.Mesh(strikeGeometry, strikeMaterial);
        strike.scale.x = 0;
        strike.scale.y = 0;
        strike.scale.z = 0;
        return strike;
    }

    // Construct board
    _createBoard() {
        // Construct board lines
        this.boardLines.add(this._boardLine(64, 4, 4, 0, 12)); // top line
        this.boardLines.add(this._boardLine(64, 4, 4, 0, -12)); // bottom line
        this.boardLines.add(this._boardLine(4, 64, 4, -12, 0)); // left line
        this.boardLines.add(this._boardLine(4, 64, 4, 12, 0)); // right line

        // Construct hidden tiles for ray-casting
        this.hiddenTiles.add(this._hiddenTile(-24, 24)); // top-left tile
        this.hiddenTiles.add(this._hiddenTile(0, 24)); // top-mid tile
        this.hiddenTiles.add(this._hiddenTile(24, 24)); // top-right tile
        this.hiddenTiles.add(this._hiddenTile(-24, 0)); // mid-left tile
        this.hiddenTiles.add(this._hiddenTile(0, 0)); // mid-mid tile
        this.hiddenTiles.add(this._hiddenTile(24, 0)); // mid-right tile
        this.hiddenTiles.add(this._hiddenTile(-24, -24)); // bottom-left tile
        this.hiddenTiles.add(this._hiddenTile(0, -24)); // bottom-mid tile
        this.hiddenTiles.add(this._hiddenTile(24, -24)); // bottom-right tile
    }

    // Update board array
    _updateBoardCopy(xOffset, yOffset) {
        let i, j;

        if (xOffset < 0) {
            j = 0;
        } else if (xOffset === 0) {
            j = 1;
        } else {
            j = 2;
        }

        if (yOffset < 0) {
            i = 2;
        } else if (yOffset === 0) {
            i = 1;
        } else {
            i = 0;
        }

        if (this.currentPlayer === "o") {
            this.boardCopy[i][j] = "o";
        } else {
            this.boardCopy[i][j] = "x";
        }

        console.log(this.boardCopy);
    }

    // Construct board line
    _boardLine(x, y, z, xOffset, yOffset) {
        const boardLineGeometry = new THREE.BoxGeometry(x, y, z);
        const boardLineMaterial = new THREE.MeshNormalMaterial();
        const boardLine = new THREE.Mesh(boardLineGeometry, boardLineMaterial);
        boardLine.position.x = xOffset;
        boardLine.position.y = yOffset;
        boardLine.scale.x = 0;
        boardLine.scale.y = 0;
        boardLine.scale.z = 0;
        return boardLine;
    }

    // Create hidden tiles(create hidden mesh for raycasting)
    _hiddenTile(xOffset, yOffset) {
        const hiddenTileGeometry = new THREE.BoxGeometry(20, 20, 1);
        const hiddenTileMaterial = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.0 });
        const hiddenTile = new THREE.Mesh(hiddenTileGeometry, hiddenTileMaterial);
        hiddenTile.position.x = xOffset;
        hiddenTile.position.y = yOffset;
        return hiddenTile;
    }

    _crossMarker(xOffset, yOffset) {
        // Generate geometry, material, and mesh
        const crossGeometry = new THREE.BoxGeometry(12, 4, 4);
        const crossMaterial = new THREE.MeshNormalMaterial();
        const leftCrossStickMesh = new THREE.Mesh(crossGeometry, crossMaterial);
        const rightCrossStickMesh = new THREE.Mesh(crossGeometry, crossMaterial);
        leftCrossStickMesh.rotation.z = Math.PI / 4;
        rightCrossStickMesh.rotation.z = -Math.PI / 4;

        // Combine meshes into a group
        const cross = new THREE.Group();
        cross.add(leftCrossStickMesh);
        cross.add(rightCrossStickMesh);

        // Give group properties
        cross.position.x = xOffset;
        cross.position.y = yOffset;
        cross.scale.x = 0;
        cross.scale.y = 0;
        cross.scale.z = 0;

        return cross;
    }

    _circleMarker(xOffset, yOffset) {
        // Generate geometry, material, and mesh
        const circleGeometry = new THREE.CylinderGeometry(6, 6, 4, 100);
        const circleMaterial = new THREE.MeshNormalMaterial();
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);

        // Give mesh properties
        circleMesh.position.x = xOffset;
        circleMesh.position.y = yOffset;
        circleMesh.rotation.x = Math.PI / 2;
        circleMesh.scale.x = 0;
        circleMesh.scale.y = 0;
        circleMesh.scale.z = 0;

        return circleMesh;
    }
}
