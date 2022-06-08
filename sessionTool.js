(function () {
  const editorTemplate = `<button id="session" class="button">Add Session</button>`;
  const searchButton = `<button id="search-btn-session" class="button">Search</button>`;
  const defaultSpeaker = `
            <div style="height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex;margin-right:6px;">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div style="height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex;margin-right:6px;">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div style="height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex;margin-right:6px;">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div style="height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex;margin-right:6px;">
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/default_hash.png" alt="pic" />
            </div>
            <div style="background-color:${theme.accentColor}; color:${theme.secondaryFontColor};height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex; justify-content: center;align-items: center;font-size: 13px;">
              +2
            </div>
         `;

  const speakerList = function (speakers) {
    let sps = ``;
    speakers.map((speaker, i) => {
      if (i <= 3) {
        sps += ` <div id="${speakers?.id}-sessionSpeaker" style="height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex;margin-right:6px;">
                  <img src="${speaker?.img}" alt="img" />
                </div>`;
      }
    });
    if (speakers.length > 4) {
      sps += `<div id="remainingSessionSpeakerCount" style="background-color:${
        theme.accentColor
      }; color:${
        theme.secondaryFontColor
      };height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex; justify-content: center;align-items: center;font-size: 13px;">
              +${speakers.length - 4}
            </div>`;
    }
    return sps;
  };

  const boothList = function (sponsors) {
    let bts = ``;
    sponsors.map((booth, i) => {
      if (i <= 1) {
        bts += ` <div id="${sponsors?.id}-sessionSponsor" style="height: 30px; width: 50px;overflow: hidden;border-radius: 4px;display: flex;margin-right: 6px;justify-content: center;padding: 2px;border: 1px solid #E0E0E0;background-color: #ffffff;box-sizing:border-box">
                  <img src="${booth?.img}" alt="img" />
                </div>`;
      }
    });
    if (sponsors.length > 2) {
      bts += `<div id="remainingSessionSponsorCount" style="background-color:${
        theme.accentColor
      };color:${
        theme.secondaryFontColor
      };height: 30px;width: 30px;overflow: hidden;border-radius: 4px; display: flex; justify-content: center;align-items: center;font-size: 13px;"> 
               +${sponsors.length - 2}
            </div>`;
    }
    return bts;
  };

  const defaultBooth = `
            <div style="height: 30px; width: 50px;overflow: hidden;border-radius: 4px;display: flex;margin-right: 6px;justify-content: center;padding: 2px;border: 1px solid #E0E0E0;background-color: #ffffff;box-sizing:border-box"> 
            <img src="https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png" alt="pic" />
            </div>
            <div style="height: 30px; width: 50px;overflow: hidden;border-radius: 4px;display: flex;margin-right: 6px;justify-content: center;padding: 2px;border: 1px solid #E0E0E0;background-color: #ffffff;box-sizing:border-box"> 
              <img src="https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png" alt="pic" />
            </div>  
            <div  style="background-color:${theme.accentColor};color:${theme.secondaryFontColor};height: 30px;width: 30px;overflow: hidden;border-radius: 4px; display: flex; justify-content: center;align-items: center;font-size: 13px;"> 
              +2
            </div>`;

  const speakerAndBoothList = function (values, isPreview) {
    if (
      values?.speakers?.length ||
      values?.sponsors?.length ||
      !values?.sessionLibrary?.selected?.id
    ) {
      if (isPreview) {
        return ` 
        <table width="100%">
        <tr>
          <td align="left">
            <div align="left" style="display: flex; justify-content: start; align-items: center;" id="${
              values?.sessionLibrary?.selected?.id
            }-sessionSpeakers">
            ${!values?.sessionLibrary?.selected?.id ? defaultSpeaker : speakerList(values?.speakers)} 
            </div>
          </td>
          <td align="right">
            <div align="right" style="display: inline-flex;justify-content: end;align-items: center;"  id="${
              values?.sessionLibrary?.selected?.id
            }-sessionSponsors">
            ${!values?.sessionLibrary?.selected?.id ? defaultBooth : boothList(values?.sponsors)}
            </div>
          </td>
        </tr>
        </table>
      `;
      } else {
        return ` 
        <table width="100%">
        <tr>
          <td align="left" valign="center">
            <div align="left" style="display: flex; justify-content:start; align-items: center;" id="${
              values?.sessionLibrary?.selected?.id
            }-sessionSpeakers">
            ${!values?.sessionLibrary?.selected?.id ? defaultSpeaker : speakerList(values?.speakers)} 
            </div>
          </td>
          <td align="right" valign="center">
            <div align="right" style="display: inline-flex; justify-content:end; align-items: center;"  id="${
              values?.sessionLibrary?.selected?.id
            }-sessionSponsors">
            ${!values?.sessionLibrary?.selected?.id ? defaultBooth : boothList(values?.sponsors)}
            </div>
          </td>
        </tr>
        </table>  
      `;
      }
    } else {
      return ``;
    }
  };

  const sessionItemsTemplate = _.template(`
<% _.forEach(sessions, function(item) { %>
  <div style="width: 78%; height: auto;" class="session-item" id="session-item" data-uuid='<%= item.id %>' data-title="<%= item.name %>"  data-date-time="<%= item.dateAndTime %>" >
    <p style="color: ${theme.primaryFontColor};">
    <span style="padding-right: 4px;vertical-align: middle;color: ${theme.primaryFontColor};">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8.25 0.5C6.76664 0.5 5.3166 0.939867 4.08323 1.76398C2.84986 2.58809 1.88856 3.75943 1.32091 5.12987C0.75325 6.50032 0.604725 8.00832 0.894114 9.46318C1.1835 10.918 1.89781 12.2544 2.9467 13.3033C3.9956 14.3522 5.33197 15.0665 6.78683 15.3559C8.24168 15.6453 9.74968 15.4968 11.1201 14.9291C12.4906 14.3614 13.6619 13.4001 14.486 12.1668C15.3101 10.9334 15.75 9.48336 15.75 8C15.75 7.01509 15.556 6.03982 15.1791 5.12987C14.8022 4.21993 14.2497 3.39314 13.5533 2.6967C12.8569 2.00026 12.0301 1.44781 11.1201 1.0709C10.2102 0.693993 9.23492 0.5 8.25 0.5V0.5ZM8.25 14C7.06332 14 5.90328 13.6481 4.91658 12.9888C3.92989 12.3295 3.16085 11.3925 2.70673 10.2961C2.2526 9.19974 2.13378 7.99334 2.36529 6.82946C2.5968 5.66557 3.16825 4.59647 4.00736 3.75736C4.84648 2.91824 5.91558 2.3468 7.07946 2.11529C8.24335 1.88378 9.44975 2.0026 10.5461 2.45672C11.6425 2.91085 12.5795 3.67988 13.2388 4.66658C13.8981 5.65327 14.25 6.81331 14.25 8C14.25 9.5913 13.6179 11.1174 12.4926 12.2426C11.3674 13.3679 9.8413 14 8.25 14V14ZM8.25 3.5C8.05109 3.5 7.86033 3.57902 7.71967 3.71967C7.57902 3.86032 7.5 4.05109 7.5 4.25V7.9475L6.4725 9.725C6.37305 9.89805 6.34641 10.1035 6.39845 10.2962C6.45049 10.4889 6.57695 10.653 6.75 10.7525C6.92306 10.852 7.12853 10.8786 7.32123 10.8266C7.51392 10.7745 7.67805 10.6481 7.7775 10.475L8.9025 8.525C8.97466 8.38943 9.00346 8.23497 8.985 8.0825L9 8V4.25C9 4.05109 8.92099 3.86032 8.78033 3.71967C8.63968 3.57902 8.44892 3.5 8.25 3.5Z" fill="currentcolor"/>
      </svg>
    </span>
     <%= item.dateAndTime %> 
     </p>
    <h4 style="margin: 8px 0; text-align: left; color: ${theme.primaryColor};"><%= item.name %></h4>
    <div class="session-modal-desc" style="margin: 0px; text-align: left; color: ${theme.primaryColor};"><%= item.description %></div>
  </div>
<% }); %>
`);

  const sessionNoItemsTemplate = `
  <div>
    <h4>No Sessions Found</h4>
    <p>Try searching with a different keyword</p>
  </div>
`;

  const modalTemplate = function (data) {
    return `
  <div class="modal" id="session_library_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Session List</h3>
          <button class="close" id="modalCloseBtnSession">&times;</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input type="text" class="form-control" placeholder="Search by session name or track name" id="search-bar-session" style="width: 78%" />
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
    if (values.sessionLibrary) {
      return `<div class="session-card" style="position:relative;background-color:${
        values.sessionCardBGColor
      }" >
    <div class="session-card-body">
      <p class="session-date" style="color:${values.sessionDateAndTimeColor};">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8.25 0.5C6.76664 0.5 5.3166 0.939867 4.08323 1.76398C2.84986 2.58809 1.88856 3.75943 1.32091 5.12987C0.75325 6.50032 0.604725 8.00832 0.894114 9.46318C1.1835 10.918 1.89781 12.2544 2.9467 13.3033C3.9956 14.3522 5.33197 15.0665 6.78683 15.3559C8.24168 15.6453 9.74968 15.4968 11.1201 14.9291C12.4906 14.3614 13.6619 13.4001 14.486 12.1668C15.3101 10.9334 15.75 9.48336 15.75 8C15.75 7.01509 15.556 6.03982 15.1791 5.12987C14.8022 4.21993 14.2497 3.39314 13.5533 2.6967C12.8569 2.00026 12.0301 1.44781 11.1201 1.0709C10.2102 0.693993 9.23492 0.5 8.25 0.5V0.5ZM8.25 14C7.06332 14 5.90328 13.6481 4.91658 12.9888C3.92989 12.3295 3.16085 11.3925 2.70673 10.2961C2.2526 9.19974 2.13378 7.99334 2.36529 6.82946C2.5968 5.66557 3.16825 4.59647 4.00736 3.75736C4.84648 2.91824 5.91558 2.3468 7.07946 2.11529C8.24335 1.88378 9.44975 2.0026 10.5461 2.45672C11.6425 2.91085 12.5795 3.67988 13.2388 4.66658C13.8981 5.65327 14.25 6.81331 14.25 8C14.25 9.5913 13.6179 11.1174 12.4926 12.2426C11.3674 13.3679 9.8413 14 8.25 14V14ZM8.25 3.5C8.05109 3.5 7.86033 3.57902 7.71967 3.71967C7.57902 3.86032 7.5 4.05109 7.5 4.25V7.9475L6.4725 9.725C6.37305 9.89805 6.34641 10.1035 6.39845 10.2962C6.45049 10.4889 6.57695 10.653 6.75 10.7525C6.92306 10.852 7.12853 10.8786 7.32123 10.8266C7.51392 10.7745 7.67805 10.6481 7.7775 10.475L8.9025 8.525C8.97466 8.38943 9.00346 8.23497 8.985 8.0825L9 8V4.25C9 4.05109 8.92099 3.86032 8.78033 3.71967C8.63968 3.57902 8.44892 3.5 8.25 3.5Z" fill="currentcolor"/>
      </svg> <span style="margin-left:10px"> ${
        values?.dateAndTime ? values?.dateAndTime : ''
      } </span>
      </p>
      <h3 class="session-title" style="margin: 10px 0 5px 0; color: ${values.sessionNameColor};">${
        values.sessionName ? values.sessionName : ''
      }</h3>
      <div class="session-description" style="color:${values.sessionDescriptionColor}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
        ${values.description ? values.description : ''}
      </div>
      <div class="booth-speaker-data" style="margin-top:10px;">
        ${values?.isShowSpeakerAndBooth ? speakerAndBoothList(values) : ''}  
      </div>
    </div>
  </div>
  ${isViewer ? modalTemplate({ sessions: values.data.sessions }) : ''}`;
    } else {
      return `
      <div style="position:relative;background-color:#F6F8F8;border:1px solid rgba(0,0,0,.125);border-radius:4px;margin:auto;text-align:center; padding:20px 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M38 8H10C7.79086 8 6 9.79086 6 12V40C6 42.2091 7.79086 44 10 44H38C40.2091 44 42 42.2091 42 40V12C42 9.79086 40.2091 8 38 8Z" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 20H42" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M32 4V12" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 4V12" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p style="font-size:13px;color:#808080;">Click here to select a session from the list.</p>
      </div>
      ${isViewer ? modalTemplate({ sessions: values.data.sessions }) : ''}`;
    }
  };

  const toolEmailTemplate = function (values, isViewer = false) {
    if (values.sessionLibrary) {
      return `
  <div sessionId="${values?.sessionLibrary?.selected?.id}" style="position:relative;background-color:${
    values.sessionCardBGColor
  };margin-bottom: 15px;height: auto;padding: 14px;border-radius: 8px; max-width:540px;" >
  <div class="session-card-body">
    <p style="color:${
      values.sessionDateAndTimeColor
    };display: flex;align-items: center;font-size: 12px;font-weight: 500;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8.25 0.5C6.76664 0.5 5.3166 0.939867 4.08323 1.76398C2.84986 2.58809 1.88856 3.75943 1.32091 5.12987C0.75325 6.50032 0.604725 8.00832 0.894114 9.46318C1.1835 10.918 1.89781 12.2544 2.9467 13.3033C3.9956 14.3522 5.33197 15.0665 6.78683 15.3559C8.24168 15.6453 9.74968 15.4968 11.1201 14.9291C12.4906 14.3614 13.6619 13.4001 14.486 12.1668C15.3101 10.9334 15.75 9.48336 15.75 8C15.75 7.01509 15.556 6.03982 15.1791 5.12987C14.8022 4.21993 14.2497 3.39314 13.5533 2.6967C12.8569 2.00026 12.0301 1.44781 11.1201 1.0709C10.2102 0.693993 9.23492 0.5 8.25 0.5V0.5ZM8.25 14C7.06332 14 5.90328 13.6481 4.91658 12.9888C3.92989 12.3295 3.16085 11.3925 2.70673 10.2961C2.2526 9.19974 2.13378 7.99334 2.36529 6.82946C2.5968 5.66557 3.16825 4.59647 4.00736 3.75736C4.84648 2.91824 5.91558 2.3468 7.07946 2.11529C8.24335 1.88378 9.44975 2.0026 10.5461 2.45672C11.6425 2.91085 12.5795 3.67988 13.2388 4.66658C13.8981 5.65327 14.25 6.81331 14.25 8C14.25 9.5913 13.6179 11.1174 12.4926 12.2426C11.3674 13.3679 9.8413 14 8.25 14V14ZM8.25 3.5C8.05109 3.5 7.86033 3.57902 7.71967 3.71967C7.57902 3.86032 7.5 4.05109 7.5 4.25V7.9475L6.4725 9.725C6.37305 9.89805 6.34641 10.1035 6.39845 10.2962C6.45049 10.4889 6.57695 10.653 6.75 10.7525C6.92306 10.852 7.12853 10.8786 7.32123 10.8266C7.51392 10.7745 7.67805 10.6481 7.7775 10.475L8.9025 8.525C8.97466 8.38943 9.00346 8.23497 8.985 8.0825L9 8V4.25C9 4.05109 8.92099 3.86032 8.78033 3.71967C8.63968 3.57902 8.44892 3.5 8.25 3.5Z" fill="currentcolor"/>
    </svg> <span id="${values?.sessionLibrary?.selected?.id}-sessionDateAndTime" style="margin-left:10px"> ${
      values?.dateAndTime ? values.dateAndTime : ''
    } </span>
    </p>
    <h3 id="${values?.sessionLibrary?.selected?.id}-sessionName" style="margin: 10px 0 5px 0; color: ${
      values.sessionNameColor
    };font-size: 14px;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: block;">${
        values?.sessionName ? values.sessionName : ''
      }</h3>
    <div id="${values?.sessionLibrary?.selected?.id}-sessionDescription" style="color:${
      values.sessionDescriptionColor
    };font-size: 12px;font-weight: 400; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
      ${values?.description ? values.description : ''}
    </div>
    <div style="margin-top:10px;">
      ${values.isShowSpeakerAndBooth ? speakerAndBoothList(values) : ''}  
    </div>
  </div>
