/**
 * Created by horacio on 13/08/2016.
 */
import Font from '../font';
import PIXI from 'pixi.js';
import Palette from '../utils/palette';
import TextStyle from './textstyle';

    class IndicadorMapa extends PIXI.Text {
        constructor(escala) {
            let style = new TextStyle(Font.INDICADOR_MAPA,escala);
            super(" ",style);
            this.setEscala(escala);
        }

        actualizar(numMap, x, y) {
            this.text = "Mapa " + numMap + " X: " + x + " Y: " + y;
        }

        setEscala(escala){
            this.style.setEscala(escala);
        }

    }
    export default IndicadorMapa;
