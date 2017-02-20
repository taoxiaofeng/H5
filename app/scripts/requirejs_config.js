requirejs.config({
  baseUrl: '.',
  paths: {
    jquery: 'jquery-2.1.1.min',
    XMLife: 'XMLifeLib'
    //!important: 注释掉urls.js，需要动态加载，为了让运维可配置
    //URLConfig: 'config/urls'
  }
});

require([], function() {

});
