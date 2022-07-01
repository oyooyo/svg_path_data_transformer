const convert_degrees_to_radians = ((degrees) =>
	(degrees * (Math.PI / 180))
);

// TODO Improve names and argument names
const TRANSFORMATION_TYPES = [
	{
		name: 'annotateArcs',
		arguments: {
		},
		transform: ((path_data) =>
			path_data.annotateArcs()
		),
	},
	{
		name: 'aToC',
		arguments: {
		},
		transform: ((path_data) =>
			path_data.aToC()
		),
	},
	{
		name: 'matrix',
		arguments: {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			e: 0,
			f: 0,
		},
		transform: ((path_data, {a, b, c, d, e, f}) =>
			path_data.matrix(a, b, c, d, e, f)
		),
	},
	{
		name: 'normalizeHVZ',
		arguments: {
			z: true,
			h: true,
			v: true,
		},
		transform: ((path_data, {z, h, v}) =>
			path_data.normalizeHVZ(z, h, v)
		),
	},
	{
		name: 'normalizeST',
		arguments: {
		},
		transform: ((path_data) =>
			path_data.normalizeST()
		),
	},
	{
		name: 'qtToC',
		arguments: {
		},
		transform: ((path_data) =>
			path_data.qtToC()
		),
	},
	{
		name: 'Round',
		arguments: {
			decimals: 0,
		},
		transform: ((path_data, {decimals}) =>
			path_data.round(Math.pow(10, decimals))
		),
	},
	{
		name: 'Rotate',
		arguments: {
			a: 0,
			x: 0,
			y: 0,
		},
		transform: ((path_data, {a, x, y}) =>
			path_data.rotate(convert_degrees_to_radians(a), x, y)
		),
	},
	{
		name: 'sanitize',
		arguments: {
			eps: 0,
		},
		transform: ((path_data, {eps}) =>
			path_data.sanitize(eps)
		),
	},
	{
		name: 'Scale',
		arguments: {
			xy: 1,
		},
		transform: ((path_data, {xy}) =>
			path_data.scale(xy)
		),
	},
	{
		name: 'Scale X/Y',
		arguments: {
			x: 1,
			y: 1,
		},
		transform: ((path_data, {x, y}) =>
			path_data.scale(x, y)
		),
	},
	{
		name: 'Skew X',
		arguments: {
			a: 0,
		},
		transform: ((path_data, {a}) =>
			path_data.skewX(convert_degrees_to_radians(a))
		),
	},
	{
		name: 'Skew Y',
		arguments: {
			a: 0,
		},
		transform: ((path_data, {a}) =>
			path_data.skewY(convert_degrees_to_radians(a))
		),
	},
	{
		name: 'To Abs',
		arguments: {
		},
		transform: ((path_data) =>
			path_data.toAbs()
		),
	},
	{
		name: 'To Rel',
		arguments: {
		},
		transform: ((path_data) =>
			path_data.toRel()
		),
	},
	{
		name: 'Translate',
		arguments: {
			x: 0,
			y: 0,
		},
		transform: ((path_data, {x, y}) =>
			path_data.translate(x, y)
		),
	},
	{
		name: 'xSymmetry',
		arguments: {
			xOffset: 0,
		},
		transform: ((path_data, {xOffset}) =>
			path_data.xSymmetry(xOffset)
		),
	},
	{
		name: 'ySymmetry',
		arguments: {
			yOffset: 0,
		},
		transform: ((path_data, {yOffset}) =>
			path_data.ySymmetry(yOffset)
		),
	},
];

export default TRANSFORMATION_TYPES;
