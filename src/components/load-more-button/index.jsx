import { useState } from "react";
import { useEffect } from "react";
import "./styles.css";

export default function LoadMoreButton({ url, skip = 10 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch(`${url}?skip=${skip}`);
      const products = await res.json();
      setTimeout(() => {
        setProducts(products);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setErrors(error.message);
        setLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    fetchProducts(url);
  }, [url]);

  if (loading) {
    return <p>Please wait! This not take more than a few seconds</p>;
  }

  if (errors !== null) {
    return <p style={{ color: "#E74C3C" }}>{errors}</p>;
  }

  console.log(products);
  return (
    <div className="container">
      {products &&
        products.length &&
        products.map((product) => (
          <div className="product-container" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>
              {product.title.length > 26
                ? product.title.slice(0, 26)
                : product.title}
            </h3>
          </div>
        ))}
    </div>
  );
}
