import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Table from './components//main_elements/Table'
import Modal from './components/main_elements/Modal'
import Form from './components/main_elements/Form'
import Loader from './components/main_elements/Loader'
import TopBar from './components/main_elements/TopBar'
import { FormContextData } from './components/context/FormContext';
import { getFormFields } from './components/helper_functions/getFormFields'
import { getTableColumns } from './components/helper_functions/getTableColumns'
import { config } from './front_lead_home_assignment'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [formElements, setFormElements] = useState([]) // Array of arrays ( each array is per page/route )
  const [tableData, setTableData] = useState([]) // Array of arrays ( each array is per page/route )
  const [tableColumns, setTableColumns] = useState([]) // Array of arrays ( each array is per page/route )
  const [routes, setRoutes] = useState([])
  const [baseUrl, setBaseUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  /* Prepare Routes, Table Columns, Table Data, Form Elements,  */
  useEffect(() => {
   let tableCols = []
   let formElement = []
   let dataTable = new Array(config?.navigation?.length).fill([])
   const { base_url } = config

   const routes = config?.navigation?.map(({title, route, table = {}, form = {}}, i) => {
      const { columns, data } = table
      const { fields } = form

      /* Table Data */
     if (typeof data === 'string') {
       setIsLoading(true)
       fetchData(data,i)
     }
     else if (Array.isArray(data)) {
       dataTable[i] = [...data]
     }
      /* Table Columns */
      tableCols[i] = getTableColumns(columns)

      /* Form Elements */
      formElement[i] = getFormFields(fields, i)

      return {
        name: title,
        to: route
      }
    })
    setFormElements(formElement)
    setTableColumns(tableCols)
    setTableData(dataTable)    
    setRoutes(routes)
    setBaseUrl(base_url)
  }, [])

  const fetchData = (query,index) => {
    /* Simulates a server request */
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve({
        active: true,
        app_secret: undefined,
        app_type: "unity",
        impressions: undefined,
        name: "Hello World",
        revenue: "9999",
      }), 2000);
    }).then((newData) => {
      setTableData((prevTableData) => {
        return prevTableData.map((data, i) => i === index ? [{ ...newData }] : data)
      })
      setIsLoading(false)
    });
    /* // GET request
       // can use Promise.allSettled()
    fetch(`${baseUrl}/${query}`)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json')
        const resData = isJson && await response.json();
        if (!response.ok) {
          const error = (resData && resData.message) || response.status;
          return Promise.reject(error);
        }
        setTableData((prevTableData) => {
          return prevTableData.map((data, i) => i === index ? [{ ...resData }] : data)
      })
      })
      .catch(error => {
        console.error('Fetch error in App component', error);
        setIsLoading(false)
      }); */
  }

  /* Find route index and update his data accordingly */
  const updateTableData = (formObj) => {
    const url = window.location.href
    const index = routes.findIndex(({to}) => url.includes(to))
    if(index >= 0) {
      const data = [...tableData]
      data[index] = [...tableData[index], formObj]
      setTableData(data)  
    }  
  }

  return (
    <Router>
      { !isLoading ?
          <nav className="container">
              <ul className='container nav nav-pills'>
            {
                routes?.map((route,i) => <TopBar key={i} {...route} />)
            }
            </ul>
            <Switch>
              {
                routes?.map(({to},i) => {
                  const formFields = formElements[i]
                  return (
                  <Route path={to} key={i}>
                    <div className="container">
                      <Table columns={tableColumns[i]} data={tableData[i]} />
                        <FormContextData.Provider value={{ formFields, updateTableData, baseUrl }}>
                        <Modal>
                          <Form/>
                        </Modal>
                      </FormContextData.Provider>
                    </div>
                  </Route>
                  )
                })
              }
            </Switch>
          </nav>
        : <Loader />}
    </Router>
  );
}

export default App;
