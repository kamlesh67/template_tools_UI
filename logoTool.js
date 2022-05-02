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
          <button class="close" id="modalCloseBtn">&times;</button>
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
    <img src="${
      values?.logo_image?.url ? values?.logo_image?.url : 'https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png'}" style="width: 100%; object-fit: contain; border-top-left-radius: 4px; border-top-right-radius: 4px;" />
  </div>
  ${isViewer ? modalTemplate({ logos: values.data.logos }) : ''}`;
}
else{
  return `
  <div>Default</div>
  ${isViewer ? modalTemplate({ logos: values.data.logos }) : ''}
  `;
}
};

const toolEmailTemplate = function (values, isViewer = false) {
  if(values.logoLibrary)
  {  return `<div style="position:relative;display:block; background-color:#fff;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center;width:100%;margin-bottom: 15px;height: auto;padding: 14px;">
      <img src="${values?.logo_image?.url ? values?.logo_image?.url : 'https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png'}" style="width: 100%; object-fit: contain; height: auto;max-height: 80px;" />
    </div>
    `;
}
else{
  return `''`;
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
          const closeBtn = document.querySelector('#modalCloseBtn');
          closeBtn.onclick = hideModal;
        }, 200);
      };
    },
  }),
});

unlayer.registerTool({
  name: 'logo_tool',
  label: 'Logos',
  icon: 'fa-hexagon-image', 
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