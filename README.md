# SVG Path Data Transformer

A [web app]((https://oyooyo.github.io/svg_path_data_transformer) for interactively transforming the data _(=the content of the "d" attribute)_ of a SVG "path" element.

## Screenshot

![Screenshot](https://raw.githubusercontent.com/oyooyo/svg_path_data_transformer/master/screenshot.png)

## Usage

To use the web app, just visit [https://oyooyo.github.io/svg_path_data_transformer](https://oyooyo.github.io/svg_path_data_transformer).

There is no proper documentation on how to use it the web app yet. But the basic steps are:
- Paste the SVG path data to transform into the "Input path data" section
- Optionally have a look at the "Input path data bounds"/"Input path data preview" sections that will show some statistics about the bounds of the untransformed SVG path data/a preview of the untransformed SVG path data
- Add one or more transformations in the "Transformations" section and set up the transformation parameters
- The "Transformed path data" section contains the transformed SVG path data
- Optionally have a look at the "Transformed path data bounds"/"Transformed path data preview" sections that will show some statistics about the bounds of the transformed SVG path data/a preview of the transformed SVG path data

## Credits

Created using [Create React App](https://github.com/facebook/create-react-app) and the [svg-pathdata](https://github.com/nfroidure/svg-pathdata) library.