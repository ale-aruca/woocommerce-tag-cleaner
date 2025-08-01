<div class="wrap wtc-container">
    <h1>WooCommerce Tag Cleaner</h1>
    <p>Remove conflicting tags from products by selecting which tags to keep and which to remove.</p>
    
    <!-- Tag Selection Panel -->
    <div class="wtc-settings-panel">
        <h2>Tag Configuration</h2>
        <p>Select the tags you want to manage. Products that have tags from both groups will be processed.</p>
        
        <div class="wtc-tag-selector">
            <div class="wtc-tag-group">
                <h4>Tags to Keep</h4>
                <p class="description">Products will retain these tags</p>
                <select id="keep-tags" class="wtc-tag-select" multiple="multiple">
                    <!-- Options populated via AJAX -->
                </select>
            </div>
            
            <div class="wtc-tag-group">
                <h4>Tags to Remove</h4>
                <p class="description">These tags will be removed from conflicting products</p>
                <select id="remove-tags" class="wtc-tag-select" multiple="multiple">
                    <!-- Options populated via AJAX -->
                </select>
            </div>
        </div>
        
        <div class="wtc-conflict-info">
            <strong>How it works:</strong> The tool will find all products that have at least one tag from the "Keep" group AND at least one tag from the "Remove" group. It will then remove all the "Remove" tags from those products while keeping the "Keep" tags intact.
        </div>
    </div>
    
    <!-- Statistics Dashboard -->
    <div class="wtc-stats-grid">
        <div class="wtc-stat-card">
            <div class="wtc-stat-number" id="stat-total">0</div>
            <div class="wtc-stat-label">Total Products</div>
        </div>
        <div class="wtc-stat-card">
            <div class="wtc-stat-number" id="stat-keep-tags">0</div>
            <div class="wtc-stat-label">With Selected Keep Tags</div>
        </div>
        <div class="wtc-stat-card">
            <div class="wtc-stat-number" id="stat-remove-tags">0</div>
            <div class="wtc-stat-label">With Selected Remove Tags</div>
        </div>
        <div class="wtc-stat-card">
            <div class="wtc-stat-number" id="stat-conflicts" style="color: #00a32a;">0</div>
            <div class="wtc-stat-label">Conflicting Products</div>
        </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="wtc-actions">
        <button id="wtc-refresh-stats" class="button wtc-action-button">
            <span class="dashicons dashicons-update"></span> Check for Conflicts
        </button>
        
        <button id="wtc-start-cleaning" class="button button-primary wtc-action-button wtc-has-conflicts" style="display: none;">
            <span class="dashicons dashicons-admin-tools"></span> Start Cleaning Process
        </button>
        <button id="wtc-stop-cleaning" class="button button-secondary wtc-action-button" style="display: none;">
            <span class="dashicons dashicons-no"></span> Stop Process
        </button>
        
        <div class="notice notice-info wtc-no-conflicts" style="display: inline-block; margin-left: 10px;">
            <p style="margin: 0.5em;">Select tags and click "Check for Conflicts" to begin.</p>
        </div>
    </div>
    
    <!-- Progress Container -->
    <div class="wtc-progress-container">
        <h3><span class="dashicons dashicons-update"></span> Processing Progress</h3>
        
        <div class="wtc-progress-bar">
            <div class="wtc-progress-fill"></div>
        </div>
        <div class="wtc-progress-text">0% Complete (0/0)</div>
        
        <div class="wtc-progress-details">
            <div class="wtc-progress-item">
                <div class="wtc-progress-number" id="progress-processed">0</div>
                <div class="wtc-progress-label">Processed</div>
            </div>
            <div class="wtc-progress-item">
                <div class="wtc-progress-number" id="progress-updated">0</div>
                <div class="wtc-progress-label">Updated</div>
            </div>
            <div class="wtc-progress-item">
                <div class="wtc-progress-number" id="progress-errors">0</div>
                <div class="wtc-progress-label">Errors</div>
            </div>
            <div class="wtc-progress-item">
                <div class="wtc-progress-number" id="progress-remaining">0</div>
                <div class="wtc-progress-label">Remaining</div>
            </div>
        </div>
        
        <div class="wtc-log"></div>
    </div>
    
    <!-- Preview Section -->
    <div class="wtc-preview-section" style="display: none;">
        <h3>Preview - Sample Conflicting Products</h3>
        <div class="wtc-preview-content">
            <!-- Preview table populated via AJAX -->
        </div>
    </div>
    
    <!-- Warning -->
    <div class="wtc-warning">
        <p><strong>⚠️ Important:</strong> This tool modifies product data. Always create a backup before running in production. The process will remove the selected "remove" tags from products that have both selected "keep" and "remove" tags.</p>
    </div>
</div>