(function(){
  const editorTemplate = `<button id="addLogo" class="button" >Add Logo</button>`;
const logoItemsTemplate = _.template(`
<% _.forEach(logos, function(item) { %>
  <div class="logo-item" id="logo-item" data-uuid='<%= item.id %>' data-image="<%= item.img %>" >
  <img src="<%= item.img %>" style="max-height: 150px;min-height: 100px;width: 100%;" />
  </div>
<% }); %>
`);

const modalTemplate = function (data) {
  return `
  <div class="modal" id="logo_library_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Logo List</h3>
          <button class="close" id="modalCloseBtnLogo">&times;</button>
        </div>
        <div class="modal-body">
        <div>
        <div class="search-box">
        <p id='search-bar'></p>
        <p id='search-btn'></p>
        </div>   
        </div>
          <div class="logos-list">
            ${logoItemsTemplate(data)}
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
`;
};

const toolTemplate = function (values, isViewer = false) {
  if(values.logoLibrary)
  {
  return `<div class="logo-card" style="position:relative;background-color:#fff;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center;">
    <img src="${values?.logo_image?.url}" style="width: 100%; object-fit: contain; border-top-left-radius: 4px; border-top-right-radius: 4px;" />
  </div>
  ${isViewer ? modalTemplate({ logos: values.data.logos }) : ''}`;
}
else{
  return `
  <div style="position:relative;background-color:#F6F8F8;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center; padding:14px 10px;">
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M7.64698 28.8059L7.5 28.9524V29.16V34C7.5 34.663 7.76339 35.2989 8.23223 35.7678C8.70108 36.2366 9.33696 36.5 10 36.5H30.82H32.0271L31.1736 35.6464L17.7536 22.2264L17.7536 22.2264L17.75 22.2229C17.2827 21.7649 16.6544 21.5083 16 21.5083C15.3456 21.5083 14.7173 21.7649 14.25 22.2229L14.25 22.2229L14.247 22.2259L7.64698 28.8059ZM36.1055 36.3526L36.2521 36.5H36.46H38C38.663 36.5 39.2989 36.2366 39.7678 35.7678C40.2366 35.2989 40.5 34.663 40.5 34V33.16V32.9524L40.353 32.8059L33.753 26.2259L33.753 26.2259L33.75 26.2229C33.2827 25.7649 32.6544 25.5083 32 25.5083C31.3456 25.5083 30.7173 25.7649 30.25 26.2229L30.25 26.2229L30.2464 26.2264L28.4864 27.9864L28.1338 28.3391L28.4855 28.6926L36.1055 36.3526ZM39.6474 27.8745L40.5 28.7226V27.52V14C40.5 13.337 40.2366 12.7011 39.7678 12.2322C39.2989 11.7634 38.663 11.5 38 11.5H10C9.33696 11.5 8.70107 11.7634 8.23223 12.2322C7.76339 12.7011 7.5 13.337 7.5 14V23.52V24.7226L8.35261 23.8745L12.1095 20.1376C13.1559 19.1338 14.5499 18.5733 16 18.5733C17.4499 18.5733 18.8437 19.1336 19.89 20.1371L25.6464 25.8936L26 26.2471L26.3536 25.8936L28.11 24.1371C29.1563 23.1336 30.5501 22.5733 32 22.5733C33.4502 22.5733 34.8441 23.1338 35.8905 24.1376L39.6474 27.8745ZM10 8.5H38C39.4587 8.5 40.8576 9.07946 41.8891 10.1109C42.9205 11.1424 43.5 12.5413 43.5 14V34C43.5 35.4587 42.9205 36.8576 41.8891 37.8891C40.8576 38.9205 39.4587 39.5 38 39.5H10C8.54131 39.5 7.14236 38.9205 6.11091 37.8891C5.07946 36.8576 4.5 35.4587 4.5 34V14C4.5 12.5413 5.07946 11.1424 6.11091 10.1109C7.14236 9.07946 8.54131 8.5 10 8.5Z" fill="#C0C0C0" stroke="#C0C0C0"/>
  </svg>
  <p style="font-size:13px;color:#808080;">Click here to select a logo from the list.</p>
  </div>
  ${isViewer ? modalTemplate({ logos: values.data.logos }) : ''}
  `;
}
};

const toolEmailTemplate = function (values, isViewer = false) {
  if(values.logoLibrary)
  {  return `<div logoId="${values?.logoLibrary?.selected?.id}" 
      style="position:relative;display:block; background-color:#fff;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center;width:100%;margin-bottom: 15px;height: auto;padding: 14px 10px;">
      <img id="${values?.logoLibrary?.selected?.id}-logo" src="${values?.logo_image?.url}" style="width: 100%; object-fit: contain; height: auto;max-height: 80px;" />
    </div>
    `;
}
else{
  return ``;
}
};

const showModal = function () {
  const modal = document.getElementById('logo_library_modal');
  modal.classList.add('show');
};

const hideModal = function () {
  const modal = document.getElementById('logo_library_modal');
  modal.classList.remove('show');
};

unlayer.registerPropertyEditor({
  name: 'logo_library',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return editorTemplate;
    },
    mount(node, value, updateValue, data) {
      const addButton = node.querySelector('#addLogo');
      addButton.onclick = function () {
        showModal();
        setTimeout(() => {
          // We are using event bubling to capture clicked item instead of registering click event on all product items.
          const selectButton = document.querySelector('.logos-list');
          if (!selectButton) return;
          selectButton.onclick = function (e) {
            if (e.target.id === 'logo-item') {
              // If user clicks on logo item
              // Find selected item from logo list
              const selectedProduct = data.logos.find(
                (item) => item.id === parseInt(e.target.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            } else {
              // If user click on child of product item (e.g. title, price, image or desctiption)
              const parent = e.target.parentElement;
              if (parent && parent.id !== 'logo-item') return;
              const selectedProduct = data.logos.find(
                (item) => item.id === parseInt(parent.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            }
            hideModal();
            // This is a hack to close property editor right bar on selecting an item from logos list.
            const outerBody = document.querySelector('#u_body');
            outerBody.click();
          };
          /* Register event listeners for search */
          const closeBtn = document.querySelector('#modalCloseBtnLogo');
          closeBtn.onclick = hideModal;
        }, 200);
      };
    },
  }),
});

unlayer.registerTool({
  name: 'logo_tool',
  label: 'Logos',
  icon: 'fa-image', 
  supportedDisplayModes: ['web', 'email'],
  options: {
    logoContent: {
      title: 'Logo Content',
      position: 1,
      options: {
        logoLibrary: {
          label: 'Add Logo from store',
          defaultValue: '',
          widget: 'logo_library',
        },
      },
    },
  },
  transformer: (values, source) => {
    const { name, value, data } = source;
    // Transform the values here
    // We will update selected values in property editor here
    const newValues =
      name === 'logoLibrary'
        ? {
            ...values,
            id: value?.selected?.id,
            logo_image: {
              url: value?.selected?.img,
            },
          }
        : {
            ...values,
          };

    // Return updated values
    return newValues;
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return toolTemplate(values, true);
      },
    }),
    exporters: {
      web(values) {
        return toolTemplate(values);
      },
      email(values) {
        return toolEmailTemplate(values);
      },
    },
    head: {
      css(values) {},
      js(values) {},
    },
  },
});
})();
