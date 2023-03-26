import Entity from "./entity";

class Item extends Entity {
	constructor(gridX, gridY) {
		super(gridX, gridY);
		this.sprite = null;
	}

}
export default Item;

