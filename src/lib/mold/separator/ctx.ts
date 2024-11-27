import { type CreateSeparatorProps, createSeparator } from "@melt-ui/svelte";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";

function getSeparatorData() {
	const NAME = "separator" as const;
	const PARTS = ["root"] as const;
	return {
		NAME,
		PARTS,
	};
}

export function setCtx(props: CreateSeparatorProps) {
	const { NAME, PARTS } = getSeparatorData();
	const getAttrs = createMoldAttrs(NAME, PARTS);
	const separator = { ...createSeparator(removeUndefined(props)), getAttrs };
	return {
		...separator,
		updateOption: getOptionUpdater(separator.options),
	};
}
