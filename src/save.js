/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const attributes = props.attributes;
	const { blockId } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'accordion',
		id: 'block-' + blockId,
	} );

	return (
		<div { ...blockProps }>
			<div className="card">
				<div className="card-header" id="headingOne">
					<div className="mb-0">
						<button className="btn btn-link btn-block text-left bg-primary text-white" type="button" data-toggle="collapse"
								data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							<RichText.Content value={ attributes.title } />
						</button>
					</div>
				</div>

				<div id="collapseOne" className="collapse" aria-labelledby="headingOne"
					 data-parent={ '#block-' + blockId }>
					<div className="card-body">
						<RichText.Content value={ attributes.content } />
					</div>
				</div>
			</div>
		</div>
	);
}
