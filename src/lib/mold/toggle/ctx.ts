import { type CreateToggleProps, createToggle } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";

function getToggleData() {
	const NAME = "toggle" as const;
	const PARTS = ["root", "input"] as const;
	return {
		NAME,
		PARTS,
	};
}

type GetReturn = Omit<ReturnType<typeof setCtx>, "updateOption">;

export function setCtx(props: CreateToggleProps) {
	const { NAME, PARTS } = getToggleData();
	const getAttrs = createMoldAttrs(NAME, PARTS);
	const toggle = { ...createToggle(removeUndefined(props)), getAttrs };
	setContext(NAME, toggle);
	return {
		...toggle,
		updateOption: getOptionUpdater(toggle.options),
	};
}

export function getCtx() {
	const { NAME } = getToggleData();
	return getContext<GetReturn>(NAME);
}
