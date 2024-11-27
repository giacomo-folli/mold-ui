import { type CreateDateRangePickerProps, createDateRangePicker } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { Writable } from "svelte/store";
import { createMoldAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";
import { getCalendarData } from "$lib/mold/calendar/ctx.js";
import { getDateFieldData } from "$lib/mold/date-field/ctx.js";
import { getPopoverData } from "$lib/mold/popover/ctx.js";
import type { FloatingConfig } from "$lib/mold/floating/floating-config.js";
import { getPositioningUpdater } from "$lib/mold/floating/helpers.js";
import type { FloatingProps } from "$lib/mold/floating/_types.js";

function getDateRangePickerData() {
	const NAME = "date-range-picker" as const;
	return {
		NAME,
	};
}

export function setCtx(props: CreateDateRangePickerProps) {
	const { NAME } = getDateRangePickerData();

	const { NAME: CALENDAR_NAME, PARTS: CALENDAR_PARTS } = getCalendarData();
	const getCalendarAttrs = createMoldAttrs(CALENDAR_NAME, CALENDAR_PARTS);
	const { NAME: FIELD_NAME, PARTS: FIELD_PARTS } = getDateFieldData();
	const getFieldAttrs = createMoldAttrs(FIELD_NAME, FIELD_PARTS);
	const { NAME: POPOVER_NAME, PARTS: POPOVER_PARTS } = getPopoverData();
	const getPopoverAttrs = createMoldAttrs(POPOVER_NAME, POPOVER_PARTS);

	const dateRangePicker = {
		...createDateRangePicker({ ...removeUndefined(props), forceVisible: true }),
		getCalendarAttrs,
		getFieldAttrs,
		getPopoverAttrs,
	};
	const updateOption = getOptionUpdater(dateRangePicker.options);
	setContext(NAME, { ...dateRangePicker, updateOption });

	return {
		...dateRangePicker,
		updateOption,
	};
}

export function getCtx() {
	const { NAME } = getDateRangePickerData();
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
