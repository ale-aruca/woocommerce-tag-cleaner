<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<table class="wp-list-table widefat fixed striped wtc-preview-table">
    <thead>
        <tr>
            <th scope="col" style="width: 80px;">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Current Tags</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($product_ids as $product_id): 
            $product = wc_get_product($product_id);
            if (!$product) continue;
            
            $all_tags = wp_get_post_terms($product_id, 'product_tag');
        ?>
        <tr>
            <td><?php echo esc_html($product_id); ?></td>
            <td>
                <strong>
                    <a href="<?php echo esc_url(get_edit_post_link($product_id)); ?>" target="_blank">
                        <?php echo esc_html($product->get_name()); ?>
                    </a>
                </strong>
            </td>
            <td>
                <?php if ($all_tags): ?>
                    <?php foreach ($all_tags as $tag): 
                        $is_keep = in_array($tag->term_id, $keep_tags);
                        $is_remove = in_array($tag->term_id, $remove_tags);
                        $class = '';
                        if ($is_keep) $class = 'primary';
                        elseif ($is_remove) $class = 'remove';
                    ?>
                        <span class="wtc-tag-badge <?php echo $class; ?>">
                            <?php echo esc_html($tag->name); ?>
                        </span>
                    <?php endforeach; ?>
                <?php endif; ?>
            </td>
            <td>
                <strong>Remove:</strong>
                <?php foreach ($remove_tag_names as $tag_name): ?>
                    <span class="wtc-status-badge wtc-status-error"><?php echo esc_html($tag_name); ?></span>
                <?php endforeach; ?>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<p style="margin-top: 10px;"><em>Showing up to <?php echo count($product_ids); ?> conflicting products. Blue tags will be kept, red tags will be removed.</em></p>