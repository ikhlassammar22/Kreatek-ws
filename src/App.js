import "./App.css";
import { useState } from "react";

import { products } from "./dataproducts";

function App() {
  const [credit, setCredit] = useState(200);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const funaddCart = (prod) => {
    if (prod.giftOption && credit >= prod.giftPrice) {
      setCredit(credit - prod.giftPrice);
      setSelectedProducts([
        ...selectedProducts,
        { ...prod, Price: prod.giftPrice },
      ]);
    } else if (!prod.giftOption && credit >= prod.Price) {
      setCredit(credit - prod.Price);
      setSelectedProducts([
        ...selectedProducts,
        { ...prod, Price: prod.Price },
      ]);
    } else if (!prod.giftOption && credit < prod.Price) {
      setCredit(0);
      setSelectedProducts([...selectedProducts, { ...prod, Price: credit }]);
      setSelectedProducts([
        ...selectedProducts,
        { ...prod, price: prod.Price - credit, quantity: 1 },
      ]);
    }
  };

  return (
    <div className="App">
      <h1> Product Panel</h1>
      <p>Available Credit = {credit}Dt</p>
      <div className="plist ">
        {products.map((prod) => (
          <div key={prod.ProductID} className="product">
            <h1>Product Name :{prod.Name} </h1>
            <p> Product price : {prod.Price}Dt </p>
            <p>Quantity Available :{prod.QuantityAvailable}</p>

            <button onClick={() => funaddCart(prod)}> I buy</button>
          </div>
        ))}
      </div>
      <h3>Selected Products:</h3>
      <div className="select-products">
        {selectedProducts.map((p, index) => (
          <p key={index}>
            {p.Name} - {p.Price}Dt
          </p>
        ))}
      </div>
      <p>=Credit Balance Remaining = {credit}Dt</p>
    </div>
  );
}

export default App;
