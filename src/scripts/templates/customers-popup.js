/**
 * Popup login form Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Popup Login Form. *
 *
 */

theme.customerLogin = (function() {
    var config = {
        recoverPasswordForm: '#RecoverPassword-popup',
        hideRecoverPasswordLink: '#HideRecoverPasswordLink-popup',
        registerAccountForm: '#CustomerRegister-popup',
        hideRegisterAccountLink: '#HideRegisterFormLink-popup'
    };

    if (!$(config.recoverPasswordForm).length) {
        return;
    }

    checkUrlHash();
    resetPasswordSuccess();

    $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
    $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

    $(config.registerAccountForm).on('click', onShowHideRegisterForm);
    $(config.hideRegisterAccountLink).on('click', onShowHideRegisterForm);

    function onShowHidePasswordForm(evt) {
        evt.preventDefault();
        toggleRecoverPasswordForm();
        console.log(111);
    }

    function onShowHideRegisterForm(evt) {
        evt.preventDefault();
        toggleRegisterForm();
        console.log(222);
    }

    function checkUrlHash() {
        var hash = window.location.hash;

        // Allow deep linking to recover password form
        if (hash === '#recover') {
            toggleRecoverPasswordForm();
        } else if (hash === '#register') {
            toggleRegisterForm();
        }
    }

    /**
     *  Show/Hide recover password form
     */
    function toggleRecoverPasswordForm() {
        $('#RecoverPasswordForm-popup').toggleClass('hide');
        $('#CustomerLoginForm-popup').toggleClass('hide');
    }

    /**
     *  Show/Hide Register form  in Popup
     */
    function toggleRegisterForm() {
        if ($('#CustomerRegisterForm-popup').hasClass('hide')) {
            $('#RecoverPasswordForm-popup').addClass('hide');
            $('#CustomerLoginForm-popup').addClass('hide');
            $('#CustomerRegisterForm-popup').toggleClass('hide');
        } else {
            $('#RecoverPasswordForm-popup').addClass('hide');
            $('#CustomerLoginForm-popup').removeClass('hide');
            $('#CustomerRegisterForm-popup').toggleClass('hide');
        }


    }

    /**
     *  Show reset password success message
     */
    function resetPasswordSuccess() {
        var $formState = $('.reset-password-success');

        // check if reset password form was successfully submited.
        if (!$formState.length) {
            return;
        }

        // show success message
        $('#ResetSuccess').removeClass('hide');
    }
})();
