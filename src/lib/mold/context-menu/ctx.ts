import { type CreateContextMenuProps, createContextMenu } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { Writable } from "svelte/store";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";
import { getPositioningUpdater } from "$lib/mold/floating/helpers.js";
import type { FloatingConfig } from "$lib/mold/floating/floating-config.js";
import type { FloatingProps } from "$lib/mold/floating/_types.js";

export function getContextMenuData() {
	const NAME = "menu";

	const PARTS = [
		"arrow",
		"checkbox-indicator",
		"checkbox-item",
		"content",
		"group",
		"item",
		"label",
		"radio-group",
		"radio-item",
		"separator",
		"sub-content",
		"sub-trigger",
		"trigger",
	] as const;

	return {
		NAME,
		PARTS,
	};
}

type GetReturn = Omit<ReturnType<typeof setCtx>, "updateOption">;

export function setCtx(props: CreateContextMenuProps) {
	const { NAME, PARTS } = getContextMenuData();
	const getAttrs = createMoldAttrs("menu", PARTS);

	const contextMenu = { ...createContextMenu(removeUndefined(props)), getAttrs };
	setContext(NAME, contextMenu);
	return {
		...contextMenu,
		updateOption: getOptionUpdater(contextMenu.options),
	};
}

export function getCtx() {
	const { NAME } = getContextMenuData();
	return getContext<GetReturn>(NAME);
}

export function updatePositioning(props: FloatingProps) {
	const defaultPlacement = {
		side: "bottom",
		align: "start",
	} satisfies FloatingProps;

	const withDefaults = { ...defaultPlacement, ...props } satisfies FloatingProps;
	const {
		options: { positioning },
	} = getCtx();

	const updater = getPositioningUpdater(positioning as Writable<FloatingConfig>);
	updater(withDefaults);
}
