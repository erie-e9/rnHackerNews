import { Logger } from "@services";

export const urlValidator = () => {
    const checkUrl = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url, { method: 'HEAD' });

            return response.ok;
        } catch (error) {
            Logger.warn('Error checking URL:', error);
            return false;
        }
    };

    return {
        checkUrl
    }
}