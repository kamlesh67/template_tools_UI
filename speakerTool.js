const editorTemplate = `<button id="addProduct" class="button">Add Speaker</button>`;
const searchButton =  `<button id="search-btn" class="button">Search</button>`;
const productItemsTemplate = _.template(`
<% _.forEach(speakers, function(item) { %>
  <div class="product-item card" id="product-item" data-uuid='<%= item.id %>' data-title="<%= item.name %>" data-designation="<%= item.designation %>" data-image="<%= item.profile_img %>" data-company="<%= item.company %>" >
  <div class="product-media"> <img src="<%= item.profile_img %>" style="height:11rem; width: 11rem;" /> </div>
    <h4 style="margin: 8px 0; text-align: left; color: ${theme.primary};"><%= item.name %> </h4>
    <h5 style="margin: 8px 0; text-align: left;color: ${theme.secondary};"><%= item.designation %>,<%= item.company %> </h5>
  </div>
<% }); %>
`);

const modalTemplate = function (data) {
  return `
  <div class="modal" id="product_library_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Speaker List</h3>
          <button class="close" id="modalCloseBtn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input type="text" class="form-control" placeholder="Search by speaker name" id="search-bar" style="width:100%" />
            ${searchButton}
          </div>
          <div class="products-list">
            ${productItemsTemplate(data)}
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
  return `
  <div class="speaker-card card"> 
  <div class="speaker-img">
  <img src="${values?.speakerImage?.url ? values?.speakerImage?.url : 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/988/posts/31255/image/What-is-public-speaking%20(1).jpg'}" style="width: 100%; object-fit: contain; border-top-left-radius: 4px; border-top-right-radius: 4px;" />
  </div>
  <h3 style="margin: 12px 0; color: ${values.speakerTitleColor};">${values.speakerTitle ? values.speakerTitle : 'Speaker Name'}</h3>
  <h4 class="description" style="color: ${values.speakerDesignationCompanyColor};">
  ${values.speakerEmail ? values.speakerEmail: 'Designation'}, ${values.speakerAbout ? values.speakerAbout : 'Company'}</h4>
  </div>
  ${isViewer ? modalTemplate({ speakers: values.data.speakers }) : ''}`;
};

const toolEmailTemplate = function (values, isViewer = false) {
  return `
    <table speakerId="${
      values?.speakerLibrary?.selected?.id ? values?.speakerLibrary?.selected?.id : ''
    }" cellspacing="0" cellpadding="0" style="position:relative;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center;">
      <tbody>
        <tr><td width="100%"><img id="${values?.speakerLibrary?.selected?.id}-speakerImage" src="${
    values?.speakerImage?.url ? values?.speakerImage?.url : 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/988/posts/31255/image/What-is-public-speaking%20(1).jpg'
  }" style="width: 100%; object-fit: contain; border-top-left-radius: 4px; border-top-right-radius: 4px;" /></td></tr>
        <tr><td width="100%"><h3 id="${
          values?.speakerLibrary?.selected?.id
        }-speakerTitle" style="text-align: left;margin: 8px 0 12px 0; padding: 0 16px; color: ${values.speakerTitleColor};">${values.speakerTitle ? values.speakerTitle : 'Speaker Name'}</h3></td></tr>
        <tr><td width="100%"><h4 id="${
          values?.speakerLibrary?.selected?.id
        }-speakerAbout" class="description" style="text-align: left;padding: 0 16px; margin: 0 0 12px 0; color: ${
    values.speakerDesignationCompanyColor
  };">${values.speakerEmail ? values.speakerEmail: 'Designation'}, ${values.speakerAbout ? values.speakerAbout : 'Company'}</h4></td></tr>
      </tbody>
    </table>
  `;
};

const showModal = function () {
  const modal = document.getElementById('product_library_modal');
  modal.classList.add('show');
};

const hideModal = function () {
  const modal = document.getElementById('product_library_modal');
  modal.classList.remove('show');
};

unlayer.registerPropertyEditor({
  name: 'speaker_library',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return editorTemplate;
    },
    mount(node, value, updateValue, data) {
      const addButton = node.querySelector('#addProduct');
      addButton.onclick = function () {
        showModal();
        setTimeout(() => {
          // We are using event bubling to capture clicked item instead of registering click event on all product items.
          const selectButton = document.querySelector('.products-list');
          if (!selectButton) return;
          selectButton.onclick = function (e) {
            if (e.target.id === 'product-item') {
              // If user clicks on product item
              // Find selected item from speakers list
              const selectedProduct = data.speakers.find(
                (item) => item.id === parseInt(e.target.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            } else {
              // If user click on child of product item (e.g. title, price, image or desctiption)
              const parent = e.target.parentElement;
              if (parent && parent.id !== 'product-item') return;
              const selectedProduct = data.speakers.find(
                (item) => item.id === parseInt(parent.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            }
            hideModal();
            // This is a hack to close property editor right bar on selecting an item from speakers list.
            const outerBody = document.querySelector('#u_body');
            outerBody.click();
          };
          /* Register event listeners for search */
          const searchBar = document.querySelector('#search-bar');
          const searchButton = document.querySelector('#search-btn');
          const closeBtn = document.querySelector('#modalCloseBtn');
          searchButton.onclick = function (e) {
            const list = document.querySelector('#product_library_modal .products-list');
            let filteredItem;
            let speakersListHtml;
            if (list && data && data.speakers) {
              if (searchBar.value === '') {
                speakersListHtml = productItemsTemplate({ speakers: data.speakers });
              } else {
                filteredItem = data.speakers.filter((item) =>
                  item.name.toLowerCase().includes(searchBar.value.toLowerCase())
                );
                speakersListHtml = productItemsTemplate({ speakers: filteredItem });
              }
              list.innerHTML = speakersListHtml;
            }
          };
          closeBtn.onclick = hideModal;
        }, 200);
      };
    },
  }),
});

unlayer.registerTool({
  name: 'speaker_tool',
  label: 'Speaker',
  icon: 'fa-microphone',
  supportedDisplayModes: ['web', 'email'],
  options: {
    speakerContent: {
      title: 'Speaker Content',
      position: 1,
      options: {
        speakerLibrary: {
          label: 'Add Speaker from store',
          defaultValue: '',
          widget: 'speaker_library',
        },
        speakerTitleColor: {
          label: 'Speaker Name Color',
          defaultValue: theme?.primary,
          widget: 'color_picker',
        },
        speakerDesignationCompanyColor: {
          label: 'Speaker Designation & Company Color',
          defaultValue: theme?.secondary,
          widget: 'color_picker',
        },
      },
    },
  },
  transformer: (values, source) => {
    const { name, value, data } = source;
    // Transform the values here
    // We will update selected values in property editor here
console.log('newValues TRANSForm', value?.selected?.name)
    const newValues =
      name === 'speakerLibrary'
        ? {
            ...values,
            speakerTitle: value?.selected?.name,
            speakerEmail: value?.selected?.designation,
            speakerAbout: value?.selected?.company,
            speakerImage: {
              url: value?.selected?.profile_img,
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
