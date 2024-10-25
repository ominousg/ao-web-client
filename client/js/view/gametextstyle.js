/**
 * Created by horacio on 8/30/16.
 * PixiJS migrations by ominousf: v4.0.3 to v6.4.2 on 03/25/2023
 * v6.4.2 to 7.4.0 on 24/02/2024
 */

import { TextStyle } from 'pixi.js';

const init = (baseFont, escala = 1, font) => {
	if (font) {
		baseFont = { ...baseFont, ...font };
	}
	const _font = baseFont;
	const style = new TextStyle(baseFont);
	style._font = _font;
	style._escala = escala;
	if (escala !== 1) {
		setEscala(style, escala);
	}
	return style;
};

const setEscala = (style, scale) => {
	//escala con respecto a base_font
	style._escala = scale;

	const resizeFunc = (target) => {
		if (!isNaN(target)) {
			target *= scale;
		}
		return target;
	};

	const font = style._font;
	if (font.dropShadowBlur) {
		style.dropShadowBlur = resizeFunc(font.dropShadowBlur);
	}
	if (font.dropShadowDistance) {
		style.dropShadowDistance = resizeFunc(font.dropShadowDistance);
	}
	if (font.fontSize) {
		style.fontSize = resizeFunc(font.fontSize);
	}
	if (font.letterSpacing) {
		style.letterSpacing = resizeFunc(font.letterSpacing);
	}
	if (font.lineHeight) {
		style.lineHeight = resizeFunc(font.lineHeight);
	}
	if (font.miterLimit) {
		style.miterLimit = resizeFunc(font.miterLimit);
	}
	if (font.padding) {
		style.padding = resizeFunc(font.padding);
	}
	if (font.strokeThickness) {
		style.strokeThickness = resizeFunc(font.strokeThickness);
	}

	// setFont(font) {
	//     if (this._font !== font) {
	//         this._font = font;
	//         $.extend(this._font, this._defaults, this._font, font);
	//         Object.assign(this, this._font);
	//         this.setEscala(this._escala);
	//     }
	// }
};

export { init, setEscala };
