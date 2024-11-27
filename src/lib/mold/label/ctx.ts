import { createMoldAttrs } from "$lib/internal/index.js";

export function getLabelData() {
	const NAME = "label";
	const PARTS = ["root"];

	const getAttrs = createMoldAttrs(NAME, PARTS);

	return {
		NAME,
		getAttrs,
	};
}
