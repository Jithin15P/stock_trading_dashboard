 import React, { useState, useEffect } from "react";
import api from '../services/api';
import { VerticalGraph } from "./VerticalGraph";  

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await api.get("/allHoldings");
        setAllHoldings(response.data);
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
        setError("Could not load holdings data. Please try again.");
      }
    };
    fetchHoldings();
  }, []);

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>ERROR: {error}</div>;
  }

 

   
  const labels = allHoldings.map((holding) => holding.name);

  
  const data = {
    labels,  
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      <div className="order-table">
     
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
       
      </div>
      
       
      <VerticalGraph data={data}></VerticalGraph>
    </>
  );
};

export default Holdings;