/**
 * Created by horacio on 4/12/16.
 */

import PopUp from './popup';

const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/main.css" type="text/css">
</head>
<body>

<article id="popUpMapa">
    <div style="height:100%; display: flex;  flex-direction: row;">

        <div class="tabsContainer" style="display: flex; flex-direction: column;">
            <ul class="nav nav-pills nav-stacked">
                <li class="icon-menu active" id="mapaIconoMapaGlobal" href="#mapaTabMapaGlobal"
                    data-toggle="tab"></li>
                <li class="icon-menu" id="mapaIconoDungeons" href="#mapaTabMapaDungeons" data-toggle="tab"></li>
            </ul>
            <div class="tabsFiller"></div>
        </div>

        <div class="tab-content dialogContent" style="flex: 1;">
            <div id="mapaTabMapaGlobal" class="tab-pane active" style="width:100%; height:100%;">
                <div id="imagenMapa" class="divImagen"></div>
            </div>
            <div id="mapaTabMapaDungeons" class="tab-pane" style="width:100%; height:100%;">
                <div id="imagenMapaDungeons" class="divImagen"></div>
            </div>
        </div>
    </div>

</article>

</body>
</html>
`;

class GuiaMapa extends PopUp {
	constructor(game, acciones) {
		var options = {
			title: 'MAPA',
			width: 710,
			height: 650
		};
		var $element = $(`<div>${htmlString}</div>`);
		super($element, options);
		this.initCallbacks();
	}

	initCallbacks() {
		var self = this;
		$('#mapaBotonCerrar').click(function () {
			self.hide();
		});
		// $("#mapaBotonToggle").click(function () {
		//     $("#popUpMapa").toggleClass("mapaSeccionB");
		// });
	}
}

export default GuiaMapa;
