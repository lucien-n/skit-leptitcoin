import { toastStore } from "@skeletonlabs/skeleton";

export function formatDate(milliseconds: number): string {
    const date = new Date(milliseconds);

    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${month} ${day} ${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`;

    return formattedDate;
}

export function warn(message: string, autohide = false) {
    toastStore.trigger({
        message: message,
        background: 'variant-glass-warn',
        autohide: autohide,
    });
}

export function success(message: string, autohide = true) {
    toastStore.trigger({
        message: message,
        background: 'variant-glass-success',
        autohide: autohide,
    });
}

export function info(message: string, autohide = true) {
    toastStore.trigger({
        message: message,
        background: 'variant-glass-info',
        autohide: autohide,
    });
}