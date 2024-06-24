namespace com.satinfotech.cloudapps;
using {managed,cuid} from '@sap/cds/common';


entity Kitchen : managed,cuid {
    name : String(20);
    addr1:String(40);
    addr2:String(40);
    city:String(20);
    state:String(20);
    pincode:String(6);
    phone:String(10);

    
}

entity ProductLocal: managed {
    key Product: String(40);
    ProductType: String(4);
    BaseUnit: String(3);
    ProductGroup: String(18);
    ProductDescription: String(40);
}