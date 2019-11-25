export function checkShadow (el) {
  const tableWidth = el.querySelector('.v-data-table') && el.querySelector('.v-data-table').offsetWidth
  const docWidth = document.querySelector('.v-application').offsetWidth

  if (tableWidth > docWidth) {
    el.classList.add('shadowed')
  } else {
    el.classList.remove('shadowed')
  }
}

export function adjustFixedHeaderHeight (el) {
  const viewportOffset = el.getBoundingClientRect()
  // these are relative to the viewport, i.e. the window
  const top = viewportOffset.top
  const availHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  console(top, availHeight)
/*   const tableWidth = el.querySelector('.v-data-table-header').offsetWidth
  const docWidth = document.querySelector('.v-application').offsetWidth
  if (tableWidth > docWidth) {
    el.classList.add('shadowed')
  } else {
    el.classList.remove('shadowed')
  } */
}
