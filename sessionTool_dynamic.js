const editorTemplate = `<button id="session" class="button">Add Session</button>`;
const searchButton = `<button id="search-btn" class="button">Search</button>`;
const defaultSpeaker = `
            <div class="speaker">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div class="speaker">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div class="speaker">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div class="speaker">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div
              class="speaker-more"
              style="background-color:${theme.accentColor}; color:${theme.secondaryFontColor};">
              +2
            </div>
         `;

const speakerList = function (speakers) {
  let sps = ``;
  speakers.map((speaker, i) => {
    if (i <= 3) {
      sps += ` <div class="speaker">
                  <img src="${speaker}" alt="pic" />
                </div>`;
    }
  });
  if (speakers.length > 4) {
    sps += `<div
              class="speaker-more"
              style="background-color:${theme.accentColor}; color:${theme.secondaryFontColor};">
              +${speakers.length - 4}
            </div>`;
  }
  return sps;
};

const boothList = function (booths) {
  let bts = ``;
  booths.map((booth, i) => {
    if (i <= 1) {
      bts += ` <div class="booth">
                  <img src="${booth}" alt="pic" />
                </div>`;
    }
  });
  if (booths.length > 2) {
    bts += `<div class="booth-more" style="background-color:${theme.accentColor};color:${theme.secondaryFontColor};"> 
               +${booths.length - 2}
            </div>`;
  }
  return bts;
};

const defaultBooth = `
            <div class="booth"> 
            <img src="https://cdn.v2dev.demohubilo.com/comm_v2/images/profile/exhibitor_default.png" alt="pic" />
            </div>
            <div class="booth"> 
              <img src="https://cdn.v2dev.demohubilo.com/comm_v2/images/profile/exhibitor_default.png" alt="pic" />
            </div>  
            <div class="booth-more" style="background-color:${theme.accentColor};color:${theme.secondaryFontColor};"> 
              +2
            </div>`;

const speakerAndBoothList = function (values, isPreview) {
  if (values?.speakers?.length || values?.booths?.length || !values?.sessionLibrary?.selected?.id) {
    if (isPreview) {
      return ` 
      <div class="session-speakers" id="${values?.sessionLibrary?.selected?.id}-sessionSpeaker">
      ${!values?.sessionLibrary?.selected?.id ? defaultSpeaker : speakerList(values?.speakers)} 
      </div>

      <div class="session-booths" id="${values?.sessionLibrary?.selected?.id}-sessionBooth">
      ${!values?.sessionLibrary?.selected?.id ? defaultBooth : boothList(values?.booths)}
      </div>`;
    } else {
      return ` 
      <div class="session-speakers" id="${values?.sessionLibrary?.selected?.id}-sessionSpeaker">
      ${!values?.sessionLibrary?.selected?.id ? defaultSpeaker : speakerList(values?.speakers)} 
      </div>

      <div class="session-booths" id="${values?.sessionLibrary?.selected?.id}-sessionBooth">
      ${!values?.sessionLibrary?.selected?.id ? defaultBooth : boothList(values?.booths)}
      </div>`;
    }
  } else {
    return ``;
  }
};

const sessionItemsTemplate = _.template(`
<% _.forEach(sessions, function(item) { %>
  <div class="session-item" id="session-item" data-uuid='<%= item.id %>' data-title="<%= item.name %>"  data-date-time="<%= item.dateAndTime %>" >
    <p style="color: ${theme.primaryFontColor};"> <%= item.dateAndTime %> </p>
    <h4 style="margin: 8px 0; text-align: left; color: ${theme.primaryColor};"><%= item.name %></h4>
  </div>
<% }); %>
`);

