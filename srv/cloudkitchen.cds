using {com.satinfotech.cloudapps as ClKitchen} from '../db/schema';

service CloudKitchen {
    entity Kitchen as projection on ClKitchen.Kitchen;   

}
annotate CloudKitchen.Kitchen with  @odata.draft.enabled ;
