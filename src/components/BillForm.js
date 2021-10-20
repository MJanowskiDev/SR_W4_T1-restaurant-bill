import { useState } from 'react';
import { toPercent, calculateTotalPrice, getTipOptions, defaultPrice, defaultTip, tax, currency } from '../utils/auxFunctions';

const styles = {
	formSection: {
		display: 'flex',
		flexDirection: 'column',
		padding: 10,
		gap: 5,
		fontWeight: 500,
		letterSpacing: 1,
		fontSize: 18
	},

	container: {
		display: 'flex',
		flexDirection: 'column',
		padding: 10,
		gap: 5,
		fontWeight: 500,
		letterSpacing: 1,
		fontSize: 18,
		textAlign: 'center'
	},

	button: {
		borderRadius: 6,
		border: '2px solid #1982c4',
		background: 'white',
		letterSpacing: 1,
		textTransform: 'uppercase'
	},
	formField: {
		borderRadius: 6,
		border: '1px solid #4f5d75',
		background: 'white',
		letterSpacing: 1,
		paddingLeft: 5,
		textAlign: 'left',
		textTransform: 'uppercase'
	},
	totalPrice: {
		color: '#38b000'
	}
};

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
			<div style={styles.formSection}>
				<label htmlFor="price">Price {currency}: </label>
				<input style={styles.formField} id="price" defaultValue={formState.price} name="price" type="number" />
			</div>

			<div style={styles.formSection}>
				<label htmlFor="price">Tip %: </label>
				<select style={styles.formField} id="tip" name="tip" defaultValue={defaultTip}>
					{getTipOptions().sort().map((tipValue, id) => (
						<option key={id} value={tipValue}>
							{toPercent(tipValue)}
						</option>
					))}
				</select>
			</div>
			<div style={styles.formSection}>
				<button style={styles.button} type="submit">
					Calculate
				</button>
			</div>
		</form>
	);

	const totalPriceComponent = (
		<>
			<h3>Total amount:</h3>
			<h3 style={styles.totalPrice}>
				{totalPrice} {currency}
			</h3>
			<p>
				<small>
					Price includes <strong>{toPercent(tax)}%</strong> tax, and <strong>{toPercent(formState.tip)}%</strong> tip
				</small>
			</p>
			<button style={styles.button} onClick={goBackHandle}>
				Back
			</button>
		</>
	);

	return <div style={styles.container}>{priceCalculated ? totalPriceComponent : billFormComponent}</div>;
};

export default BillForm;
