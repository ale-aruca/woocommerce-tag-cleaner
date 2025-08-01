=== WooCommerce Tag Cleaner ===
Contributors: ale-aruca
Tags: woocommerce, tags, cleanup, batch, products
Requires at least: 5.0
Tested up to: 6.6
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Clean conflicting product tags with flexible selection and real-time progress tracking.

== Description ==

WooCommerce Tag Cleaner helps you clean up conflicting product tags by allowing you to select which tags to keep and which to remove from products. Perfect for cleaning up messy tag structures in large WooCommerce stores.

= Key Features =

* **Flexible Tag Selection**: Choose any combination of tags to keep and remove
* **Real-time Conflict Detection**: See live statistics of conflicting products
* **Safe Preview**: Preview which products will be affected before making changes
* **Batch Processing**: Handles large inventories without timeouts
* **Progress Tracking**: Real-time progress updates with detailed logging
* **Error Handling**: Continues processing even if individual products fail

= How It Works =

1. Select tags you want to **keep** on products
2. Select tags you want to **remove** from products
3. The plugin finds products that have tags from both groups
4. It removes only the "remove" tags while preserving "keep" tags

= Use Cases =

* Cleaning up duplicate or conflicting tags
* Removing deprecated tags from products
* Standardizing tag structures
* Bulk tag management for large inventories

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/woocommerce-tag-cleaner/`
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Navigate to Tools → Tag Cleaner to start using the plugin

== Frequently Asked Questions ==

= Does this plugin modify my products? =

Yes, it removes selected tags from products. Always create a backup before running in production.

= Can I stop the process once it starts? =

Yes, you can stop the cleaning process at any time using the "Stop Process" button.

= What happens if there's an error? =

The plugin logs all errors and continues processing other products. Failed updates don't stop the entire process.

= How many products can it handle? =

The plugin uses batch processing to handle stores with thousands of products without timeout issues.

== Screenshots ==

1. Main admin interface with tag selection
2. Statistics dashboard showing conflicts
3. Real-time progress tracking
4. Preview table of affected products

== Changelog ==

= 1.0.0 =
* Initial release
* Flexible tag selection interface
* Real-time conflict detection
* Batch processing with progress tracking
* Safe preview before processing