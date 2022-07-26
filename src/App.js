import {useState} from 'react'
import {Data} from './Components/Data'
import * as XLSX from 'xlsx'

function App() {
   
//const initial=excelData


  // on change states
  
  const [excelArchivo, setExcelArchivo]=useState(null);
  const [excelArchivoError, setExcelArchivoError]=useState(null);  
 
  // submit
  const [value, setValue]=useState();
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects

  // handle File
  const tipoArchivo=['application/vnd.ms-excel'];

  



  const handleFile = (e)=>{
    let seleccionarArchivo = e.target.files[0];
    if(seleccionarArchivo){
      // console.log(selectedFile.type);
      


      if(seleccionarArchivo&&tipoArchivo.includes(seleccionarArchivo.type)){
        let leer = new FileReader();
        leer.readAsArrayBuffer(seleccionarArchivo);
        leer.onload=(e)=>{
          setExcelArchivoError(null);
          setExcelArchivo(e.target.result);
          
        } 
      }
      else{
        setExcelArchivoError('por favor seleccione un archivo xls');
        setExcelArchivo(null);
      }
    }
    else{
      console.log('por favor seleccione su archivo');
    }
  }


  


 
 








  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelArchivo!==null){
      const workbook = XLSX.read(excelArchivo,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      
      const suma =  data.filter(valor=>valor.Equipo==="Racing")   .map(item => item.Edad).reduce((prev, curr) => prev + curr, 0);
      console.log(suma);
      setValue(suma)


      




    }
    else{
      setExcelData(null);
    }
  }
  
  





  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"onSubmit={handleSubmit}>
        
          <label><h5>Subir Archivo Ecxel</h5></label>
          <br></br>

          <input type='file' className='form-control'onChange={handleFile} required></input>
                            
          {excelArchivoError&&<div className='text-danger' style={{marginTop:5+'px'}}>{excelArchivoError}</div>}
         
          <button type='submit' className='btn btn-success'style={{marginTop:5+'px'}}>Cargar</button>
          
        </form>

        
      </div>                               

      <br></br>
      <hr></hr>  



      {/* view file section */}
      <h5>Ver archivo de excel</h5>
      <div className='viewer'>
        {excelData===null&&<>No selecciono ningun archivo</>}
        {excelData!==null&&(

          
          <div className='table-responsive'>
            <table className='table'>
            <p>total de registro: ({excelData.filter(valor=>valor.Equipo).length})</p>
            <p>Promedio de edad de los inchas de Racing: ({ (value / (excelData.filter(valor=>valor.Equipo==="Racing").length)).toFixed(2)})</p>
           
            
           
           
              <thead>
                <tr>
                  <th scope='col'>Nombre</th>
                  <th scope='col'>Edad</th>
                  <th scope='col'>Equipo</th>
                  <th scope='col'>Estado Civil</th>
                  
                                    
                </tr>
              </thead>
              <tbody>

                 
               
               <Data excelData={excelData}/>

               
               
              </tbody>

              
            </table>            
          </div>
        )}       
      </div>

    </div>
  );
}

export default App;