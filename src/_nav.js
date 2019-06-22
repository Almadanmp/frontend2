export default {

  items: [
    {
      name: 'Home page',
      url: '/homepage',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'SMART',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Area',
      url: '/area',
      icon: 'icon-globe',
    },
    {
      name: 'House',
      url: '/house',
      icon: 'icon-home',
      children: [
        {
          name: 'House Monitoring',
          url: '/house/monitoring',
          icon: 'cui-sun icons',
          },
        {
          name: 'House Configuration',
          url: '/house/configuration',
          icon: 'fa fa-wrench fa-lg',
        },
      ],
    },
    {
      name: 'Room',
      url: '/theme/room',
      icon: 'fa fa-bed fa-lg',
      children: [
        {
          name: 'Room Monitoring',
          url: '/room/monitoring',
          icon: 'fa fa-thermometer fa-lg',
        },
        {
          name: 'Room Configuration',
          url: '/room/configuration',
          icon: 'fa fa-wrench fa-lg',
        },
      ],
    },
    {
      name: 'Energy',
      url: '/energy',
      icon: 'icon-energy\n',
    },
    {
      name: 'Sensor',
      url: '/sensor',
      icon: 'icon-speedometer\n',
    },

    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
        {
          name: 'About',
          url: '/about',
          icon: 'icon-star',
        },

        {
          name: 'PleaseLogin',
          url: '/pleaseLogIn',
          icon: 'icon-star',
        },
  ],
};
