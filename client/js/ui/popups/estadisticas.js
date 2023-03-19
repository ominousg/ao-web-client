/**
 * Created by horacio on 7/10/16.
 */

import PopUp from "./popup";
import { Enums } from '../../enums';

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<article id="estadisticas">
    <div class="dialogContent">
        <div class="panel-group scrollFlex">
            <div class="panel panel-default">
                <div class="panel-heading">Atributos</div>
                <div class="panel-body">
                    Fuerza:<span id="estadisticas_fuerza"></span><br>
                    Agilidad:<span id="estadisticas_agilidad"></span><br>
                    Inteligencia:<span id="estadisticas_inteligencia"></span><br>
                    Carisma:<span id="estadisticas_carisma"></span><br>
                    Constitucion:<span id="estadisticas_constitucion"></span><br>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Reputacion</div>
                <div class="panel-body">
                    Asesino:<span id="estadisticas_asesino"></span><br>
                    Bandido:<span id="estadisticas_bandido"></span><br>
                    Ladron:<span id="estadisticas_ladron"></span><br>
                    Burgues:<span id="estadisticas_burgues"></span><br>
                    Noble:<span id="estadisticas_noble"></span><br>
                    Plebe:<span id="estadisticas_plebe"></span><br>
                    Status:<span id="estadisticas_status"></span><br>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Estadisticas</div>
                <div class="panel-body">
                    Criminales matados:<span id="estadisticas_criminalesMatados"></span><br>
                    Ciudadanos matados:<span id="estadisticas_ciudadanosMatados"></span><br>
                    Usuarios matados:<span id="estadisticas_usuariosMatados"></span><br>
                    Criaturas matadas:<span id="estadisticas_criaturasMatadas"></span><br>
                    Clase:<span id="estadisticas_clase"></span><br>
                    Tiempo restante en carcel:<span id="estadisticas_tiempoRestanteCarcel"></span><br>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Skills</div>
                <div class="panel-body">
                    <table id="estadisticasContenedorSkills">
                    </table>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button id="estadisticas_botonCerrar" class="btn btn-default">Cerrar</button>
        </div>
    </div>
</article>

</body>
</html>
`;

    class Estadisticas extends PopUp {

        constructor(game) {

            var options = {
                title: "ESTADISTICAS",
                width: 500,
                height: 400,
                minWidth: 250,
                minHeight: 300
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);

            this.game = game;

            this.$botonCerrar = $("#estadisticas_botonCerrar");
            this.$contenedorSkills = $("#estadisticasContenedorSkills");

            this.skills = this.game.skills;
            this.skillsInicializados = false;

            this.initCallbacks();
        }

        show() {
            super.show();
            this.game.client.sendRequestAtributes();
            this.game.client.sendRequestSkills();
            this.game.client.sendRequestMiniStats();
            this.game.client.sendRequestFame();
            this.updateData();
        }

        updateData() {
            this.skills = this.game.skills;
            this.updateSkillsData();
        }

        setAtributosInfo(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion) {
            $("#estadisticas_fuerza").text(Fuerza);
            $("#estadisticas_agilidad").text(Agilidad);
            $("#estadisticas_inteligencia").text(Inteligencia);
            $("#estadisticas_carisma").text(Carisma);
            $("#estadisticas_constitucion").text(Constitucion);
        }

        setFameInfo(Asesino, Bandido, Burgues, Ladron, Noble, Plebe, Promedio) {
            $("#estadisticas_asesino").text(Asesino);
            $("#estadisticas_bandido").text(Bandido);
            $("#estadisticas_burgues").text(Burgues);
            $("#estadisticas_ladron").text(Ladron);
            $("#estadisticas_noble").text(Noble);
            $("#estadisticas_plebe").text(Plebe);
            if (Promedio < 0) {
                $("#estadisticas_status").text("Criminal");
            } else {
                $("#estadisticas_status").text("Ciudadano");
            }
        }

        setMiniStats(CiudadanosMatados, CriminalesMatados, UsuariosMatados, NpcsMuertos, Clase, Pena) {
            $("#estadisticas_ciudadanosMatados").text(CiudadanosMatados);
            $("#estadisticas_criminalesMatados").text(CriminalesMatados);
            $("#estadisticas_usuariosMatados").text(UsuariosMatados);
            $("#estadisticas_criaturasMatadas").text(NpcsMuertos);
            $("#estadisticas_clase").text(Enums.NombreClase[Clase]);
            $("#estadisticas_tiempoRestanteCarcel").text(Pena);
        }

        updateSkillsData() {
            this.$contenedorSkills.empty();
            var self = this;
            this.skills.forEachSkill(function (numSkill, puntos, porcentaje, nombre) {
                self.$contenedorSkills.append('<tr>'
                    + '<td class="secondaryColor">'+nombre+'</td>'
                    + '<td class="everywhereBoldFont">'+puntos+'</td>'
                    + '</tr>');
            });
        }

        initCallbacks() {
            var self = this;

            this.$botonCerrar.click(function () {
                self.hide();
            });
        }

    }

    export default Estadisticas;