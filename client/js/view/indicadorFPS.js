import Font from '../font';
import PIXI from 'pixi.js';
import TextStyle from './textstyle';

    class IndicadorFPS extends PIXI.Text {
        constructor(escala) {
            let style = new TextStyle(Font.INDICADOR_MAPA,escala);
            super(" ",style);
            this.setEscala(escala);
        }

        actualizar(fps) {
            this.text = "FPS: " + fps;
        }

        setEscala(escala){
            this.style.setEscala(escala);
        }

    }
    export default IndicadorFPS;
