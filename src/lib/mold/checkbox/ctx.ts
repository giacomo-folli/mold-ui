import { type CreateCheckboxProps, createCheckbox } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";

export function getCheckboxData() {
	const NAME = "checkbox" as const;
	const PARTS = ["root", "input", "indicator"] as const;
	return {
		NAME,
		PARTS,
	};
}

type GetReturn = Omit<ReturnType<typeof setCtx>, "updateOption">;

export function setCtx(props: CreateCheckboxProps) {
	const { NAME, PARTS } = getCheckboxData();
	const getAttrs = createMoldAttrs(NAME, PARTS);

	const checkbox = { ...createCheckbox(removeUndefined(props)), getAttrs };
	setContext(NAME, checkbox);

	return {
		...checkbox,
		updateOption: getOptionUpdater(checkbox.options),
	};
}

export function getCtx() {
	const { NAME } = getCheckboxData();
	return getContext<GetReturn>(NAME);
}
