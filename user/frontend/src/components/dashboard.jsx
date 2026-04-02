import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [records,setRecords] = useState([]);
  const [recordCount,setRecordCount] = useState(0);
  const navigate  = useNavigate();
  useEffect(()=>{
      const fetchAllRecords = async () => {
      try {
             const {data} = await axios.get('http://localhost:5000/records/fetchAll');
             setRecords(data.data);
             setRecordCount(data.data.length);

      } catch (error) {
             console.log(error);
      }
    }
    fetchAllRecords();
  },[]);
  
  const handleSubmit = async (id) => {
      
      try {
            const {data} = await axios.post('http://localhost:5000/records/fetchSpecific',{id:id});
            if(data.success){
                  
                  navigate(`/record/${id}`);

            }
      } 
      catch (error) {
            console.log(error);
      } 

  }
  return (
    <>
      <div className="min-h-screen text-gray-800 flex flex-col" style={{backgroundImage:"url(https://images.nationalgeographic.org/image/upload/v1638892233/EducationHub/photos/crops-growing-in-thailand.jpg)"}}>
        <header className="sticky top-0 z-30 bg-yellow-400 shadow-sm rounded-b-full">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight">SmartCrop</h1>
                <p className="text-sm text-gray-500">MSP & Insurance Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="w-full px-6 py-8 flex-1">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-600">
              <h2 className="text-xs font-medium text-blue-600 uppercase">Total Records</h2>
              <p className="mt-3 text-3xl font-semibold text-blue-900">{recordCount}</p>
              <p className="text-sm text-gray-500 mt-1">Records collected</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border-l-4 border-amber-500">
              <h2 className="text-xs font-medium text-amber-600 uppercase">Majority Crop Status</h2>
              <p className="mt-3 text-3xl font-semibold text-amber-900">Fair</p>
              <p className="text-sm text-gray-500 mt-1">63%</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border-l-4 border-green-600">
              <h2 className="text-xs font-medium text-green-600 uppercase">System Health</h2>
              <p className="mt-3 text-3xl font-semibold text-green-900">Online</p>
              <p className="text-sm text-gray-500 mt-1">All systems nominal</p>
            </div>
          </section>

          <section className="mt-20">
            

            <div className="mt-2 overflow-x-auto">
              <div className="min-w-full align-middle inline-block shadow-sm overflow-hidden rounded-lg border border-gray-200 bg-white">
                <table className="min-w-full table-auto text-sm" role="table" aria-label="Records table">
                  <caption className="sr-only">Recent crop records</caption>
                  <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '30%' }} />
                  </colgroup>

                  <thead className="bg-slate-700">
                    <tr className="text-left text-xs font-semibold text-white">
                      <th className="px-4 py-3 border-b border-gray-200 sticky top-0">Record ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 sticky top-0">Date</th>
                      <th className="px-4 py-3 border-b border-gray-200 sticky top-0">Status</th>
                      <th className="px-4 py-3 border-b border-gray-200 sticky top-0">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {records.map((record) => (
                        <tr className="hover:bg-slate-50 even:bg-gray-50" key={record._id}>
                      <td className="px-4 py-4 font-medium text-gray-900 border-r border-gray-100 bg-slate-50">{record._id}</td>
                      <td className="px-4 py-4 text-gray-600 border-r border-gray-100 bg-white">{record.time}</td>
                      <td className="px-4 py-4 bg-white">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 ring-1 ring-green-200">Healthy</span>
                      </td>
                      <td className="px-4 py-4 bg-white">
                        <div className="flex items-center space-x-2">
                          <button type="button" className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" onClick={() => handleSubmit(record._id)}>View</button>
                        </div>
                      </td>
                         </tr>
                    ))}
                    

                    
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}


export default Dashboard; 