</div>
  `;
    } else {
      return ``;
    }
  };

  const showModal = function () {
    const modal = document.getElementById('session_library_modal');
    modal.classList.add('show');
  };

  const hideModal = function () {
    const modal = document.getElementById('session_library_modal');
    modal.classList.remove('show');
  };

//   unlayer.registerPropertyEditor({
//   name: 'custom_color_picker',
//   Widget: unlayer.createWidget({
//       render(value, updateValue, data) {
//         return `<input class="color-value" value=${value} disabled/>`
//   return ``
//       },
//       mount(node, value, updateValue, data) {
//         var input = node.getElementsByClassName('color-value')[0]
//         input.onchange = function(event) {
//           updateValue(event.target.value)
//         }
//       }
//     })
//   });

  unlayer.registerPropertyEditor({
  name: 'custom_color_picker',
  Widget: unlayer.createWidget({
      render(value, updateValue, data) {
        return `<input class="color-value" value=${value} disabled/>`
      },
    })
  });

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
            const searchBar = document.querySelector('#search-bar-session');
            searchBar.onkeydown = function (e) {
              if(e?.which === 13 || !e.target.value || (e.target.value.length === 1 && e?.which === 8)){
              const list = document.querySelector('#session_library_modal .sessions-list');
              let filteredItem;
              let sessionListHtml;
              if (list && data && data.sessions) {
                if (searchBar.value === '' || (e.target.value.length === 1 && e?.which === 8)) {
                  sessionListHtml = sessionItemsTemplate({ sessions: data.sessions });
                } else {
                  filteredItem = data.sessions.filter((item) =>
                    item?.name?.toLowerCase().includes(searchBar.value.toLowerCase()) || item?.trackName?.toLowerCase().includes(searchBar.value.toLowerCase())
                  );
                  sessionListHtml = sessionItemsTemplate({ sessions: filteredItem });
                }
                list.innerHTML = searchBar.value && !sessionListHtml.trim() ? sessionNoItemsTemplate : sessionListHtml;
              }
              }
            };
            
            const searchButton = document.querySelector('#search-btn-session');
            const closeBtn = document.querySelector('#modalCloseBtnSession');
            searchButton.onclick = function (e) {
                const list = document.querySelector('#session_library_modal .sessions-list');
                let filteredItem;
                let sessionListHtml;
                if (list && data && data.sessions) {
                  if (searchBar.value === '') {
                    sessionListHtml = sessionItemsTemplate({ sessions: data.sessions });
                  } else {
                    filteredItem = data.sessions.filter((item) =>
                      item?.name?.toLowerCase().includes(searchBar.value.toLowerCase()) || item?.trackName?.toLowerCase().includes(searchBar.value.toLowerCase())
                    );
                    sessionListHtml = sessionItemsTemplate({ sessions: filteredItem });
                  }
                 list.innerHTML = searchBar.value && !sessionListHtml.trim() ? sessionNoItemsTemplate : sessionListHtml;
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
    name: 'session_tool',
    label: 'Session',
    icon: 'fa-calendar',
    supportedDisplayModes: ['web', 'email'],
    options: { 
      responsive: {// remove responsive design 
        enabled: false,
        title: "Responsive Design",
      },
      sessionContent: {
        title: 'Session Content',
        position: 1,
        options: {
          sessionLibrary: {
            label: 'Add Session from store',
            defaultValue: '',
            widget: 'session_library',
          },
          sessionCardBGColor: {
            label: 'Session Background Color',
            defaultValue: theme?.primaryColor,
            widget: 'custom_color_picker',
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
              sponsors: value?.selected?.sponsors,
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
