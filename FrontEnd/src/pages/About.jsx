const About = () => {
  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">About AURA Shop</h1>

      <div className="space-y-6 prose prose-sm max-w-none">
        <section className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            AURA Shop is a modern e-commerce platform dedicated to bringing premium products to
            customers worldwide. Founded with a mission to make online shopping seamless, secure,
            and enjoyable, we've built a comprehensive marketplace for various product categories.
          </p>
        </section>

        <section className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To revolutionize online shopping by providing a curated selection of high-quality
            products, exceptional customer service, and a user-friendly experience that makes
            shopping enjoyable for everyone.
          </p>
        </section>

        <section className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Wide variety of products from trusted sellers</li>
            <li>Secure payment and checkout process</li>
            <li>Fast and reliable delivery</li>
            <li>Responsive customer support team</li>
            <li>Easy returns and exchanges</li>
            <li>Regular deals and special offers</li>
          </ul>
        </section>

        <section className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Email:</strong> support@aurashop.com
            </p>
            <p>
              <strong>Phone:</strong> +91-1800-AURA-SHOP
            </p>
            <p>
              <strong>Address:</strong> AURA Shop HQ, Tech Park, City, State
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
