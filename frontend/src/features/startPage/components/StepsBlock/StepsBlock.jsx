import './StepsBlock.css';

export default function StepsBlock(){
    const steps = [
    {
      id: 1,
      title: "Create a wishlist",
      description: "Click Create Wishlist, add a name and description, choose privacy level: private, link-access, or public.",
      status: 'number'
    },
    {
      id: 2,
      title: "Add wishes",
      description: "Paste a link from any store — we'll automatically pull the photo and price. Or add manually with your own photo.",
      status: 'number'
    },
    {
      id: 3,
      title: "Share with loved ones",
      description: "Copy the link or send an email invitation — plan gifts together with others.",
      status: 'check'
    }
  ];

  return (
    <section className="steps-container" id="learnsteps">
      <div className="steps-header">
        <h2>How to create a wishlist on Wishpicks</h2>
        <p>Create wishlists, add items from any store, and share them with your inner circle.</p>
      </div>

      <div className="steps-content">
        <div className="steps-list">
          {steps.map((step) => (
            <div key={step.id} className="step-item">
              <div className={`step-icon ${step.status === 'check' ? 'active' : ''}`}>
                {step.status === 'check' ? '✓' : step.id}
              </div>
              <div className="step-text">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="steps-footer">
        <button className="btn-primary">Create wishlist</button>
      </div>
    </section>
  );
}