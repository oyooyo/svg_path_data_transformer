import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/collapse.js';
import './App.css';

import {
	Fragment,
	useMemo,
	useState,
} from 'react';
import {
	is_path_data_valid,
	PathDataBoundsOutput,
	PathDataPreview,
	SVGPathData,
} from './path_data.mjs';
import {
	TRANSFORMATION_TYPES,
	TransformationArgumentInput,
	useTransformationsReducer,
} from './transformation.mjs';
import {
	Button,
	DeleteIcon,
	MoveDownIcon,
	MoveUpIcon,
	Section,
	Sections,
} from './ui.mjs';

const PathDataStringTextarea = (({
	invalid=false,
	...attributes
}) =>
	<textarea
		className={`form-control font-monospace${invalid ? ' bg-danger' : ''}`}
		rows="4"
		{...attributes}
	/>
);

const App = ((
) => {
	const [input_path_data_string, set_input_path_data_string] = useState('');
	const [transformations, dispatch] = useTransformationsReducer();
	const input_path_data = useMemo(
		(() => {
			try {
				return (new SVGPathData(input_path_data_string));
			} catch (error) {
				return error;
			}
		}),
		[input_path_data_string],
	);
	const output_path_data = useMemo(
		(() => {
			if (! is_path_data_valid(input_path_data)) {
				return input_path_data;
			}
			try {
				let path_data = (new SVGPathData(input_path_data.encode()));
				for (const transformation of transformations) {
					path_data = transformation.transformation_type.transform(path_data, transformation.arguments);
				}
				return path_data;
			} catch (error) {
				return error;
			}
		}),
		[input_path_data, transformations],
	);
	return (
		<div className="App container-fluid mb-2">
			<div className="display-4">
				SVG Path Data Transformer
			</div>
			<p className="lead my-2">
				Interactively transform the data <em>(=the content of the "<code>d</code>" attribute)</em> of a SVG "<code>path</code>" element.
			</p>
			<Sections>
				<Section title="Input path data">
					<PathDataStringTextarea
						invalid={! is_path_data_valid(input_path_data)}
						placeholder="(Enter SVG path d(ata) string here)"
						value={input_path_data_string}
						onChange={(event) => {
							set_input_path_data_string(event.target.value);
						}}
					/>
				</Section>
				<Section title="Input path data bounds" default_expanded={false}>
					<PathDataBoundsOutput path_data={input_path_data} />
				</Section>
				<Section title="Input path data preview" default_expanded={false}>
					<PathDataPreview path_data={output_path_data} />
				</Section>
				<div className="my-3" />
				<Section title="Transformations">
					{transformations.map((transformation, transformation_index) =>
						<div className="row my-2 align-items-center" key={transformation.id}>
							<div className="col-2">
								<span className="fw-bold">
									{transformation.transformation_type.name}
								</span>
							</div>
							<div className="col-7">
								<div className="row align-items-center">
									{Object.entries(transformation.transformation_type.arguments).map(([argument_id, argument_default_value]) =>
										<Fragment key={argument_id}>
											<div className="col-1">
												{argument_id}
											</div>
											<div className="col-3">
												<TransformationArgumentInput
													transformation_index={transformation_index}
													argument_id={argument_id}
													value={transformation.arguments[argument_id]}
													dispatch={dispatch}
												/>
											</div>
										</Fragment>
									)}
								</div>
							</div>
							<div className="col-1">
								<Button
									disabled={transformation_index === 0}
									onClick={() => {
										dispatch({
											type: 'move_transformation_up',
											transformation_index: transformation_index,
										});
									}}
								>
									<MoveUpIcon />
								</Button>
							</div>
							<div className="col-1">
								<Button
									disabled={transformation_index === (transformations.length - 1)}
									onClick={() => {
										dispatch({
											type: 'move_transformation_down',
											transformation_index: transformation_index,
										});
									}}
								>
									<MoveDownIcon />
								</Button>
							</div>
							<div className="col-1">
								<Button
									color="warning"
									onClick={() => {
										dispatch({
											type: 'remove_transformation',
											transformation_index: transformation_index,
										});
									}}
								>
									<DeleteIcon />
								</Button>
							</div>
						</div>
					)}
					<select
						className="form-select"
						aria-label="Select a transformation to be added to the transformations pipeline"
						value="none"
						onChange={(event) => {
							dispatch({
								type: 'add_transformation',
								transformation_type: TRANSFORMATION_TYPES[event.target.value],
							});
						}}
					>
						<option disabled value="none">
							Add transformation...
						</option>
						{TRANSFORMATION_TYPES.map((transformation_type, transformation_index) =>
							<option value={transformation_index} key={transformation_type.name}>
								{transformation_type.name}
							</option>
						)}
					</select>
				</Section>
				<div className="my-3" />
				<Section title="Transformed path data">
					<PathDataStringTextarea
						value={is_path_data_valid(output_path_data) ? output_path_data.encode() : ''}
						disabled
						placeholder="(Transformed SVG path d(ata) string will appear here)"
					/>
				</Section>
				<Section title="Transformed SVG path bounds" default_expanded={false}>
					<PathDataBoundsOutput path_data={output_path_data} />
				</Section>
				<Section title="Transformed SVG path preview">
					<PathDataPreview path_data={output_path_data} />
				</Section>
			</Sections>
		</div>
	);
});

export default App;
