import { type CreateDatePickerProps, createDatePicker } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { Writable } from "svelte/store";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";
import { getCalendarData } from "$lib/mold/calendar/ctx.js";
import { getDateFieldData } from "$lib/mold/date-field/ctx.js";
import { getPopoverData } from "$lib/mold/popover/ctx.js";
import { getPositioningUpdater } from "$lib/mold/floating/helpers.js";
import type { FloatingConfig } from "$lib/mold/floating/floating-config.js";
import type { FloatingProps } from "$lib/mold/floating/_types.js";

function getDatePickerData() {
	const NAME = "date-picker" as const;
	return {
		NAME,
	};
}

export function setCtx(props: CreateDatePickerProps) {
	const { NAME } = getDatePickerData();
	const { NAME: CALENDAR_NAME, PARTS: CALENDAR_PARTS } = getCalendarData();
	const getCalendarAttrs = createMoldAttrs(CALENDAR_NAME, CALENDAR_PARTS);
	const { NAME: FIELD_NAME, PARTS: FIELD_PARTS } = getDateFieldData();
	const getFieldAttrs = createMoldAttrs(FIELD_NAME, FIELD_PARTS);
	const { NAME: POPOVER_NAME, PARTS: POPOVER_PARTS } = getPopoverData();
	const getPopoverAttrs = createMoldAttrs(POPOVER_NAME, POPOVER_PARTS);

	const datePicker = {
		...createDatePicker({ ...removeUndefined(props), forceVisible: true }),
		getCalendarAttrs,
		getFieldAttrs,
		getPopoverAttrs,
	};
	const updateOption = getOptionUpdater(datePicker.options);
	setContext(NAME, { ...datePicker, updateOption });

	return {
		...datePicker,
		updateOption,
	};
}

export function getCtx() {
	const { NAME } = getDatePickerData();
	return getContext<ReturnType<typeof setCtx>>(NAME);
}

export function updatePositioning(props: FloatingProps) {
	const defaultPlacement = {
		side: "bottom",
		align: "center",
	} satisfies FloatingProps;
	const withDefaults = { ...defaultPlacement, ...props } satisfies FloatingProps;
	const {
		options: { positioning },
	} = getCtx();

	const updater = getPositioningUpdater(positioning as Writable<FloatingConfig>);
	updater(withDefaults);
}
