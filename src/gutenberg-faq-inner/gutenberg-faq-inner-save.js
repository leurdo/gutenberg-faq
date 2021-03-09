

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function GutenbergFaqInnerSave( props ) {
	const attributes = props.attributes;
	const { innerBlockId } = attributes;
	const id = 'block-' + innerBlockId;
	const target = '#block-' + innerBlockId;
	const heading = 'heading-' + innerBlockId;
	const parentBlockClientId = wp.data.select( 'core/block-editor' ).getBlockParents(innerBlockId)[0];
	const parentId = '#block-' + parentBlockClientId;

	return (
		<div className="card">
			<div className="card-header" id={ heading }>
				<div className="mb-0">
					<button className="btn btn-link btn-block text-left bg-primary text-white" type="button" data-toggle="collapse"
							data-target={ target } aria-expanded="true" aria-controls={ id }>
						<RichText.Content value={ attributes.title } />
					</button>
				</div>
			</div>

			<div id={ id } className="collapse" aria-labelledby={ heading }
				 data-parent={ parentId }>
				<div className="card-body">
					<RichText.Content value={ attributes.content } />
				</div>
			</div>
		</div>
	);
}
