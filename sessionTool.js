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

  const speakerList = function (speakers, sessionId) {
    let sps = ``;
    speakers.map((speaker, i) => {
      if (i <= 3) {
        sps += ` <div id="${sessionId}-${speaker?.id}-sessionSpeaker" style="height: 30px;width: 30px;overflow: hidden;border-radius: 30px; display: flex;margin-right:6px;">
                  <img id="${sessionId}-${speaker?.id}-sessionSpeakerImg" src="${speaker?.img}" alt="img" />
                </div>`;
      }
    });
    if (speakers.length > 4) {
      sps += `<div id="remainingSessionSpeakerCount" style="background-color:${
        theme.accentColor
      }; color:${
        theme.secondaryFontColor
      };height: 30px;width: 30px;overflow: hidden;border-radius: 30px; justify-content: center;align-items: center;font-size: 13px; line-height: 30px; display: block; text-align: center;">
              +${speakers.length - 4}
            </div>`;
    }
    return sps;
  };

  const boothList = function (sponsors, sessionId) {
    let bts = ``;
    sponsors.map((booth, i) => {
      if (i <= 1) {
        bts += ` <div id="${sessionId}-${booth?.id}-sessionSponsor" style="height: 30px; width: 50px;overflow: hidden;border-radius: 4px;display: flex;margin-right: 6px;justify-content: center;padding: 2px;border: 1px solid #E0E0E0;background-color: #ffffff;box-sizing:border-box">
                  <img id="${sessionId}-${booth?.id}-sessionSponsorImg" src="${booth?.img}" alt="img" style="margin:0 auto;"/>
                </div>`;
      }
    });
    if (sponsors.length > 2) {
      bts += `<div id="remainingSessionSponsorCount" style="background-color:${
        theme.accentColor
      };color:${
        theme.secondaryFontColor
      };height: 30px;width: 30px;overflow: hidden;border-radius: 4px; justify-content: center;align-items: center;font-size: 13px; line-height: 30px; display: block; text-align: center;"> 
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
    if (values?.sessionLibrary?.selected?.id) {
      if (isPreview) {
        return ` 
        <table width="100%">
        <tr>
          <td align="left">
            <div align="left" style="display: flex; justify-content: start; align-items: center;" id="${
              values?.sessionLibrary?.selected?.id
            }-sessionSpeakers">
            ${
              !values?.sessionLibrary?.selected?.id || !values?.speakers?.length
                ? ''
                : speakerList(values?.speakers, values?.sessionLibrary?.selected?.id)
            } 
            </div>
          </td>
          <td align="right">
            <div align="right" style="display: inline-flex;justify-content: end;align-items: center;"  id="${
              values?.sessionLibrary?.selected?.id
            }-sessionSponsors">
            ${
              !values?.sessionLibrary?.selected?.id || !values?.sponsors?.length
                ? ''
                : boothList(values?.sponsors, values?.sessionLibrary?.selected?.id)
            }
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
            ${
              !values?.sessionLibrary?.selected?.id || !values?.speakers?.length
                ? ''
                : speakerList(values?.speakers, values?.sessionLibrary?.selected?.id)
            } 
            </div>
          </td>
          <td align="right" valign="center">
            <div align="right" style="display: inline-flex; justify-content:end; align-items: center;"  id="${
              values?.sessionLibrary?.selected?.id
            }-sessionSponsors">
            ${
              !values?.sessionLibrary?.selected?.id || !values?.sponsors?.length
                ? ''
                : boothList(values?.sponsors, values?.sessionLibrary?.selected?.id)
            }
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
  <div style="width: 87%; height: auto;" class="session-item" id="session-item" data-uuid='<%= item.id %>' data-title="<%= item.name %>"  data-date-time="<%= item.dateAndTime %>" >
    <p style="color: ${theme.accentColor};">
    <span style="padding-right: 4px;vertical-align: middle;color: ${theme.accentColor};">
      <img src="https://immo-virtualevent-cdn.s3.ap-south-1.amazonaws.com/icon_png/u_clock-seven.png" style="width: 16px; height: 16px; vertical-align: top;" />
    </span>
     <%= item.dateAndTime %> 
     </p>
    <h4 style="margin: 8px 0; text-align: left; color: ${theme.primaryFontColor};"><%= item.name %></h4>
    <div class="session-modal-desc" style="margin: 0px; text-align: left; color: ${theme.primaryFontColor};"><%= item.description %></div>
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
            <input type="text" class="form-control" placeholder="Search by session name or track name" id="search-bar-session" style="width: 87%" />
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
      <img src="https://immo-virtualevent-cdn.s3.ap-south-1.amazonaws.com/icon_png/u_clock-seven.png" style="width: 16px; height: 16px; vertical-align: middle;" /> <span style="margin-left:10px"> ${
        values?.dateAndTime ? values?.dateAndTime : ''
      } </span>
      </p>
      <h3 class="session-title" style="margin: 10px 0 5px 0; color: ${values.sessionNameColor};">${
        values.sessionName ? values.sessionName : ''
      }</h3>
      <div class="session-description" style="color:${
        values.sessionDescriptionColor
      }; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
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
  <div sessionId="${
    values?.sessionLibrary?.selected?.id
  }" style="position:relative;background-color:${
        values.sessionCardBGColor
      };margin-bottom: 15px;height: auto;padding: 14px;border-radius: 8px; max-width:540px;" sessionUid="sct01">
  <div class="session-card-body">
    <p style="color:${
      values.sessionDateAndTimeColor
    };display: flex;align-items: center;font-size: 12px;font-weight: 500;">
    <img src="https://immo-virtualevent-cdn.s3.ap-south-1.amazonaws.com/icon_png/u_clock-seven.png" style="width: 16px; height: 16px; vertical-align: middle;" /> <span id="${
      values?.sessionLibrary?.selected?.id
    }-sessionDateAndTime" style="margin-left:10px"> ${
        values?.dateAndTime ? values.dateAndTime : ''
      } </span>
    </p>
    <h3 id="${
      values?.sessionLibrary?.selected?.id
    }-sessionName" style="margin: 10px 0 5px 0; color: ${
        values.sessionNameColor
      };font-size: 14px;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: block;">${
        values?.sessionName ? values.sessionName : ''
      }</h3>
    <div id="${values?.sessionLibrary?.selected?.id}-sessionDescription" style="color:${
        values.sessionDescriptionColor
      };font-size: 12px;font-weight: 400; display: block; overflow: hidden; max-height: 34px; line-height:18px;">
      ${values?.description ? values.description : ''}
    </div>
    <div id="${
      values?.sessionLibrary?.selected?.id
    }-hideSpeakerAndBoothList" style="margin-top:10px;">
      ${values.isShowSpeakerAndBooth ? speakerAndBoothList(values, true) : ''}  
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

  unlayer.registerPropertyEditor({
    name: 'session_background_color',
    Widget: unlayer.createWidget({
      render(value, updateValue, data) {
        return `<input value=${value} disabled/> <span style="font-size: 12px;color:#8f9699;font-weight:600;float:right">Session Background Color</span>`;
      },
    }),
  });

  unlayer.registerPropertyEditor({
    name: 'session_name_color',
    Widget: unlayer.createWidget({
      render(value, updateValue, data) {
        return `<input value=${value} disabled/> <span style="font-size: 12px;color:#8f9699;font-weight:600;float:right">Session Name Color</span>`;
      },
    }),
  });

  unlayer.registerPropertyEditor({
    name: 'session_date_and_time_color',
    Widget: unlayer.createWidget({
      render(value, updateValue, data) {
        return `<input value=${value} disabled/> <span style="font-size: 12px;color:#8f9699;font-weight:600;float:right">Session Date and Time Color</span>`;
      },
    }),
  });

  unlayer.registerPropertyEditor({
    name: 'session_description_color',
    Widget: unlayer.createWidget({
      render(value, updateValue, data) {
        return `<input value=${value} disabled/> <span style="font-size: 12px;color:#8f9699;font-weight:600;float:right">Session Description Color</span>`;
      },
    }),
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
              if (
                e?.which === 13 ||
                !e.target.value ||
                (e.target.value.length === 1 && e?.which === 8)
              ) {
                const list = document.querySelector('#session_library_modal .sessions-list');
                let filteredItem;
                let sessionListHtml;
                if (list && data && data.sessions) {
                  if (searchBar.value === '' || (e.target.value.length === 1 && e?.which === 8)) {
                    sessionListHtml = sessionItemsTemplate({ sessions: data.sessions });
                  } else {
                    filteredItem = data.sessions.filter(
                      (item) =>
                        item?.name?.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                        item?.trackName?.toLowerCase().includes(searchBar.value.toLowerCase())
                    );
                    sessionListHtml = sessionItemsTemplate({ sessions: filteredItem });
                  }
                  list.innerHTML =
                    searchBar.value && !sessionListHtml.trim()
                      ? sessionNoItemsTemplate
                      : sessionListHtml;
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
                  filteredItem = data.sessions.filter(
                    (item) =>
                      item?.name?.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                      item?.trackName?.toLowerCase().includes(searchBar.value.toLowerCase())
                  );
                  sessionListHtml = sessionItemsTemplate({ sessions: filteredItem });
                }
                list.innerHTML =
                  searchBar.value && !sessionListHtml.trim()
                    ? sessionNoItemsTemplate
                    : sessionListHtml;
              }
            };
            closeBtn.onclick = function (e) {
              searchBar.value = '';
              searchButton.click();
              hideModal();
            };
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
      //       responsive: {// remove responsive design
      //         enabled: false,
      //         title: "Responsive Design",
      //       },
      sessionContent: {
        title: 'Session Content',
        position: 1,
        options: {
          sessionLibrary: {
            label: 'Add Session from store',
            defaultValue: '',
            widget: 'session_library',
          },
          isShowSpeakerAndBooth: {
            label: 'Show Speaker and Booth',
            defaultValue: true,
            widget: 'toggle',
          },
        },
      },
      colorContent: {
        title:
          'Color options for the session have been disabled. Make changes to the session colors via the Theme option in Brand Your Event.',
        options: {
          sessionCardBGColor: {
            defaultValue: theme?.primaryColor,
            widget: 'session_background_color',
          },
          sessionNameColor: {
            defaultValue: theme?.primaryFontColor,
            widget: 'session_name_color',
          },
          sessionDateAndTimeColor: {
            defaultValue: theme?.accentColor,
            widget: 'session_date_and_time_color',
          },
          sessionDescriptionColor: {
            defaultValue: theme?.primaryFontColor,
            widget: 'session_description_color',
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
