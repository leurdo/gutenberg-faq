/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

import 'bootstrap/js/dist/collapse';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import GutenbergFaqInnerEdit from './gutenberg-faq-inner/gutenberg-faq-inner-edit';
import GutenbergFaqInnerSave from './gutenberg-faq-inner/gutenberg-faq-inner-save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/gutenberg-faq', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Gutenberg Faq', 'gutenberg-faq' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'gutenberg-faq'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'smiley',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	attributes: {
		blockId: {
			type: 'number'
		}
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );

registerBlockType( 'create-block/gutenberg-faq-inner', {
	apiVersion: 2,
	title: __( 'Gutenberg Faq Panel', 'gutenberg-faq' ),
	description: __(
		'Faq inner module',
		'gutenberg-faq'
	),
	parent: [ 'create-block/gutenberg-faq' ],
	icon: 'smiley',
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},
	attributes: {
		innerBlockId: {
			type: 'number'
		},
		title: {
			type: 'string',
			source: 'html',
			selector: 'button.btn-link',
			default: '',
		},
		content: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: '.card-body',
		},
	},
	edit: GutenbergFaqInnerEdit,
	save: GutenbergFaqInnerSave,
} );
