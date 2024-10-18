

using {com.satinfotech.cloudapps as ClKitchen} from '../db/schema';
using { API_PRODUCT_SRV as productapi } from './external/API_PRODUCT_SRV';


service CloudKitchen @(requires: 'authenticated-user') {
    entity Kitchen @(restrict: [ 
    { grant: ['READ'], to: 'CloudKitchenRead' },
    { grant: ['WRITE'], to: 'CloudKitchenWrite'},
    { grant: ['DELETE'], to: 'CloudKitchenDelete'},
  ]) as projection on ClKitchen.Kitchen

 
  entity Label           as projection on ClKitchen.Label;
    entity Products as projection on productapi.A_Product{
    Product,
    ProductType,
    BaseUnit,
    ProductGroup,
    to_Description,
    null as ProductDescription: String(80)
  }

 entity ProductDescription as projection on productapi.A_ProductDescription{
    Product,
    Language,
    ProductDescription
  }
    entity ProductLocal as projection on ClKitchen.ProductLocal actions{action viewForm( 
      unitValue:String,
      labelname:String
      @Common.ValueList: {
        CollectionPath: 'Label', 
        Label: 'Label',
        Parameters: [
          {
            $Type: 'Common.ValueListParameterInOut',
            LocalDataProperty: 'labelname',  
            ValueListProperty: 'Label'    
          }
        ]
      }
      
     
    ) returns String;
  } ;


}

annotate CloudKitchen.Kitchen with @odata.draft.enabled;
annotate CloudKitchen.ProductLocal with @odata.draft.enabled;

annotate CloudKitchen.Label with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: Label
    }
],

);