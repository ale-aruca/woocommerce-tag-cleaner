woocommerce-tag-cleaner/
├── woocommerce-tag-cleaner.php      # Main plugin file
├── includes/
│   └── class-woocommerce-tag-cleaner.php   # Core plugin class
├── assets/
│   ├── css/
│   │   └── admin.css                # Admin interface styles
│   └── js/
│       └── admin.js                 # Admin interface JavaScript
├── templates/
│   ├── admin-page.php              # Main admin page template
│   └── preview-table.php           # Preview table template
├── README.md                       # GitHub documentation
└── readme.txt                     # WordPress plugin documentation

## Installation Guide

1. **Download**: Download all files maintaining the folder structure
2. **Upload**: Upload the entire `woocommerce-tag-cleaner` folder to `/wp-content/plugins/`
3. **Activate**: Go to WordPress Admin → Plugins → Activate "WooCommerce Tag Cleaner"
4. **Access**: Navigate to Tools → Tag Cleaner

## File Descriptions

- **Main Plugin File**: Contains plugin headers and initialization
- **Core Class**: Handles all plugin functionality and AJAX requests  
- **Admin CSS**: Styles for the admin interface and progress tracking
- **Admin JS**: JavaScript for tag selection, AJAX calls, and progress updates
- **Templates**: PHP templates for rendering the admin interface