const Button = (({
	color='primary',
	padding=1,
	children,
	...attributes
}) =>
	<button
		{...attributes}
		type="button"
		className={`btn btn-${color} p-${padding} w-100`}
	>
		{children}
	</button>
);

const Sections = (({
	children,
}) =>
	<div className="accordion">
		{children}
	</div>
);

const Section = (({
	title,
	id=title.toLowerCase().replaceAll(' ', '_'),
	header_id=`${id}-heading`,
	collapse_id=`${id}-collapse`,
	default_expanded=true,
	children,
}) =>
	<div id={id} className="accordion-item">
		<div
			id={header_id}
			className="accordion-header h3"
		>
			<button
				className={`accordion-button p-2${default_expanded ? '' : ' collapsed'}`}
				type="button"
				data-bs-toggle="collapse"
				data-bs-target={`#${collapse_id}`}
				aria-expanded={default_expanded}
				aria-controls={collapse_id}
			>
				{title}
			</button>
		</div>
		<div
			id={collapse_id}
			className={`accordion-collapse collapse${default_expanded ? ' show' : ''}`}
			aria-labelledby={header_id}
		>
			<div className="accordion-body p-2">
				{children}
			</div>
		</div>
	</div>
);

const BootstrapIcon = (({
	id,
	paths,
	scale=1,
	size=`${scale}em`,
	width=size,
	height=size,
	color='currentColor'
}) => 
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		fill={color}
		className={`bi bi-${id}`}
		viewBox="0 0 16 16"
	>
		{paths.map((path_d, index) =>
			<path
				d={path_d}
				key={index}
			/>
		)}
	</svg>
);

const TrashBootstrapIcon = (({
	...properties
}) =>
	<BootstrapIcon
		{...properties}
		id="trash"
		paths={[
		  'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z',
			'M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z',
		]}
	/>
);

const ChevronUpBootstrapIcon = (({
	...properties
}) =>
	<BootstrapIcon
		{...properties}
		id="chevron-up"
		paths={[
			'M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z',
		]}
	/>
);

const ChevronDownBootstrapIcon = (({
	...properties
}) =>
	<BootstrapIcon
		{...properties}
		id="chevron-down"
		paths={[
			'M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z',
		]}
	/>
);

const DeleteIcon = TrashBootstrapIcon;

const MoveUpIcon = ChevronUpBootstrapIcon;

const MoveDownIcon = ChevronDownBootstrapIcon;

export {
	Button,
	DeleteIcon,
	MoveDownIcon,
	MoveUpIcon,
	Section,
	Sections,
};
