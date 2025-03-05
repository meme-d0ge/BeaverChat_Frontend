export const useConverterToll = () => {
    const toPx = (percent: number) => {
        return percent * (window.innerWidth / 100)
    }
    const toPercent = (px: number) => {
        return px / (window.innerWidth / 100)
    }

    return {toPx, toPercent};
};