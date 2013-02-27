/* Input Placeholder */
function supports_input_placeholder() {
    var i = document.createElement('input');
    return 'placeholder' in i;
}

function bindPlaceholderFunctionality() {
    $('input[placeholder][type="password"]').each(function () {
        var input = $(this);
        if ($(input).attr('type') == 'password') {
            $(input).hide();
            $('<input type="text" placeholder="' + input.attr('placeholder') + '" parent-id="' + input.attr('id') + '">').insertAfter(input);
            var newInput = $('input[parent-id="' + input.attr('id') + '"]');

            $(newInput).val(input.attr('placeholder')).addClass($(input).attr('class'));

            $(newInput).live('focus', function () {
                $(this).remove();
                $(input).show().focus();
                if (input.val() == input.attr('placeholder')) {
                    input.val('').removeClass('m-placeholder');
                }
            });
        }
        $(input).focus(function () {
            if (input.val() == input.attr('placeholder')) {
                input.val('').removeClass('m-placeholder');
            }
        });

        $(input).blur(function () {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                $(input).hide();
                $('<input type="text" placeholder="' + input.attr('placeholder') + '" parent-id="' + input.attr('id') + '">').insertAfter(input);
                var newInput = $('input[parent-id="' + input.attr('id') + '"]');
                newInput.val(input.attr('placeholder')).addClass('m-placeholder').addClass($(input).attr('class'));;;
            }
        });
    });

    $('input[placeholder][type!="password"], textarea').each(function () {
        var input = $(this);
        if ($(input).val() == '') {
            $(input).val(input.attr('placeholder')).addClass('m-placeholder');
        }

        $(input).focus(function () {
            if (input.val() == input.attr('placeholder')) {
                input.val('').removeClass('m-placeholder');
            }
        });

        $(input).blur(function () {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder')).addClass('m-placeholder');
            }
        });
    })
}

$(function () {
    if (!supports_input_placeholder()) {
        bindPlaceholderFunctionality();
        $('body').ajaxComplete(function () {
            bindPlaceholderFunctionality();
        });

        $('form').live('submit', function() {
            $('input[parent-id]').remove();
            $.each($('input[placeholder], textarea', $(this)), function(index, input) {
                if ($(input).val() == $(input).attr('placeholder')) {
                    $(input).val('');
                }
            });
        });
    }
});