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
import {RichText} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import '../editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function GutenbergFaqInnerEdit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { innerBlockId } = attributes;
	if ( ! innerBlockId ) {
		setAttributes( { innerBlockId: clientId } );
	}
	const id = 'block-' + innerBlockId;
	const target = '#block-' + innerBlockId;
	const heading = 'heading-' + innerBlockId;
	const parentBlockClientId = wp.data.select( 'core/block-editor' ).getBlockParents( innerBlockId )[0];
	const parentId = '#block-' + parentBlockClientId;

	return (
		<div className="card">
			<div className="card-header" id={ heading }>
				<div className="mb-0">
					<button className="btn btn-link btn-block text-left bg-primary text-white" type="button" data-toggle="collapse"
							data-target={ target } aria-expanded="true" aria-controls={ id }>
						<RichText
							value={ attributes.title } // Any existing content, either from the database or an attribute default
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={ ( title ) => setAttributes( { title } ) } // Store updated content as a block attribute
							placeholder={ __( 'Panel title...', 'gutenberg-faq' ) } // Display this text before any content has been added by the user
						/>
					</button>
				</div>
			</div>

			<div id={ id } className="collapse" aria-labelledby={ heading }
				 data-parent={ parentId } >
				<div className="card-body">
					<RichText
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Panel content...', 'gutenberg-faq' ) }
						multiline={ true }
					/>
				</div>
			</div>
		</div>
	);
}
