(function(){
const editorTemplate = `<button id="addSpeaker" class="button">Add Speaker</button>`;
const searchButton = `<button id="search-btn" class="button">Search</button>`;
const productItemsTemplate = _.template(`
  <% _.forEach(speakers, function(item) { %>
    <div class="speakers-item card" id="speakers-item" data-uuid='<%= item.id %>' data-title="<%= item.name %>" data-designation="<%= item.designation %>" data-image="<%= item.profile_img %>" data-company="<%= item.company %>" >
    <div class="speakers-media"> <img src="<%= item.profile_img %>" alt="image" style="height:11rem; width: 11rem;object-fit:cover" /> </div>
      <h4 style="margin:5px 10px 0; text-align: left; color: ${theme.primary};overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;"><%= item?.name %> </h4>
      <h5 style="margin:5px 10px 0; text-align: left;color: ${theme.secondary};overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;"><%= item?.designation %> <%= item?.designation && item?.company ? ',' : '' %> <%= item?.company %> </h5>
    </div>
  <% }); %>
`);

const modalTemplate = function (data) {
  return `
  <div class="modal" id="speaker_library_modal">
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
          <div class="speakers-list">
            ${productItemsTemplate(data)}
          </div>
        </div> 
      </div>
    </div>
  </div>
`;
};

const toolTemplate = function (values, isViewer = false) {
  if (values.speakerLibrary) {
    return `
    <div class="speaker-card card"> 
    <div class="speaker-img">
    <img src="${values?.speakerImage?.url}" alt="image" style="height:11rem; width: 11rem; object-fit:cover" />
    </div>
    <h3 style="margin:5px 10px 0; font-size:15px; color: ${
      values.speakerTitleColor
    };overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;">${
      values?.speakerTitle ? values?.speakerTitle : ''
    }</h3>
    <h4 style="margin:5px 10px 0;font-size:13px; color: ${
      values.speakerDesignationCompanyColor
    }; overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;">
    ${values.speakerEmail? values.speakerEmail : ''} ${values.speakerEmail && values.speakerAbout ? ',' : ''} ${values.speakerAbout? values.speakerAbout : ''}</h4>
    </div>
    ${isViewer ? modalTemplate({ speakers: values.data.speakers }) : ''}`;
  } else {
    return `
  <div style="position:relative;background-color:#F6F8F8;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center; padding:18px 10px;">
  <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
  <path d="M16.75 46H32.75" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24.75 38V46" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24.75 2C23.1587 2 21.6326 2.63214 20.5074 3.75736C19.3821 4.88258 18.75 6.4087 18.75 8V24C18.75 25.5913 19.3821 27.1174 20.5074 28.2426C21.6326 29.3679 23.1587 30 24.75 30C26.3413 30 27.8674 29.3679 28.9926 28.2426C30.1179 27.1174 30.75 25.5913 30.75 24V8C30.75 6.4087 30.1179 4.88258 28.9926 3.75736C27.8674 2.63214 26.3413 2 24.75 2V2Z" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M38.75 20V24C38.75 27.713 37.275 31.274 34.6495 33.8995C32.024 36.525 28.463 38 24.75 38C21.037 38 17.476 36.525 14.8505 33.8995C12.225 31.274 10.75 27.713 10.75 24V20" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <p style="font-size:13px;color:#808080;">Click here to select a speaker from the list</p>
  </div>
  ${isViewer ? modalTemplate({ speakers: values.data.speakers }) : ''}`;
  }
};

const toolEmailTemplate = function (values, isViewer = false) {
  if (values.speakerLibrary) {
    return `
    <style type="text/css">
    .speaker-img:before {
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 11;
      border: 1.2rem solid #ED7767;
      top: 0;
      right: 0;
      border-radius: 20rem 0 20rem 20rem;
    }
    </style>
    <div  speakerId="${
      values?.speakerLibrary?.selected?.id
    }" style="max-width: 145px; position:relative; margin-bottom: 15px;height: 210px;padding-top: 100px;overflow: hidden;border-radius: 8px;"> 
    <div class="speaker-img" style=" position: absolute;right: -1.8rem;top: -1.8rem;z-index: 1; overflow: hidden;border-radius: 20rem 0 20rem 20rem;">
    <img id="${values?.speakerLibrary?.selected?.id}-speakerImg" src="${
      values?.speakerImage?.url
    }" alt="image" style="height:11rem; width: 11rem; object-fit:cover" />
    </div>
    <h3 id="${
      values?.speakerLibrary?.selected?.id
    }-speakerName" style="margin:5px 10px 0; font-size:15px; color: ${
      values.speakerTitleColor
    };overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;">${
      values?.speakerTitle ? values?.speakerTitle : ''
    }</h3>
    <h4 id="${
      values?.speakerLibrary?.selected?.id
    }-speakerDesAndCom" style="margin:5px 10px 0;font-size:13px; color: ${
      values.speakerDesignationCompanyColor
    }; overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;">
    ${values?.speakerEmail ? values?.speakerEmail : ''} ${values.speakerEmail && values.speakerAbout ? ',' : ''} ${values?.speakerAbout ? values?.speakerAbout : ''}</h4>
    </div>
    ${isViewer ? modalTemplate({ speakers: values.data.speakers }) : ''}`;
  } else {
    return ``;
  }
};

const showModal = function () {
  const modal = document.getElementById('speaker_library_modal');
  modal.classList.add('show');
};

const hideModal = function () {
  const modal = document.getElementById('speaker_library_modal');
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
      const addButton = node.querySelector('#addSpeaker');
      addButton.onclick = function () {
        showModal();
        setTimeout(() => {
          // We are using event bubling to capture clicked item instead of registering click event on all product items.
          const selectButton = document.querySelector('.speakers-list');
          if (!selectButton) return;
          selectButton.onclick = function (e) {
            if (e.target.id === 'speakers-item') {
              // If user clicks on product item
              // Find selected item from speakers list
              const selectedProduct = data.speakers.find(
                (item) => item.id === parseInt(e.target.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            } else {
              // If user click on child of product item (e.g. title, price, image or desctiption)
              const parent = e.target.parentElement;
              if (parent && parent.id !== 'speakers-item') return;
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
            const list = document.querySelector('#speaker_library_modal .speakers-list');
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
})();
