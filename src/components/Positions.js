 import React, { useState, useEffect } from "react";
import api from '../services/api'; 

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [error, setError] = useState('');  

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await api.get("/allPositions");
        setAllPositions(response.data);
      } catch (err) {
         
        console.error("Failed to fetch positions:", err);
        setError("Could not load positions data. You may need to log in again.");
      }
    };

    fetchPositions();
  }, []);  

  
  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>ERROR: {error}</div>;
  }

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;