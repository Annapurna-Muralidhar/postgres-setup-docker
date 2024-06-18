

using {com.satinfotech.cloudapps as ClKitchen} from '../db/schema';



service CloudKitchen @(requires: 'authenticated-user') {
    entity Kitchen @(restrict: [ 
    { grant: ['READ'], to: 'CloudKitchenRead' },
    { grant: ['WRITE'], to: 'CloudKitchenWrite'},
    { grant: ['DELETE'], to: 'CloudKitchenDelete'},
  ]) as projection on ClKitchen.Kitchen


}

annotate CloudKitchen.Kitchen with @odata.draft.enabled;