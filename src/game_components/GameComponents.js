import createMeshBoardLine from "./createMeshBoardLine";
import createMeshCircle from "./createMeshCircle";
import createMeshCross from "./createMeshCross";
import createMeshHiddenBoardTile from "./createMeshHiddenBoardTile";
import createMeshWinLine from "./createMeshWinLine";
import createMeshCog from "./createMeshCog";
import createMeshStartButton from "./createMeshStartButton";
import createMeshText from "./createMeshText";

/**
 * Static class containing methods for construction meshes of different
 * components of Tic-Tac-Toe game.
 */
class GameComponents {
    ////////////////////
    //      BOARD     //
    ////////////////////
    static createMeshBoardLine = createMeshBoardLine;
    static createMeshHiddenBoardTile = createMeshHiddenBoardTile;
    static createMeshWinLine = createMeshWinLine;

    ////////////////////
    //     MARKERS    //
    ////////////////////
    static createMeshCircle = createMeshCircle;
    static createMeshCross = createMeshCross;

    ////////////////////
    //      TEXT      //
    ////////////////////
    static createMeshText = createMeshText;

    ////////////////////
    //      MISC      //
    ////////////////////
    static createMeshCog = createMeshCog;
    static createMeshStartButton = createMeshStartButton;

}

export default GameComponents;