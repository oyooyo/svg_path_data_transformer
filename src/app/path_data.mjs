import {
	useMemo,
	useState,
} from 'react';
import {
	SVGPathData,
} from 'svg-pathdata';

const is_path_data_valid = ((
	path_data,
) =>
	(! (path_data instanceof Error))
);

const is_finite_number = Number.isFinite;

const value_string_with_default = ((
	value_string,
	default_value,
) =>
	(value_string || default_value)
);

const usePathDataBounds = ((
	path_data,
) =>
	useMemo((() => {
		const {maxX, maxY, minX, minY} = (is_path_data_valid(path_data)
			? path_data.getBounds()
			: {maxX:null, maxY:null, minX:null, minY:null}
		);
		return [
			minX,
			minY,
			((is_finite_number(maxX) && is_finite_number(minX))
				? (maxX - minX)
				: null
			),
			((is_finite_number(maxY) && is_finite_number(minY))
				? (maxY - minY)
				: null
			),
			maxX,
			maxY,
		].map((ordinate) =>
			(is_finite_number(ordinate)
				? ordinate
				: null
			)
		);
	}), [path_data])
);

const format_ordinate = ((
	ordinate,
) =>
	(is_finite_number(ordinate)
		? Number(ordinate.toFixed(6))
		: ''
	)
);

const PathDataCoordinateOutput = (({
	label,
	x,
	y,
}) =>
	<>
		<div className="col-4">
			{label}:
		</div>
		<div className="col-1 text-end">
			X
		</div>
		<div className="col-3">
			{format_ordinate(x)}
		</div>
		<div className="col-1 text-end">
			Y
		</div>
		<div className="col-3">
			{format_ordinate(y)}
		</div>
	</>
);

const PathDataBoundsOutput = (({
	path_data,
}) => {
	const [minimum_x, minimum_y, size_x, size_y, maximum_x, maximum_y] = usePathDataBounds(path_data);
	return (
		<div className="row">
			<PathDataCoordinateOutput label="Minimum" x={minimum_x} y={minimum_y} />
			<PathDataCoordinateOutput label="Maximum" x={maximum_x} y={maximum_y} />
			<PathDataCoordinateOutput label="Size" x={size_x} y={size_y} />
		</div>
	);
});

const ViewBoxOrdinateInput = (({
	label,
	user_value,
	set_user_value,
	default_value,
}) =>
	<>
		<div className="col-2 col-sm-1">
			{label}:
		</div>
		<div className="col-4 col-sm-2">
			<input
				className="form-control"
				type="text"
				value={user_value}
				onChange={(event) => {
					set_user_value(event.target.value);
				}}
				placeholder={default_value}
			/>
		</div>
	</>
);

const PathDataPreview = (({
	path_data,
	background_color='#ffffff',
}) => {
	const [bounds_left, bounds_top, bounds_width, bounds_height] = usePathDataBounds(path_data);
	const [user_viewbox_left, set_user_viewbox_left] = useState('');
	const [user_viewbox_top, set_user_viewbox_top] = useState('');
	const [user_viewbox_width, set_user_viewbox_width] = useState('');
	const [user_viewbox_height, set_user_viewbox_height] = useState('');
	const [user_width, set_user_width] = useState('');
	const [user_height, set_user_height] = useState('');
	const viewbox_left = value_string_with_default(user_viewbox_left, bounds_left);
	const viewbox_top = value_string_with_default(user_viewbox_top, bounds_top);
	const viewbox_width = value_string_with_default(user_viewbox_width, bounds_width);
	const viewbox_height = value_string_with_default(user_viewbox_height, bounds_height);
	const width = value_string_with_default(user_width, "100%");
	const height = value_string_with_default(user_height, "100%");
	return (
		<div>
			<div className="row align-items-center">
				<ViewBoxOrdinateInput label="Left" user_value={user_viewbox_left} set_user_value={set_user_viewbox_left} default_value={bounds_left} />
				<ViewBoxOrdinateInput label="Top" user_value={user_viewbox_top} set_user_value={set_user_viewbox_top} default_value={bounds_top} />
				<ViewBoxOrdinateInput label="Width" user_value={user_viewbox_width} set_user_value={set_user_viewbox_width} default_value={bounds_width} />
				<ViewBoxOrdinateInput label="Height" user_value={user_viewbox_height} set_user_value={set_user_viewbox_height} default_value={bounds_height} />
			</div>
			<div className="row align-items-center">
				<ViewBoxOrdinateInput label="Width" user_value={user_width} set_user_value={set_user_width} default_value="100%" />
				<ViewBoxOrdinateInput label="Height" user_value={user_height} set_user_value={set_user_height} default_value="100%" />
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`${viewbox_left},${viewbox_top} ${viewbox_width},${viewbox_height}`}
				width={width}
				height={height}
			>
				{background_color
					? <path d={`M${viewbox_left},${viewbox_top}h${viewbox_width}v${viewbox_height}h-${viewbox_width}z`} fill={background_color} />
					: null
				}
				{is_path_data_valid(path_data)
					? <path d={path_data.encode()} />
					: null
				}
			</svg>
		</div>
	);
});

export {
	is_path_data_valid,
	PathDataBoundsOutput,
	PathDataPreview,
	SVGPathData,
	usePathDataBounds,
};
