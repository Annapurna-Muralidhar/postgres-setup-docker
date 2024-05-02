using { CloudKitchen.Kitchen } from './cloudkitchen';
annotate Kitchen with @(

     UI.LineItem           : [
        {
            Label: 'name',
            Value: name
        },
        {
            Label: 'address 1',
            Value: addr1
        },
        {
            Label: 'address 2',
            Value: addr2
        },
        {
            Label: 'City',
            Value: city
        },
        {
            Label: 'State',
            Value: state
        },
        {
            Label: 'Pincode',
            Value: pincode
        },
        {
            Label: 'phone',
            Value: phone
        },
    ],
    UI.FieldGroup #kitchen: {
        $Type: 'UI.FieldGroupType',
        Data : [
        {
            Label: 'name',
            Value: name
        },
        {
            Label: 'address 1',
            Value: addr1
        },
        {
            Label: 'address 2',
            Value: addr2
        },
        {
            Label: 'City',
            Value: city
        },
        {
            Label: 'State',
            Value: state
        },
        {
            Label: 'Pincode',
            Value: pincode
        },
        {
            Label: 'phone',
            Value: phone
        },
        ],
    },
    UI.Facets             : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'kitchenFacet',
        Label : 'kitchen facets',
        Target: '@UI.FieldGroup#kitchen'
    }, ]

);

