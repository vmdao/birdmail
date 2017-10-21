'use strict';

(function ($) {
    'use strict';
    // start

    var menuCategoryItemContainer = $('.nav-mask');
    menuCategoryItemContainer.children('.nav-link').hover(mouseEnter, mouseLeave);

    function mouseEnter(e) {
        $(this).find('.nav-item-container').show();
        menuCategoryItemContainer.width(1280);
    }

    function mouseLeave(e) {
        menuCategoryItemContainer.width('');
        $(this).find('.nav-item-container').hide();
    }

    $('.table').DataTable();
    // $('body').scrollspy({ target: '.partial-header' });
    $('.dropdown-toggle').dropdown();
})(jQuery);