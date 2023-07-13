import { modalStore } from '@skeletonlabs/skeleton';

export const confirmModal = async ({
	title = 'Please Confirm',
	body = 'Execute action?'
}): Promise<boolean> => {
	const confirm = await new Promise<boolean>((resolve) => {
		modalStore.trigger({
			type: 'confirm',
			title: title,
			body: body,
			response: (r: boolean) => {
				resolve(r);
			}
		});
	});
	return confirm;
};
