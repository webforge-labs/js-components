define(['knockout', 'modules/templateEngine', 'jquery', 'bootstrap/modal'], function(ko, templateEngine, $, bs) {

  return function(params) {
    var that = this;

    params = $.extend({}, {
      closeButton: true,
      saveButton: false,
      templateName: 'CMS/'+params.name+'-edit-form.html',
      withBinding: null,
      saveBinding: '$root.list.control.save', // this needs to be absolute (beginning with root, because the modal will be in body - until you binded body in main)
      label: params.headlineSingular+' bearbeiten'
    }, params);

    var i18n = {
      modal: {
        label: params.label,
        save: 'Speichern',
        close: 'Schließen'
      }
    };

    var buttonsHtml = '';

    if (params.closeButton) {
      buttonsHtml += templateEngine.render(
        'webforge/bootache/modal-close-button.html', {
          label: i18n.modal.close
        }
      );
    }

    if (params.saveButton) {
      buttonsHtml += templateEngine.render(
        'webforge/bootache/modal-save-button.html', {
          label: i18n.modal.save,
          'data-bind': 'click: '+params.saveBinding
        }
      );
    }

    var modalHTML = templateEngine.render(
      'webforge/bootache/modal.html', 
      {
        id: params.name+'-edit',
        label: i18n.modal.label,
        size: 'lg',
        body: templateEngine.render(
          params.templateName, 
          {
            i18n: i18n.modal
          }
        ),
        buttons: buttonsHtml,
        withBinding: params.withBinding
      }
    );

    this.$modal = $(modalHTML);
    $('body').append(this.$modal);
    this.$modal.modal({'show': false});

    this.on = function(eventName, callback) {
      if (eventName === 'close') {
        that.$modal.on('hidden.bs.modal', callback);
      }
    };

    this.show = function() {
      that.$modal.modal('show');
    };

    this.hide = this.close = function() {
      that.$modal.modal('hide');
    };
  };
});