import { type CreateToggleGroupProps, createToggleGroup } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";

function getToggleGroupData() {
	const NAME = "toggle-group" as const;
	const PARTS = ["root", "item"] as const;
	return {
		NAME,
		PARTS,
	};
}

type GetReturn = Omit<ReturnType<typeof setCtx>, "updateOption">;

export function setCtx<T extends "single" | "multiple">(props: CreateToggleGroupProps<T>) {
	const { NAME, PARTS } = getToggleGroupData();

	const getAttrs = createMoldAttrs(NAME, PARTS);
	const toggleGroup = { ...createToggleGroup(removeUndefined(props)), getAttrs };
	setContext(NAME, toggleGroup);
	return {
		...toggleGroup,
		updateOption: getOptionUpdater(toggleGroup.options),
	};
}

export function getCtx() {
	const { NAME } = getToggleGroupData();
	return getContext<GetReturn>(NAME);
}
