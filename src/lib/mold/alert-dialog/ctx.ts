import { type CreateDialogProps as CreateAlertDialogProps, createDialog } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";

type SetProps = CreateAlertDialogProps;

function getAlertDialogData() {
	const NAME = "alert-dialog" as const;
	const PARTS = [
		"action",
		"cancel",
		"content",
		"description",
		"overlay",
		"portal",
		"title",
		"trigger",
	] as const;

	return { NAME, PARTS };
}

export function setCtx(props: SetProps) {
	const { NAME, PARTS } = getAlertDialogData();
	const getAttrs = createMoldAttrs(NAME, PARTS);
	const initAlertDialog = createDialog({
		...removeUndefined(props),
		role: "alertdialog",
		forceVisible: true,
	});
	const alertDialog = {
		...initAlertDialog,
		getAttrs,
		updateOption: getOptionUpdater(initAlertDialog.options),
	};

	setContext(NAME, alertDialog);
	return {
		...alertDialog,
		updateOption: getOptionUpdater(alertDialog.options),
		getAttrs,
	};
}

export function getCtx() {
	const { NAME } = getAlertDialogData();
	return getContext<ReturnType<typeof setCtx>>(NAME);
}
