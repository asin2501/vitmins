/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.customerLogin = (function() {
  var config = {
    recoverPasswordForm: '#RecoverPassword',
    hideRecoverPasswordLink: '#HideRecoverPasswordLink',
    registerAccountForm: '#CustomerRegister',
    hideRegisterAccountLink: '#HideRegisterFormLink'
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
  }

    function onShowHideRegisterForm(evt) {
        evt.preventDefault();
        toggleRegisterForm();
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
    $('#RecoverPasswordForm').toggleClass('hide');
    $('#CustomerLoginForm').toggleClass('hide');
  }

  /**
   *  Show/Hide Register form  in Popup
   */
  function toggleRegisterForm() {
    if ($('#CustomerRegisterForm').hasClass('hide')) {
        $('#RecoverPasswordForm').addClass('hide');
        $('#CustomerLoginForm').addClass('hide');
        $('#CustomerRegisterForm').toggleClass('hide');
    } else {
        $('#RecoverPasswordForm').addClass('hide');
        $('#CustomerLoginForm').removeClass('hide');
        $('#CustomerRegisterForm').toggleClass('hide');
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
