/**
 * Created by horacio on 6/17/16.
 */

import PopUp from "./popup";

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="detallesClan" title="CLANES">
    <div class="dialogContent">
        <div class="panel-group scrollFlex">
            <div class="panel panel-default">
                <div class="panel-heading">Informacion</div>
                <div class="panel-body">
                    Nombre:<span id="detallesClan_nombre"></span><br>
                    Miembros:<span id="detallesClan_miembros"></span><br>
                    Lider:<span id="detallesClan_lider"></span><br>
                    Fundador:<span id="detallesClan_fundador"></span><br>
                    Web site:<span id="detallesClan_web"></span><br>
                    Clanes enemigos:<span id="detallesClan_enemigos"></span><br>
                    Clanes aliados:<span id="detallesClan_aliados"></span><br>
                    Puntos de antifaccion:<span id="detallesClan_puntosAntifaccion"></span><br>
                    Fecha de creación:<span id="detallesClan_fechaCreacion"></span><br>
                    Elecciones:<span id="detallesClan_elecciones"></span><br>
                    Alineacion:<span id="detallesClan_alineacion"></span><br>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Codex</div>
                <div id="detallesClan_codex" class="panel-body"></div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Descripcion</div>
                <div id="detallesClan_descripcion" class="panel-body"></div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="btn-toolbar">
                <button id="detallesClan_botonAplicarse" class="btn btn-primary pull-right">Aplicarse</button>
                <button id="detallesClan_botonCerrar" class="btn btn-default pull-right">Cerrar</button>
            </div>
        </div>
    </div>
</article>

</body>
</html>
`;

    class DetallesClan extends PopUp {
        constructor(game,solicitudClanCb) {

            var options = {
                width: 500,
                height: 400,
                minWidth: 250,
                minHeight: 300
            };
            var $element = $(`<div>${htmlString}</div>`);
            super($element, options);

            this.game = game;
            this.clan = "";
            this.$botonAbrirSolicitud = $("#detallesClan_botonAplicarse");
            this.$botonCerrar = $("#detallesClan_botonCerrar");

            this.solicitudClanCb = solicitudClanCb;
            this.initCallbacks();
        }

        show(targetClan) {
            super.show();
            this.game.client.sendGuildRequestDetails(targetClan);
            this.clan = targetClan;
        }


        setClanInfo(GuildName, Founder, FoundationDate, Leader, URL, MemberCount, ElectionsOpen, Aligment, EnemiesCount, AlliesCount, AntifactionPoints, Codex, GuildDesc) {
            $("#detallesClan_nombre").text(GuildName);
            $("#detallesClan_miembros").text(MemberCount);
            $("#detallesClan_fundador").text(Founder);
            $("#detallesClan_lider").text(Leader);
            $("#detallesClan_web").text(URL);
            $("#detallesClan_enemigos").text(EnemiesCount);
            $("#detallesClan_aliados").text(AlliesCount);
            $("#detallesClan_puntosAntifaccion").text(AntifactionPoints);
            $("#detallesClan_fechaCreacion").text(FoundationDate);
            $("#detallesClan_elecciones").text(ElectionsOpen);
            $("#detallesClan_alineacion").text(Aligment);
            $("#detallesClan_codex").text(Codex);
            $("#detallesClan_descripcion").text(GuildDesc);
        }

        initCallbacks() {
            var self = this;

            this.$botonAbrirSolicitud.click(function () {
                self.solicitudClanCb(self.clan);
            });

            this.$botonCerrar.click(function(){
                self.hide();
            });
        }

    }

    export default DetallesClan;
