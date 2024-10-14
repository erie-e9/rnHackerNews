export const urlValidator = () => {
    const checkUrl = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            console.log('dsadasda', { r: response.ok, url });

            return response.ok;
        } catch (error) {
            console.error('Error checking URL:', error);
            return false;
        }
    };

    return {
        checkUrl
    }
}