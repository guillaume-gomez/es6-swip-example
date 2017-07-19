export const CellWidth = 50;
export const ElapsedTime = 500;
export const SizeTerrain = 51;
export const AntsColor = [
	"brown",
	"red",
	"yellow",
	"grey"
];

export function convertToNumberColor(color) {
	if(!AntsColor.includes(color)) {
		return 0;
	}
	return AntsColor.indexOf(color);
}

export const WidthCanvas = 800;
export const HeighCanvas = 600;