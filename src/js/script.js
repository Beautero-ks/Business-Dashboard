
// Start sidebar
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const sidebarMenu = document.querySelector('.sidebar-menu');
const main = document.querySelector('.main');
sidebarToggle.addEventListener('click', function(e){
    e.preventDefault()
    main.classList.toggle('active')
    sidebarOverlay.classList.toggle('hidden')
    sidebarMenu.classList.toggle('-translate-x-full')
})
sidebarOverlay.addEventListener('click', function(e){
    e.preventDefault()
    main.classList.add('active')
    sidebarOverlay.classList.add('hidden')
    sidebarMenu.classList.add('-translate-x-full')
})
document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function(item){
    item.addEventListener('click', function(e){
        e.preventDefault()
        const dropdown = item.closest('.group')
        if (dropdown.classList.contains('selected')) {
            dropdown.classList.remove('selected')
        } else {
            document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function(i){
                i.closest('.group').classList.remove('selected')
            })
            dropdown.classList.add('selected')
        }
    })
})
//End sidebar

// Start popper
const popperInstance = {}
document.querySelectorAll('.dropdown').forEach(function(item, index){
    const popperId = 'popper-'+index
    const toggle = item.querySelector('.dropdown-toggle')
    const menu = item.querySelector('.dropdown-menu')
    menu.dataset.popperId = popperId
    popperInstance[popperId] = Popper.createPopper(toggle, menu, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            mane: "preventOverflow",
            options:{
                padding:20,
            },
          }
        ],
        placement: 'bottom-end'
      });
})
document.addEventListener('click', function(e){
    const toggle = e.target.closest('.dropdown-toggle')
    const menu = e.target.closest('.dropdown-menu')
    if (toggle) {
        const menuEl = toggle.closest('.dropdown').querySelector('.dropdown-menu')
        const popperId = menuEl.dataset.popperId
        if (menuEl.classList.contains('hidden')) {
            hideDropdown()
            menuEl.classList.remove('hidden')
            showPopper(popperId)
        } else {
            menuEl.classList.add('hidden')
            hidePopper(popperId)
        }
    }else if(!menu){
        hideDropdown()
    }
})

function hideDropdown(){
    document.querySelectorAll('.dropdown-menu').forEach(function (item) {
        item.classList.add('hidden')
    })
}

function showPopper(propperId) {
    popperInstance[propperId].setOptions(function(options){
        return {
            ...options,
            modifiers: [
              ...options.modifiers,
              { name: 'eventListeners', enabled: true },
            ],
        }
    });
  popperInstance[propperId].update();
}
function hidePopper(propperId) {
    popperInstance[propperId].setOptions(function(options){
        return {
            ...options,
            modifiers: [
              ...options.modifiers,
              { name: 'eventListeners', enabled: false },
            ],
        }
    });
}
// End popper

// Start data-tab
document.querySelectorAll('[data-tab]').forEach(function(item){
    item.addEventListener('click', function(e){
        e.preventDefault()
        const tab = item.dataset.tab
        const page = item.dataset.tabPage
        const target = document.querySelector('[data-tab-for ="'+tab+'"][data-page ="'+page+'"]')
        document.querySelectorAll('[data-tab ="'+tab+'"]').forEach(function(i){
            i.classList.remove('active')
        })
        document.querySelectorAll('[data-tab-for ="'+tab+'"]').forEach(function(i){
            i.classList.add('hidden')
        })
        item.classList.add('active')
        target.classList.remove('hidden')
    })
})
// End data-tab

//Stard charts
const orderChart = document.getElementById('order-chart');

  new Chart(orderChart, {
    type: 'line',
    data: {
      labels: generateDays(7),
      datasets: [
        {
          label: 'Active',
          data: generateRandomData(7),
          borderWidth: 1,
          fill: true,
          backgroundColor: 'rgb(50 130 240 / .05)',
          borderColor: 'rgb(50, 130, 240)',
          pointBackgroundColor: 'rgb(50, 130, 240)',
          tension: .2
        },
        {
          label: 'Completed',
          data: generateRandomData(7),
          borderWidth: 1,
          fill: true,
          backgroundColor: 'rgb(16 185 129 / .1)',
          borderColor: 'rgb(16, 185, 129)',
          pointBackgroundColor: 'rgb(16, 185, 129)',
          tension: .2
        },
        {
          label: 'Canceled',
          data: generateRandomData(7),
          borderWidth: 1,
          fill: true,
          backgroundColor: 'rgb(244 63 94 / .05)',
          borderColor: 'rgb(244, 63, 94)',
          pointBackgroundColor: 'rgb(244, 63, 94)',
          tension: .2
        },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  function generateDays(n){
    const data = []
    for(var i=0; i<n; i++){
      const date = new Date()
      date.setDate(date.getDate()-i)
      data.push(date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric'
      }))
    }
    return data
  }
  function generateRandomData(n){
    const data = []
    for(var i=0; i<n; i++){
      data.push(Math.round(Math.random() * 10))
    }
    return data
  }