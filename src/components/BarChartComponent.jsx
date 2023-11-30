import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';



const BarChartComponent = ({data}) => {
  const transformedData = Object.keys(data).map(key => ({
    name: key, 
    amount: data[key]
  }));
  return (<>
  <span className='text-semibold text-3xl text-center'>₹</span>
   <BarChart width={600} height={400} data={transformedData} >
      <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
      <XAxis dataKey="name" />
      <YAxis tick={false} />
      <Tooltip />
      <Bar dataKey="amount"  fill="#F0C3F1" barSize={40} />
    </BarChart>
  </>
   
  );
};

export default BarChartComponent;
