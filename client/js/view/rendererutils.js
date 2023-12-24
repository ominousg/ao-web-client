export const removePixiChild = (parent, child) => {
	let options = { children: true };
	parent.removeChild(child);
	child.destroy(options);
};

export const posicionarRectEnTile = (rect) => {
	// posicionar grafico abajo al medio del tile
	rect.y += -rect.height + 32;
	rect.x += -rect.width / 2 + 16;
};
