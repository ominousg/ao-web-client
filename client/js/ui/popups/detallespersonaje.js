/**
 * Created by horacio on 7/9/16.
 */

import PopUp from './popup';

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="detallesPersonaje">
    <div class="dialogContent">
        <div class="panel panel-default">
            <div class="panel-heading">Informacion</div>
            <div class="panel-body">
                Nombre:<span id="detallesPersonaje_nombre"></span><br>
                Raza:<span id="detallesPersonaje_raza"></span><br>
                Clase:<span id="detallesPersonaje_clase"></span><br>
                Genero:<span id="detallesPersonaje_genero"></span><br>
                Nivel:<span id="detallesPersonaje_nivel"></span><br>
                Oro:<span id="detallesPersonaje_oro"></span><br>
                Banco:<span id="detallesPersonaje_banco"></span><br>
                Clan:<span id="detallesPersonaje_clan"></span><br>
                Facción:<span id="detallesPersonaje_faccion"></span><br>
                Ciudadanos asesinados:<span id="detallesPersonaje_ciudadanosAsesinados"></span><br>
                Criminales asesinados:<span id="detallesPersonaje_criminalesAsesinados"></span><br>
                Reputación:<span id="detallesPersonaje_reputacion"></span><br>
                Alineación:<span id="detallesPersonaje_alineacion"></span><br>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Ultimas solicitudes de ingreso</div>
            <div id="detallesPersonaje_SolicitudesIngreso" class="panel-body"></div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Ultimos clanes que integró</div>
            <div id="detallesPersonaje_clanesIntegrados" class="panel-body"></div>
        </div>
        <button id="detallesPersonaje_botonCerrar" class="btn btn-default">Cerrar</button>
    </div>
</article>

</body>
</html>
`;

class DetallesPersonaje extends PopUp {
	constructor(game) {
		var options = {
			title: 'DETALLES PERSONAJE',
			width: 500,
			height: 400,
			minWidth: 250,
			minHeight: 300
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);

		this.game = game;
		this.clan = '';
		this.$botonCerrar = $('#detallesPersonaje_botonCerrar');

		this.initCallbacks();
	}

	show(
		CharName,
		Race,
		Class,
		Gender,
		Level,
		Gold,
		Bank,
		Reputation,
		PreviousPetitions,
		CurrentGuild,
		PreviousGuilds,
		RoyalArmy,
		ChaosLegion,
		CiudadanosMatados,
		CriminalesMatados
	) {
		this.setPersonajeInfo(
			CharName,
			Race,
			Class,
			Gender,
			Level,
			Gold,
			Bank,
			Reputation,
			PreviousPetitions,
			CurrentGuild,
			PreviousGuilds,
			RoyalArmy,
			ChaosLegion,
			CiudadanosMatados,
			CriminalesMatados
		);
		super.show();
	}

	setPersonajeInfo(
		CharName,
		Race,
		Class,
		Gender,
		Level,
		Gold,
		Bank,
		Reputation,
		PreviousPetitions,
		CurrentGuild,
		PreviousGuilds,
		RoyalArmy,
		ChaosLegion,
		CiudadanosMatados,
		CriminalesMatados
	) {
		$('#detallesPersonaje_nombre').text(CharName);
		$('#detallesPersonaje_raza').text(Race);
		$('#detallesPersonaje_clase').text(Class);
		$('#detallesPersonaje_genero').text(Gender);
		$('#detallesPersonaje_nivel').text(Level);
		$('#detallesPersonaje_oro').text(Gold);
		$('#detallesPersonaje_banco').text(Bank);
		$('#detallesPersonaje_clan').text(CurrentGuild);
		$('#detallesPersonaje_faccion').text(RoyalArmy);
		$('#detallesPersonaje_ciudadanosAsesinados').text(CiudadanosMatados);
		$('#detallesPersonaje_criminalesAsesinados').text(CriminalesMatados);
		$('#detallesPersonaje_reputacion').text(Reputation);
		$('#detallesPersonaje_alineacion').text(ChaosLegion);
		$('#detallesPersonaje_SolicitudesIngreso').text(PreviousPetitions);
		$('#detallesPersonaje_clanesIntegrados').text(PreviousGuilds);
	}

	initCallbacks() {
		var self = this;

		this.$botonCerrar.click(function () {
			self.hide();
		});
	}
}

export default DetallesPersonaje;
