import { toastStore } from '@skeletonlabs/skeleton';

export const TITLE = 'LePtitCoin';

export const LISTING_CONDITIONS = ['New', 'Very good', 'Good', 'Satisfactory', 'For parts'];

export const LISTING_CATEGORIES = ['Vehicles', 'Fashion', 'Housing', 'Multimedia', 'Recreational'];

export function formatDate(milliseconds: number): string {
	const date = new Date(milliseconds);

	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formatted_date = `${month} ${day} ${hours.toString().padStart(2, '0')}h${minutes
		.toString()
		.padStart(2, '0')}`;

	return formatted_date;
}

export function warnToast(message: string, autohide = false) {
	toastStore.trigger({
		message: message,
		background: 'variant-glass-warning',
		autohide: autohide
	});
}

export function successToast(message: string, autohide = true) {
	toastStore.trigger({
		message: message,
		background: 'variant-glass-success',
		autohide: autohide
	});
}

export function infoToast(message: string, autohide = true) {
	toastStore.trigger({
		message: message,
		background: 'variant-glass-info',
		autohide: autohide
	});
}
