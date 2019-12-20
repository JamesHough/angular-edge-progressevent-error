'use strict';

function ajaxSuccess() {
  console.log(this.responseText);
}

function ajaxProgress() {
  console.log('progress event');
}

function ajaxError(err) {
  console.error('AJAX error occurred', err);
}

/*\
|*|
|*|  :: AJAX Form Submit Framework ::
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/Using_XMLHttpRequest
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  https://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntax:
|*|
|*|   AJAXSubmit(HTMLFormElement);
\*/
function AJAXSubmit(oFormElement) {
  if (!oFormElement.action) {
    return;
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', ajaxSuccess);
  oReq.addEventListener('progress', ajaxProgress);
  oReq.addEventListener('error', ajaxError);

  if (oFormElement.method.toLowerCase() === 'post') {
    oReq.open('post', oFormElement.action);
    oReq.send(new FormData(oFormElement));
  } else {
    var oField,
      sFieldType,
      nFile,
      sSearch = '';
    for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
      oField = oFormElement.elements[nItem];
      if (!oField.hasAttribute('name')) {
        continue;
      }
      sFieldType =
        oField.nodeName.toUpperCase() === 'INPUT'
          ? oField.getAttribute('type').toUpperCase()
          : 'TEXT';
      if (sFieldType === 'FILE') {
        for (
          nFile = 0;
          nFile < oField.files.length;
          sSearch +=
            '&' + escape(oField.name) + '=' + escape(oField.files[nFile++].name)
        );
      } else if (
        (sFieldType !== 'RADIO' && sFieldType !== 'CHECKBOX') ||
        oField.checked
      ) {
        sSearch += '&' + escape(oField.name) + '=' + escape(oField.value);
      }
    }
    oReq.open(
      'get',
      oFormElement.action.replace(/(?:\?.*)?$/, sSearch.replace(/^&/, '?')),
      true
    );
    oReq.send(null);
  }
}
