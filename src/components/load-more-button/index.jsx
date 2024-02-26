import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function LoadMoreButton({ url }) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `${url}?skip=${count === 0 ? 0 : count * 20}`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prev) =>
          count === 0 ? [...result.products] : [...prev, ...result.products]
        );
        setLoading(false);
      }
    } catch (error) {
      setErrors(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  if (loading) {
    return <p>Please wait a few seconds !</p>;
  }

  if (errors !== null) {
    return <p style={{ color: "#E74C3C" }}>{errors}</p>;
  }

  console.log(products.length);

  return (
    <div className="main-container">
      <div className="container">
        {products && products.length
          ? products.map((product) => (
              <div className="product-container" key={product.id}>
                <img src={product.thumbnail} alt={product.item} />
                <h3>{product.title}</h3>
              </div>
            ))
          : null}
      </div>
      <button
        className={`btn ${products.length < 100 ? "" : "inactive"}`}
        disabled={products.length < 100 ? false : true}
        onClick={() => setCount(count + 1)}
      >
        Load More Products
      </button>
      {products.length < 100 ? (
        ""
      ) : (
        <p style={{ color: "#E74C3C" }}>No more data to fetch.</p>
      )}
    </div>
  );
}
