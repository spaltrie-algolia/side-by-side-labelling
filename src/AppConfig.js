const appConfig = {
   nbHits: 15,
   indices: [
   {
      appId: "Z0YPI1PLPQ",
      apiKey: "ced123667f21fd51c09a3b81a4ae4b30",
      indexName: "alg_neuralsearch_test_darty_prod_es6",
      indexTitle: "USE - Prod Darty",
      rowTitle: "hit.searchText",
      rowTag1: "hit.brandName",
      rowTag2: "hit.productMarketplace ? 'MktPlc' : 'Darty'"
   },
   {
      appId: "640GUGFBUQ",
      apiKey: "59660e134b3e949a726edb8ca7586456",
      indexName: "darty_prod_es6_minilm",
      indexTitle: "MiniLM - Config v2",
      rowTitle: "hit.searchText",
      rowTag1: "hit.brandName",
      rowTag2: "hit.productMarketplace ? 'MktPlc' : 'Darty'" 
   },
   {
      appId: "640GUGFBUQ",
      apiKey: "59660e134b3e949a726edb8ca7586456",
      indexName: "darty_prod_es6_USE_conf_v2",
      indexTitle: "USE - Config v2",
      rowTitle: "hit.searchText",
      rowTag1: "hit.brandName",
      rowTag2: "hit.productMarketplace ? 'MktPlc' : 'Darty'" 
   },
   {
      appId: "7IT45BYDCK",
      apiKey: "eea86e78cd97458cc170f5b92f9b3c86",
      indexName: "darty_prod_es6_old",
      indexTitle: "GTE Tiny - Config v1",
      rowTitle: "hit.searchText",
      rowTag1: "hit.brandName",
      rowTag2: "hit.productMarketplace ? 'MktPlc' : 'Darty'"
   },
   {
      appId: "7IT45BYDCK",
      apiKey: "eea86e78cd97458cc170f5b92f9b3c86",
      indexName: "darty_prod_es6_conf_v2",
      indexTitle: "GTE Tiny - Config v2",
      rowTitle: "hit.searchText",
      rowTag1: "hit.brandName",
      rowTag2: "hit.productMarketplace ? 'MktPlc' : 'Darty'"
   },
]};
export default appConfig;