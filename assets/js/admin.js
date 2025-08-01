jQuery(document).ready(function($) {
    let isProcessing = false;
    let processStats = {
        total: 0,
        processed: 0,
        updated: 0,
        errors: 0,
        currentBatch: 0
    };
    let currentSettings = {
        keepTags: [],
        removeTags: []
    };
    
    // Initialize Select2
    $('.wtc-tag-select').select2({
        placeholder: 'Select tags...',
        allowClear: true
    });
    
    // Load all tags on page load
    loadAllTags();
    
    // Tag selection change handlers
    $('#keep-tags, #remove-tags').on('change', function() {
        checkForConflicts();
    });
    
    // Refresh stats button
    $('#wtc-refresh-stats').on('click', function(e) {
        e.preventDefault();
        checkForConflicts();
    });
    
    // Start cleaning process
    $('#wtc-start-cleaning').on('click', function(e) {
        e.preventDefault();
        
        const keepTags = $('#keep-tags').val() || [];
        const removeTags = $('#remove-tags').val() || [];
        
        if (keepTags.length === 0 || removeTags.length === 0) {
            alert(wtcAjax.strings.selectTags);
            return;
        }
        
        if (confirm(wtcAjax.strings.confirmClean)) {
            currentSettings.keepTags = keepTags;
            currentSettings.removeTags = removeTags;
            startCleaning();
        }
    });
    
    // Stop cleaning process
    $('#wtc-stop-cleaning').on('click', function(e) {
        e.preventDefault();
        stopCleaning();
    });
    
    function loadAllTags() {
        $.ajax({
            url: wtcAjax.ajaxUrl,
            type: 'POST',
            data: {
                action: 'wtc_get_all_tags',
                nonce: wtcAjax.nonce
            },
            success: function(response) {
                if (response.success) {
                    const tags = response.data;
                    let optionsHtml = '';
                    
                    tags.forEach(function(tag) {
                        optionsHtml += '<option value="' + tag.term_id + '">' + tag.name + ' (' + tag.count + ')</option>';
                    });
                    
                    $('#keep-tags, #remove-tags').html(optionsHtml);
                    $('.wtc-tag-select').trigger('change');
                }
            }
        });
    }
    
    function checkForConflicts() {
        const keepTags = $('#keep-tags').val() || [];
        const removeTags = $('#remove-tags').val() || [];
        
        if (keepTags.length === 0 || removeTags.length === 0) {
            updateStatsDisplay({
                total_products: 0,
                keep_tag_products: 0,
                remove_tag_products: 0,
                conflicting_products: 0
            });
            $('.wtc-preview-section').hide();
            return;
        }
        
        $.ajax({
            url: wtcAjax.ajaxUrl,
            type: 'POST',
            data: {
                action: 'wtc_check_conflicts',
                nonce: wtcAjax.nonce,
                keep_tags: keepTags,
                remove_tags: removeTags
            },
            success: function(response) {
                if (response.success) {
                    updateStatsDisplay(response.data.stats);
                    
                    if (response.data.preview_html) {
                        $('.wtc-preview-content').html(response.data.preview_html);
                        $('.wtc-preview-section').show();
                    } else {
                        $('.wtc-preview-section').hide();
                    }
                }
            }
        });
    }
    
    function updateStatsDisplay(stats) {
        $('#stat-total').text(stats.total_products.toLocaleString());
        $('#stat-keep-tags').text(stats.keep_tag_products.toLocaleString());
        $('#stat-remove-tags').text(stats.remove_tag_products.toLocaleString());
        $('#stat-conflicts').text(stats.conflicting_products.toLocaleString());
        
        if (stats.conflicting_products > 0) {
            $('#stat-conflicts').parent().find('.wtc-stat-number').css('color', '#d63638');
            $('.wtc-no-conflicts').hide();
            $('.wtc-has-conflicts').show();
        } else {
            $('#stat-conflicts').parent().find('.wtc-stat-number').css('color', '#00a32a');
            $('.wtc-no-conflicts').show();
            $('.wtc-has-conflicts').hide();
        }
    }
    
    function startCleaning() {
        if (isProcessing) return;
        
        isProcessing = true;
        processStats = { total: 0, processed: 0, updated: 0, errors: 0, currentBatch: 0 };
        
        // Show progress container
        $('.wtc-progress-container').show();
        $('#wtc-start-cleaning').addClass('wtc-button-processing').prop('disabled', true);
        $('#wtc-stop-cleaning').show();
        
        // Clear log
        $('.wtc-log').html('');
        addLogEntry(wtcAjax.strings.processStarting, 'info');
        
        // Start first batch
        processBatch();
    }
    
    function stopCleaning() {
        isProcessing = false;
        $('#wtc-start-cleaning').removeClass('wtc-button-processing').prop('disabled', false);
        $('#wtc-stop-cleaning').hide();
        addLogEntry(wtcAjax.strings.processStopped, 'error');
        checkForConflicts();
    }
    
    function processBatch() {
        if (!isProcessing) return;
        
        processStats.currentBatch++;
        addLogEntry('Processing batch ' + processStats.currentBatch + '...', 'info');
        
        $.ajax({
            url: wtcAjax.ajaxUrl,
            type: 'POST',
            data: {
                action: 'wtc_process_batch',
                nonce: wtcAjax.nonce,
                keep_tags: currentSettings.keepTags,
                remove_tags: currentSettings.removeTags
            },
            success: function(response) {
                if (!isProcessing) return;
                
                if (response.success) {
                    const data = response.data;
                    
                    // Update stats
                    if (processStats.total === 0) {
                        processStats.total = data.total_found;
                    }
                    
                    processStats.processed += data.batch_processed;
                    processStats.updated += data.batch_updated;
                    processStats.errors += data.batch_errors;
                    
                    // Update progress display
                    updateProgressDisplay();
                    
                    // Log batch results
                    addLogEntry('Batch ' + processStats.currentBatch + ': ' + data.batch_processed + ' processed, ' + data.batch_updated + ' updated, ' + data.batch_errors + ' errors', 
                               data.batch_errors > 0 ? 'error' : 'success');
                    
                    // Continue if there are more products to process
                    if (data.has_more && processStats.processed < processStats.total) {
                        setTimeout(processBatch, 500);
                    } else {
                        finishCleaning();
                    }
                } else {
                    addLogEntry('Error: ' + response.data, 'error');
                    finishCleaning();
                }
            },
            error: function() {
                if (isProcessing) {
                    addLogEntry(wtcAjax.strings.ajaxError, 'error');
                    finishCleaning();
                }
            }
        });
    }
    
    function updateProgressDisplay() {
        const percentage = processStats.total > 0 ? Math.round((processStats.processed / processStats.total) * 100) : 0;
        
        $('.wtc-progress-fill').css('width', percentage + '%');
        $('.wtc-progress-text').text(percentage + '% Complete (' + processStats.processed + '/' + processStats.total + ')');
        
        $('#progress-processed').text(processStats.processed.toLocaleString());
        $('#progress-updated').text(processStats.updated.toLocaleString());
        $('#progress-errors').text(processStats.errors.toLocaleString());
        $('#progress-remaining').text((processStats.total - processStats.processed).toLocaleString());
    }
    
    function finishCleaning() {
        isProcessing = false;
        $('#wtc-start-cleaning').removeClass('wtc-button-processing').prop('disabled', false);
        $('#wtc-stop-cleaning').hide();
        
        addLogEntry(wtcAjax.strings.processComplete, 'success');
        addLogEntry('Final results: ' + processStats.processed + ' processed, ' + processStats.updated + ' updated, ' + processStats.errors + ' errors', 'info');
        
        // Refresh stats after completion
        setTimeout(checkForConflicts, 1000);
    }
    
    function addLogEntry(message, type) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = '<div class="wtc-log-entry wtc-log-' + type + '">[' + timestamp + '] ' + message + '</div>';
        $('.wtc-log').append(entry);
        $('.wtc-log').scrollTop($('.wtc-log')[0].scrollHeight);
    }
});