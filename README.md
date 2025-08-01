# WooCommerce Tag Cleaner

Clean conflicting product tags with flexible tag selection and real-time progress tracking.

## Features

- **Flexible Tag Selection**: Choose any combination of tags to keep and remove
- **Real-time Conflict Detection**: Live statistics showing conflicting products
- **Batch Processing**: Handles large inventories with progress tracking
- **Safe Operation**: Preview conflicts before making changes
- **Live Progress**: Real-time updates with detailed logging

## Installation

1. Download the plugin files
2. Upload to `/wp-content/plugins/woocommerce-tag-cleaner/`
3. Activate through the 'Plugins' menu in WordPress
4. Access via Tools → Tag Cleaner

## Requirements

- WordPress 5.0+
- WooCommerce 5.0+
- PHP 7.4+

## Usage

1. Navigate to **Tools → Tag Cleaner**
2. Select tags to **Keep** (these remain on products)
3. Select tags to **Remove** (these will be deleted from conflicting products)
4. Click **Check for Conflicts** to see statistics
5. Review the preview of affected products
6. Click **Start Cleaning Process** to begin

## How It Works

The plugin identifies products that have tags from both the "Keep" and "Remove" groups. It then removes only the "Remove" tags while preserving all "Keep" tags and any other unrelated tags.

## Safety Features

- **Backup Warning**: Always reminds to backup before processing
- **Preview Mode**: Shows exactly which products will be affected
- **Batch Processing**: Processes products in small batches to prevent timeouts
- **Error Handling**: Logs any errors and continues processing
- **Stop Function**: Can halt the process at any time

## Technical Details

- Processes 25 products per batch by default
- Updates term counts automatically
- Clears WooCommerce caches after changes
- Uses WordPress nonces for security
- Follows WordPress coding standards

## License

GPL v2 or later