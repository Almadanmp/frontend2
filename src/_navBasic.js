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
  ],
};
