window.__APP_SITE_CONFIG__ = {
  el: '#app',
  layout: async ([form]) => {
    return {
      type: 'site',
      // 单页面内嵌模式
      body: await fetch(form.url)
        .then((resp) => resp.json())
        .then(({ data }) => data)
    };
  },
  resources: [
    {
      id: 'signin-form',
      url: '/pages/signin/page.json'
    }
  ]
};
