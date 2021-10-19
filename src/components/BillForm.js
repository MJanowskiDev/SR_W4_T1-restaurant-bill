import { useState } from 'react';
import {
	toPercent,
	calculateTotalPrice,
	getTipOptions,
	defaultPrice,
	defaultTip,
	tax,
	currency
} from '../utils/auxFunctions';

const BillForm = () => {
	const [ formState, setFormState ] = useState({ price: defaultPrice, tip: defaultTip });
	const [ totalPrice, setTotalPrice ] = useState();
	const [ priceCalculated, setPriceCalculated ] = useState(false);

	const onFormChanged = (e) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		const priceTipAndTax = calculateTotalPrice(formState.price, formState.tip, tax);
		setTotalPrice(priceTipAndTax);
		setPriceCalculated(true);
	};

	const goBackHandle = () => {
		setPriceCalculated(false);
		setFormState({ price: defaultPrice, tip: defaultTip });
	};

	const billFormComponent = (
		<form onSubmit={onFormSubmit} onChange={onFormChanged}>
			<div>
				<label htmlFor='price'>Price {currency}: </label>
				<input id='price' defaultValue={formState.price} name='price' type='number' />
			</div>

			<div>
				<label htmlFor='price'>Tip %: </label>
				<select id='tip' name='tip' defaultValue={defaultTip}>
					{getTipOptions().sort().map((tipValue, id) => (
						<option key={id} value={tipValue}>
							{toPercent(tipValue)}
						</option>
					))}
				</select>
			</div>

			<button type='submit'>Calculate</button>
		</form>
	);

	const totalPriceComponent = (
		<div>
			<h1>
				{totalPrice} {currency}
			</h1>
			<p>
				<small>
					Price includes <strong>{toPercent(tax)}%</strong> tax, and{' '}
					<strong>{toPercent(formState.tip)}%</strong> tip
				</small>
			</p>
			<button onClick={goBackHandle}>Back</button>
		</div>
	);

	return <div>{priceCalculated ? totalPriceComponent : billFormComponent}</div>;
};

export default BillForm;
