import axios from "axios";
import { useState } from "react";
import * as yup from "yup";
import { formSchema } from "../schema";

const initialFormState = {
	name: "",
	size: "",
	pepperoni: false,
	mushroom: false,
	sausage: false,
	peppers: false,
	special: "",
};

const initialErrorState = {
	name: "",
	special: "",
};

export const Order = () => {
    const [formValues, setFormValues] = useState(initialFormState);
	const [errors, setErrors] = useState(initialErrorState);

	const onChangeHandler = (e) => {
		if (e.target.type === "checkbox") {
			setFormValues({
				...formValues,
				[e.target.name]: !formValues[e.target.name],
			});
		} else {
			setFormValues({ ...formValues, [e.target.name]: e.target.value });
		}

		if (e.target.name === "special" || e.target.name === "name") {
			yup
				.reach(formSchema, e.target.name)
				.validate(e.target.value)
				.then((valid) => {
					setErrors({
						...errors,
						[e.target.name]: "",
					});
				})
				.catch((err) => {
					setErrors({
						...errors,
						[e.target.name]: err.errors[0],
					});
				});
		}
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formValues);
		axios.post("https://reqres.in/api/orders", formValues).then((res) => {
			console.log(res);
		});
	};
    return (
        
        <>
        <h1>Order</h1>
			<form onSubmit={onSubmitHandler} id="pizza-form">
				<input
					onChange={onChangeHandler}
					value={formValues.name}
					id="name-input"
					name="name"
				/>
				{errors.name && <p>{errors.name}</p>}
				<select
					onChange={onChangeHandler}
					value={formValues.size}
					id="size-dropdown"
					name="size"
				>
					<option value=""></option>
					<option value="small">Sm</option>
					<option value="medium">Md</option>
					<option value="large">Lg</option>
				</select>
				<input
					onChange={onChangeHandler}
					checked={formValues.pepperoni}
					type="checkbox"
					value="pepperoni"
					name="pepperoni"
				/>
				Pepperoni
				<input
					onChange={onChangeHandler}
					checked={formValues.mushroom}
					type="checkbox"
					value="mushroom"
					name="mushroom"
				/>
				Mushroom
				<input
					onChange={onChangeHandler}
					checked={formValues.sausage}
					type="checkbox"
					value="sausage"
					name="sausage"
				/>
				Sausage
				<input
					onChange={onChangeHandler}
					checked={formValues.peppers}
					type="checkbox"
					value="peppers"
					name="peppers"
				/>
				Peppers
				<input
					onChange={onChangeHandler}
					value={formValues.special}
					id="special-text"
					name="special"
				/>
				{errors.special && <p>{errors.special}</p>}
				<button id="order-button">Submit</button>
			</form>
        </>
    )
}

