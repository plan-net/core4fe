export const mapDict = {
  per_page: 'itemsPerPage',
  itemsPerPage: 'per_page',
  label: 'text',
  text: 'label',
  value: 'name',
  name: 'value'
}

export const initialTranslation = {
  data_loading: 'Data loading ...',
  advanced_options: 'Advanced options',
  show: 'Show',
  drag_drop_column: 'Drag & Drop columns',
  itemsPerPageAllText: 'Alle',
  itemsPerPageText: 'Zeilen pro Seite'
}

export const OPTIONS = {
  page: null,
  itemsPerPage: 0,
  sortBy: [],
  sortDesc: [],
  groupBy: [],
  groupDesc: [],
  // mustSort: null,
  multiSort: true,

  option: {
    advanced_options: false,
    dense: true,
    fixed_header: null,
    footer: null,
    height: null,
    hide_header: null,
    info: null,
    search: null,
    fullscreen: false
  },

  paging: {
    count: 0,
    page: 0,
    page_count: 0,
    per_page: 0,
    total_count: 0
  }
}
