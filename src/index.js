// Requiring the module

const reader = require('xlsx');
const module_consulta = require('./consulta_cpf');
  
// Reading our test file
const file = reader.readFile('../input/cpfs.xlsx');
  


  
async function read() {
   
    myPromise = new Promise(function(myResolve, myReject) {
      let write_list = [];
      // "Producing Code" (May take some time)
      
      let data = []
      const sheets = file.SheetNames
     
   for(let i = 0; i < sheets.length; i++)
   {
      const temp = reader.utils.sheet_to_json(
           file.Sheets[file.SheetNames[i]])
      temp.forEach(async (res,index) => {
       let info = res['CPF/CNPJ'];
       let json = await module_consulta.consultaCpf(info);
       console.log(json);
      write_list.push(json);
      console.log(temp.length,write_list.length)
      if((temp.length == write_list.length)){
         console.log("ultimo");
         console.log(temp.length,write_list.length)
          myResolve(write_list);
      }
      })
    
   }
   
      });
    
  return myPromise;
}

async function write(write_List) {
   console.log('escrevendooooo');
   const file = reader.readFile('../output/output.xlsx')
  
   // Sample data set
   
     
   const ws = reader.utils.json_to_sheet(write_List)
     
   reader.utils.book_append_sheet(file,ws,"Consulta")
     
   // Writing to our file
   reader.writeFile(file,'../output/output.xlsx')
  
}
read().then((write_list) => write(write_list));



