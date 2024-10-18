const cds = require('@sap/cds');
const json2xml = require('json2xml');
const axios = require('axios');
module.exports = cds.service.impl(async function(){
    const productapi = await cds.connect.to('API_PRODUCT_SRV');
    
 
    this.on('READ','Products', async req => {
        
        req.query.SELECT.columns = [{ref:['Product']},{ref:['ProductType']},{ref:['ProductGroup']},{ref:['BaseUnit']},{ref:['to_Description'],expand:['*']}]
        let res = await productapi.run(req.query);  

        res.forEach((element) => {
            //console.log(element.to_Description);
            element.to_Description.forEach((item) => {
                if (item.Language='EN'){
                    element.ProductDescription=item.ProductDescription; 
                }
            })
        });
        
        //console.log(res);
        return res;
    });

    this.before('READ','ProductLocal', async req => {
        //console.log(this.entities);
        const {Products, ProductLocal} = this.entities;
        console.log("Fired Read");
        qry = SELECT.from(Products).columns([{ref:['Product']},{ref:['ProductType']},{ref:['ProductGroup']},{ref:['BaseUnit']},{ref:['to_Description'],expand:['*']}]).limit(10000);
        let res = await productapi.run(qry);
        
        res.forEach((element) => {
            //console.log(element.to_Description);
            element.to_Description.forEach((item) => {
                if (item.Language='EN'){
                    element.ProductDescription=item.ProductDescription; 
                }
            });
            delete(element.to_Description);
        });
        insqry = UPSERT.into(ProductLocal).entries(res);
        await cds.run(insqry);        
    } )


    this.before('UPDATE','ProductLocal', async req => {
        const {Products, ProductLocal, ProductDescription} = this.entities;
        console.log(req.data);
        console.log("Fired Update");
       
        //delete(req.data.ProductDescription);
        console.log(req.data);
        updqry = UPDATE(ProductDescription).data({"ProductDescription":req.data.ProductDescription}).where({Product: req.data.Product, Language: 'EN'})
        await productapi.run(updqry);
    });

    this.before('CREATE','ProductLocal', async req => {
        const {Products, ProductLocal, ProductDescription} = this.entities;
       
        insqry = INSERT.into(Products).entries({
            "Product": req.data.Product,
            "ProductType": req.data.ProductType,
            "BaseUnit": req.data.BaseUnit,
            "to_Description": [
                {
                    "Product": req.data.Product,
                    "Language": "EN",
                    "ProductDescription": req.data.ProductDescription
                }
            ]
        }
        
        )
        await productapi.run(insqry);
    });
    



    const {ProductLocal,Label}=this.entities
    this.on('viewForm','ProductLocal', async (req) => {
        console.log(req.params);
        console.log(req.data);
        
        const { Product } = req.params[0]; 


        const rowData = await SELECT.one.from(ProductLocal).where({ Product: Product });
        
        

        if (!rowData) {
            return req.error(404, `No data found for ID: ${Product}`);
        }
        rowData.unitValue=req.data.unitValue
        let labelname=req.data.labelname
        console.log("Row data:", rowData);
        console.log("labelname:", rowData);



        const convertRowDataToXML = (rowData) => {
   
            const xmlData = json2xml({ ProductLocal: rowData }, { header: true });
            return xmlData;
        };
        
        const xmlData = convertRowDataToXML(rowData);
        console.log("Generated XML:", xmlData);
        const base64EncodedXML = Buffer.from(xmlData).toString('base64');

        console.log("Base64 Encoded XML:", base64EncodedXML);
        try {
          const authResponse = await axios.get('https://runsimple.authentication.us10.hana.ondemand.com/oauth/token', {
              params: {
                  grant_type: 'client_credentials'
              },
              auth: {
                  username: 'sb-0659fb15-d82d-43fc-9a1a-4ff294ffade6!b33406|ads-xsappname!b65488',
                  password: 'cad88edf-9d4c-4a29-8301-7d89403c35df$xJJn5FeYQgciuMINbDMk86-7AHxHgl2p6n6nijoaCqA='
              }
          });
          const accessToken = authResponse.data.access_token;
          console.log("Access Token:", accessToken);
          const pdfResponse = await axios.post('https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName', {
              xdpTemplate: labelname,
              xmlData: base64EncodedXML, 
              formType: "print",
              formLocale: "",
              taggedPdf: 1,
              embedFont: 0
          }, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
              }
          });
          const fileContent = pdfResponse.data.fileContent;
          console.log("File Content:", fileContent);
          return fileContent;

      } catch (error) {
          console.error("Error occurred:", error);
          return req.error(500, "An error occurred while processing your request.");
      }
        

       
    });

    this.on('READ',Label,async(req)=>{
        let Label=[
            {"Label":"hemanth/Default"},
            {"Label":"sumanth/Default"},
            {"Label":"annapurna/Default"},
        ]
        Label.$count=Label.length
        return Label;
    })







   
})