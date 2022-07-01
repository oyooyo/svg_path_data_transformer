import {
	useReducer,
} from 'react';
import TRANSFORMATION_TYPES from './TRANSFORMATION_TYPES.mjs';

const splice_array_out_of_place = ((
	array,
	...args
) => {
	const new_array = array.slice();
	new_array.splice(...args);
	return new_array;
});

const transformations_reducer = ((
	transformations,
	action,
) => {
	switch (action.type) {
		case 'set_transformation_argument':
			const transformation = transformations[action.transformation_index];
			return splice_array_out_of_place(
				transformations,
				action.transformation_index,
				1,
				{
					...transformation,
					arguments: {
						...transformation.arguments,
						[action.argument_id]: action.value,
					},
				},
			);
		case 'add_transformation':
			return [
				...transformations,
				{
					id: transformations.reduce(
						((accumulator, transformation) =>
							Math.max(accumulator, (transformation.id + 1))
						),
						1,
					),
					transformation_type: action.transformation_type,
					arguments: action.transformation_type.arguments,
				},
			];
		case 'remove_transformation':
			return splice_array_out_of_place(
				transformations,
				action.transformation_index,
				1,
			);
		case 'move_transformation_up':
			return splice_array_out_of_place(
				transformations,
				(action.transformation_index - 1),
				2,
				transformations[action.transformation_index],
				transformations[action.transformation_index - 1],
			);
		case 'move_transformation_down':
			return splice_array_out_of_place(
				transformations,
				action.transformation_index,
				2,
				transformations[action.transformation_index + 1],
				transformations[action.transformation_index],
			);
		default:
			throw (new Error(`Invalid action type "${action.type}"`));
	}
});

const useTransformationsReducer = ((
) =>
	useReducer(transformations_reducer, [])
);

const TRANSFORMATION_ARGUMENT_TYPES = {
	number: {
		input_element_type: 'number',
		input_element_classname: 'form-control',
		parse: ((value_string) =>
			Number(value_string)
		),
	},
	boolean: {
		input_element_type: 'checkbox',
		input_element_classname: 'form-check-input',
		parse: ((value_string) =>
			Boolean(value_string)
		),
	},
};

const TransformationArgumentInput = (({
	value,
	dispatch,
	transformation_index,
	argument_id,
	value_type=TRANSFORMATION_ARGUMENT_TYPES[typeof value],
}) =>
	<input
		type={value_type.input_element_type}
		className={value_type.input_element_classname}
		value={value}
		onChange={(event) => {
			dispatch({
				type: 'set_transformation_argument',
				transformation_index: transformation_index,
				argument_id: argument_id,
				value: value_type.parse(event.target.value),
			});
		}}
	/>
);

export {
	TRANSFORMATION_TYPES,
	TransformationArgumentInput,
	useTransformationsReducer,
};