const modalTemplate = function (data) {
  return `
  <div class="modal" id="session_library_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Session List</h3>
          <button class="close" id="modalCloseBtn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input type="text" class="form-control" placeholder="Search by session name" id="search-bar" style="width: 78%" />
            ${searchButton}
          </div>
          <div class="sessions-list">
            ${sessionItemsTemplate(data)}
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
  return `<div class="session-card" style="position:relative;background-color:${values.sessionCardBGColor}" >
    <div class="session-card-body">
      <p class="session-date" style="color:${values.sessionDateAndTimeColor};">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8.25 0.5C6.76664 0.5 5.3166 0.939867 4.08323 1.76398C2.84986 2.58809 1.88856 3.75943 1.32091 5.12987C0.75325 6.50032 0.604725 8.00832 0.894114 9.46318C1.1835 10.918 1.89781 12.2544 2.9467 13.3033C3.9956 14.3522 5.33197 15.0665 6.78683 15.3559C8.24168 15.6453 9.74968 15.4968 11.1201 14.9291C12.4906 14.3614 13.6619 13.4001 14.486 12.1668C15.3101 10.9334 15.75 9.48336 15.75 8C15.75 7.01509 15.556 6.03982 15.1791 5.12987C14.8022 4.21993 14.2497 3.39314 13.5533 2.6967C12.8569 2.00026 12.0301 1.44781 11.1201 1.0709C10.2102 0.693993 9.23492 0.5 8.25 0.5V0.5ZM8.25 14C7.06332 14 5.90328 13.6481 4.91658 12.9888C3.92989 12.3295 3.16085 11.3925 2.70673 10.2961C2.2526 9.19974 2.13378 7.99334 2.36529 6.82946C2.5968 5.66557 3.16825 4.59647 4.00736 3.75736C4.84648 2.91824 5.91558 2.3468 7.07946 2.11529C8.24335 1.88378 9.44975 2.0026 10.5461 2.45672C11.6425 2.91085 12.5795 3.67988 13.2388 4.66658C13.8981 5.65327 14.25 6.81331 14.25 8C14.25 9.5913 13.6179 11.1174 12.4926 12.2426C11.3674 13.3679 9.8413 14 8.25 14V14ZM8.25 3.5C8.05109 3.5 7.86033 3.57902 7.71967 3.71967C7.57902 3.86032 7.5 4.05109 7.5 4.25V7.9475L6.4725 9.725C6.37305 9.89805 6.34641 10.1035 6.39845 10.2962C6.45049 10.4889 6.57695 10.653 6.75 10.7525C6.92306 10.852 7.12853 10.8786 7.32123 10.8266C7.51392 10.7745 7.67805 10.6481 7.7775 10.475L8.9025 8.525C8.97466 8.38943 9.00346 8.23497 8.985 8.0825L9 8V4.25C9 4.05109 8.92099 3.86032 8.78033 3.71967C8.63968 3.57902 8.44892 3.5 8.25 3.5Z" fill="currentcolor"/>
      </svg> <span style="margin-left:10px"> ${
        values.dateAndTime ? values.dateAndTime : 'session date and time | session timezone'
      } </span>
      </p>
      <h3 class="session-title" style="margin: 10px 0 5px 0; color: ${values.sessionNameColor};">${values.sessionName ? values.sessionName : 'Session Name'}</h3>
      <p class="session-description" style="color:${values.sessionDescriptionColor};">
        ${values.description ? values.description : 'session description'}
      </p>
      <div class="booth-speaker-data">
        ${values.isShowSpeakerAndBooth ? speakerAndBoothList(values) : ''}  
      </div>
    </div>
  </div>
  ${isViewer ? modalTemplate({ sessions: values.data.sessions }) : ''}`;
};

const toolEmailTemplate = function (values, isViewer = false) {
  return `
  <div class="session-card" style="position:relative;background-color:'${values.sessionCardBGColor}'" >
  <div class="session-card-body">
    <p class="session-date" style="color:${values.sessionDateAndTimeColor};">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8.25 0.5C6.76664 0.5 5.3166 0.939867 4.08323 1.76398C2.84986 2.58809 1.88856 3.75943 1.32091 5.12987C0.75325 6.50032 0.604725 8.00832 0.894114 9.46318C1.1835 10.918 1.89781 12.2544 2.9467 13.3033C3.9956 14.3522 5.33197 15.0665 6.78683 15.3559C8.24168 15.6453 9.74968 15.4968 11.1201 14.9291C12.4906 14.3614 13.6619 13.4001 14.486 12.1668C15.3101 10.9334 15.75 9.48336 15.75 8C15.75 7.01509 15.556 6.03982 15.1791 5.12987C14.8022 4.21993 14.2497 3.39314 13.5533 2.6967C12.8569 2.00026 12.0301 1.44781 11.1201 1.0709C10.2102 0.693993 9.23492 0.5 8.25 0.5V0.5ZM8.25 14C7.06332 14 5.90328 13.6481 4.91658 12.9888C3.92989 12.3295 3.16085 11.3925 2.70673 10.2961C2.2526 9.19974 2.13378 7.99334 2.36529 6.82946C2.5968 5.66557 3.16825 4.59647 4.00736 3.75736C4.84648 2.91824 5.91558 2.3468 7.07946 2.11529C8.24335 1.88378 9.44975 2.0026 10.5461 2.45672C11.6425 2.91085 12.5795 3.67988 13.2388 4.66658C13.8981 5.65327 14.25 6.81331 14.25 8C14.25 9.5913 13.6179 11.1174 12.4926 12.2426C11.3674 13.3679 9.8413 14 8.25 14V14ZM8.25 3.5C8.05109 3.5 7.86033 3.57902 7.71967 3.71967C7.57902 3.86032 7.5 4.05109 7.5 4.25V7.9475L6.4725 9.725C6.37305 9.89805 6.34641 10.1035 6.39845 10.2962C6.45049 10.4889 6.57695 10.653 6.75 10.7525C6.92306 10.852 7.12853 10.8786 7.32123 10.8266C7.51392 10.7745 7.67805 10.6481 7.7775 10.475L8.9025 8.525C8.97466 8.38943 9.00346 8.23497 8.985 8.0825L9 8V4.25C9 4.05109 8.92099 3.86032 8.78033 3.71967C8.63968 3.57902 8.44892 3.5 8.25 3.5Z" fill="currentcolor"/>
    </svg> <span style="margin-left:10px"> ${
      values.dateAndTime ? values.dateAndTime : 'session date and time | session timezone'
    } </span>
    </p>
    <h3 class="session-title" style="margin: 10px 0 5px 0; color: ${values.sessionNameColor};">${values.sessionName ? values.sessionName : 'Session Name'}</h3>
    <p class="session-description" style="color:${values.sessionDescriptionColor};">
      ${values.description ? values.description : 'session description'}
    </p>
    <div class="booth-speaker-data">
      ${values.isShowSpeakerAndBooth ? speakerAndBoothList(values) : ''}  
    </div>
  </div>
</div>
  `;
};

const showModal = function () {
  const modal = document.getElementById('session_library_modal');
  modal.classList.add('show');
};

const hideModal = function () {
  const modal = document.getElementById('session_library_modal');
  modal.classList.remove('show');
};

unlayer.registerPropertyEditor({
  name: 'session_library',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return editorTemplate;
    },
    mount(node, value, updateValue, data) {
      const addButton = node.querySelector('#session');
      addButton.onclick = function () {
        showModal();
        setTimeout(() => {
          // We are using event bubling to capture clicked item instead of registering click event on all product items.
          const selectButton = document.querySelector('.sessions-list');
          if (!selectButton) return;
          selectButton.onclick = function (e) {
            if (e.target.id === 'session-item') {
              // If user clicks on product item
              // Find selected item from sessions list
              const selectedProduct = data.sessions.find(
                (item) => item.id === parseInt(e.target.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            } else {
              // If user click on child of product item (e.g. title, price, image or desctiption)
              const parent = e.target.parentElement;
              if (parent && parent.id !== 'session-item') return;
              const selectedProduct = data.sessions.find(
                (item) => item.id === parseInt(parent.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            }
            hideModal();
            // This is a hack to close property editor right bar on selecting an item from sessions list.
            const outerBody = document.querySelector('#u_body');
            outerBody.click();
          };
          /* Register event listeners for search */
          const searchBar = document.querySelector('#search-bar');
          const searchButton = document.querySelector('#search-btn');
          const closeBtn = document.querySelector('#modalCloseBtn');
          searchButton.onclick = function (e) {
            const list = document.querySelector('#session_library_modal .sessions-list');
            let filteredItem;
            let sessionListHtml;
            if (list && data && data.sessions) {
              if (searchBar.value === '') {
                sessionListHtml = sessionItemsTemplate({ sessions: data.sessions });
              } else {
                filteredItem = data.sessions.filter((item) =>
                  item.name.toLowerCase().includes(searchBar.value.toLowerCase())
                );
                sessionListHtml = sessionItemsTemplate({ sessions: filteredItem });
              }
              list.innerHTML = sessionListHtml;
            }
          };
          closeBtn.onclick = hideModal;
        }, 200);
      };
    },
  }),
});

unlayer.registerTool({
  name: 'session_tool',
  label: 'Session',
  icon: 'fa-light fa-calendar', 
  supportedDisplayModes: ['web', 'email'],
  options: {
    boothContent: {
      title: 'Session Content',
      position: 1,
      options: {
        sessionLibrary: {
          label: 'Add Session from store',
          defaultValue: '',
          widget: 'session_library',
        },
        sessionCardBGColor: {
          label: 'Session Card BG color',
          defaultValue: theme?.primaryColor,
          widget: 'color_picker',
        },
        sessionNameColor: {
          label: 'Session Name Color',
          defaultValue: theme?.primaryFontColor,
          widget: 'color_picker',
        },
        sessionDateAndTimeColor: {
          label: 'Session Date And Time Color',
          defaultValue: theme?.accentColor,
          widget: 'color_picker',
        },
        sessionDescriptionColor: {
          label: 'Session Description Color',
          defaultValue: theme?.primaryFontColor,
          widget: 'color_picker',
        },
        isShowSpeakerAndBooth: {
          label: 'Show Speaker And Booth',
          defaultValue: true,
          widget: 'toggle',
        },
      },
    },
  },
  transformer: (values, source) => {
    const { name, value, data } = source;
    // Transform the values here
    // We will update selected values in property editor here
    const newValues =
      name === 'sessionLibrary'
        ? {
            ...values,
            sessionName: value?.selected?.name,
            dateAndTime: value?.selected?.dateAndTime,
            description: value?.selected?.description,
            speakers: value?.selected?.speakers,
            booths: value?.selected?.booths,
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