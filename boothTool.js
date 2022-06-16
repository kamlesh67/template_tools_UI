(function(){
const editorTemplate = `<button id="booth" class="button">Add Booth</button>`;
const searchButton = `<button id="search-btn-booth" class="button">Search</button>`;
const boothItemsTemplate = _.template(`<% _.forEach(booths, function(item) { %>
  <div class="booth-item" id="booth-item" data-uuid='<%= item.id %>' data-title="<%= item.name %>"  data-image="<%= item.profile_img %>" style="background-color: ${theme.primaryColor};">
  <div class="booth-media"> <img src="<%= item.profile_img %>" alt="image" style="max-height: 90px;width: 100%; object-fit: contain;border-radius:8px" /> </div>
  <h4 style="margin: 8px 0; text-align: center; color: ${theme.primaryFontColor};overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;"><%= item.name %> </h4>
  </div>
<% }); %>`);

const boothNoItemsTemplate = `
  <div>
    <h4>No Booths Found</h4>
    <p>Try searching with a different keyword</p>
  </div>
`;
  
const modalTemplate = function (data) {
  return `
  <div class="modal" id="booth_library_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Booth List</h3>
          <button class="close" id="modalCloseBtnBooth">&times;</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input type="text" class="form-control" placeholder="Search by booth name" id="search-bar-booth" style="width: 100%" />
            ${searchButton}
          </div>
          <div class="booths-list">
            ${boothItemsTemplate(data)}
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
  if(values.boothLibrary)
  {
  return `<div class="booth-card card" style="position:relative;background-color:${values.boothBGColor}">
    <div class="booth-img"> <img src="${values?.boothImage?.url}" alt="image" style="width: 100%; object-fit: contain; border-radius:8px" />
    </div>
    <div class="booth-card-body" style="text-align: center;">
    <h3 style="margin:10px 10px 0; font-size:13px; color: ${values.boothNameColor};overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;">${values?.boothName}</h3>
    </div>
  </div>
  ${isViewer ? modalTemplate({ booths: values.data.booths }) : ''}`;
  }
  else
  {
    return `<div style="position:relative;background-color:#F6F8F8;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center; padding:18px 10px; width:100%">
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 14H8C5.79086 14 4 15.7909 4 18V38C4 40.2091 5.79086 42 8 42H40C42.2091 42 44 40.2091 44 38V18C44 15.7909 42.2091 14 40 14Z" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M32 42V10C32 8.93913 31.5786 7.92172 30.8284 7.17157C30.0783 6.42143 29.0609 6 28 6H20C18.9391 6 17.9217 6.42143 17.1716 7.17157C16.4214 7.92172 16 8.93913 16 10V42" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <p style="font-size:13px;color:#808080;">Click here to select a booth from the list</p>
  </div>
    ${isViewer ? modalTemplate({ booths: values.data.booths }) : ''}`;
  }
};

const toolEmailTemplate = function (values, isViewer = false) {
  if(values.boothLibrary)
  {
  return `
  <div boothId="${values?.boothLibrary?.selected?.id}" style="position:relative;background-color:${values.boothBGColor};margin-bottom: 15px;padding:18px 10px;border-radius: 8px;">
    <div style="border-radius: .8rem; border: 1px solid #f1f1f1;height: 85px;width: 85px;margin: auto; display: flex;background-color: #fff;"> <img id="${values?.boothLibrary?.selected?.id}-boothImg" src="${values?.boothImage?.url}" alt="image" style="width: 100%; object-fit: contain;border-radius:8px" />
    </div>
    <div style="text-align: center; width: 135px; margin: 0 auto;">
    <h3 id="${values?.boothLibrary?.selected?.id}-boothName" style="margin:10px 10px 0; font-size:13px; color: ${values.boothNameColor};overflow: hidden;  display: block;  text-overflow: ellipsis;  white-space: nowrap;">${values?.boothName}</h3>
    </div>
  </div>`;
  }
  else
  {
    return ``;
  }
};

const showModal = function () {
  const modal = document.getElementById('booth_library_modal');
  modal.classList.add('show');
};

const hideModal = function () {
  const modal = document.getElementById('booth_library_modal');
  modal.classList.remove('show');
};

unlayer.registerPropertyEditor({
  name: 'booth_background_color',
  Widget: unlayer.createWidget({
      render(value, updateValue, data) {
      return `<input value=${value} disabled/> <span style="font-size: 12px;color:#8f9699;font-weight:600;float:right">Booth Background Color</span>`
    },
  })
});

unlayer.registerPropertyEditor({
  name: 'booth_name_color',
  Widget: unlayer.createWidget({
      render(value, updateValue, data) {
      return `<input value=${value} disabled/> <span style="font-size: 12px;color:#8f9699;font-weight:600;float:right">Booth Name Color</span>`
    },
  })
});

unlayer.registerPropertyEditor({
  name: 'booth_library',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return editorTemplate;
    },
    mount(node, value, updateValue, data) {
      const addButton = node.querySelector('#booth');
      addButton.onclick = function () {
        showModal();
        setTimeout(() => {
          // We are using event bubling to capture clicked item instead of registering click event on all product items.
          const selectButton = document.querySelector('.booths-list');
          if (!selectButton) return;
          selectButton.onclick = function (e) {
            if (e.target.id === 'booth-item') {
              // If user clicks on product item
              // Find selected item from booths list
              const selectedProduct = data.booths.find(
                (item) => item.id === parseInt(e.target.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            } else {
              // If user click on child of product item (e.g. title, price, image or desctiption)
              const parent = e?.target?.parentElement?.id === 'booth-item' ? e?.target?.parentElement : e?.target?.parentElement?.parentElement;
              if (parent && parent.id !== 'booth-item') return;
              const selectedProduct = data.booths.find(
                (item) => item.id === parseInt(parent.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            }
            hideModal();
            // This is a hack to close property editor right bar on selecting an item from booths list.
            const outerBody = document.querySelector('#u_body');
            outerBody.click();
          };
          /* Register event listeners for search */
          const searchBar = document.querySelector('#search-bar-booth');
          searchBar.onkeydown = function (e) {
            if(e?.which === 13 || !e.target.value || (e.target.value.length === 1 && e?.which === 8)){
              const list = document.querySelector('#booth_library_modal .booths-list');
              let filteredItem;
              let boothListHtml;
              if (list && data && data.booths) {
                if (searchBar.value === '' || (e.target.value.length === 1 && e?.which === 8)) {
                  boothListHtml = boothItemsTemplate({ booths: data.booths });
                } else {
                  filteredItem = data.booths.filter((item) =>
                    item.name.toLowerCase().includes(searchBar.value.toLowerCase())
                  );
                  boothListHtml = boothItemsTemplate({ booths: filteredItem });
                }
                list.innerHTML = searchBar.value && !boothListHtml.trim() ? boothNoItemsTemplate : boothListHtml;
              }
            }
          };

          const searchButton = document.querySelector('#search-btn-booth');
          const closeBtn = document.querySelector('#modalCloseBtnBooth');
          searchButton.onclick = function (e) {
            const list = document.querySelector('#booth_library_modal .booths-list');
            let filteredItem;
            let boothListHtml;
            if (list && data && data.booths) {
              if (searchBar.value === '') {
                boothListHtml = boothItemsTemplate({ booths: data.booths });
              } else {
                filteredItem = data.booths.filter((item) =>
                  item.name.toLowerCase().includes(searchBar.value.toLowerCase())
                );
                boothListHtml = boothItemsTemplate({ booths: filteredItem });
              }
               list.innerHTML = searchBar.value && !boothListHtml.trim() ? boothNoItemsTemplate : boothListHtml;
            }
          };
          closeBtn.onclick = function (e) {
              searchBar.value = '';
              searchButton.click();
              hideModal();
          }
        }, 200);
      };
    },
  }),
});

  unlayer.registerTool({
    name: 'booth_tool',
    label: 'Booth',
    icon: 'fa-suitcase', 
    supportedDisplayModes: ['web', 'email'],
    options: {
//       responsive: {// remove responsive design 
//         enabled: false,
//         title: "Responsive Design",
//       },
      boothContent: {
        title: 'Booth Content',
        position: 1,
        options: {
          boothLibrary: {
            label: 'Add Booth from store',
            defaultValue: '',
            widget: 'booth_library',
          },
        },
      },
      colorContent: {
        title: 'Color options for the booth have been disabled. Make changes to the booth colors via the Theme option in Brand Your Event.',
        options: {
         boothBGColor: {
          defaultValue: theme?.primaryColor,
          widget: 'booth_background_color',
        },
        boothNameColor: {
          defaultValue: theme?.primaryFontColor,
          widget: 'booth_name_color',
        },
      },
    },    
  },

  transformer: (values, source) => {
    const { name, value, data } = source;
    // Transform the values here
    // We will update selected values in property editor here
    const newValues =
      name === 'boothLibrary'
        ? {
            ...values,
            boothName: value?.selected?.name,
            boothImage: {
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
        return `<div class="booths-list"> ${toolTemplate(values, true)} </div>`
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
