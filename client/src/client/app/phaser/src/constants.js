export const CellWidth = 50;
export const ElapsedTime = 500;
export const SizeTerrain = 51;
export const WidthCanvas = 1276;
export const HeighCanvas = 510;

export const initialStateMock = {
	id: 'htm970h',
	size: { width: WidthCanvas, height: HeighCanvas },
	transform: { x: 0, y: 0 },
	//transform: { x: -640.0799999999999, y: -88.0846593284227 },
	adjacentClientIDs: [],
	clusterID: 'r8x2vaa',
	//openings: {"left":[],"top":[],"right":[{"start":0,"end":363.63686948275586}],"bottom":[]},
	openings: {"left":[{"start":100,"end":363.63686948275586}],"top":[{"start":100,"end":363.63686948275586}],"right":[{"start":100,"end":363.63686948275586}],"bottom":[{"start":100,"end":363.63686948275586}]},
	data: { rotationX: 0, rotationY: 0 },
converter: {screenSize: 21, scalingFactor: 2.1202607594827216}
}