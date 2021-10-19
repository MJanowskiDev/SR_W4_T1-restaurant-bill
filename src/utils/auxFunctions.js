const tipOptions = [ 0, 0.05, 0.01, 0.15, 0.2 ];
export const defaultTip = tipOptions[2];
export const defaultPrice = 25;
export const tax = 0.25;
export const currency = '$';

export const calculateTotalPrice = (price, tip, tax, decimals = 2) => {
	const withTip = Number(price) + price * tip;
	const withTipAndTax = withTip + withTip * tax;
	return withTipAndTax.toFixed(decimals);
};

export const toPercent = (value) => {
	return value * 100;
};

export const getTipOptions = () => {
	return tipOptions;
};
