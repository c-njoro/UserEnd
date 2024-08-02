import Link from "next/link";

export default function Home({ products }: any) {
  return (
    <div className="main-home">
      <div className="welcome">
        <div className="catch">
          <h1>
            Unlock Exclusive Tech Deals And Elevate Your Shopping Experience{" "}
          </h1>
          <p className="topper">Get our exclusive deals now and save.</p>
          <Link href="/product" className="link">
            Shop Now
          </Link>
        </div>
        <div className="image">
          <img src="/images/intro.png" alt="shopping image" />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
