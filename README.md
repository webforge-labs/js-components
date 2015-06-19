js-components
=============


```
define('Webforge/Bootache/Modal', function(Modal) {

  var substModal = new Modal({
    label: 'Ersatz hinzufügen',
    name: 'substitution',
    templateName: 'substitution-form.html',
    withBinding: '$root.activeModalModel',
    closeButton: true,
    saveButton: false
  });

  substModal.show();
  
});
```
