import "./StatCard.scss";

export default function StatCard({ number, label, icon }) {
  return (
    <div className="stat-card">
      <div className="card-icon-container">
        <img src={icon} alt="" className="card-icon" />
      </div>

      <div className="card-content">
        <span className="card-number">{number}</span>
        <span className="card-label">{label}</span>
      </div>
    </div>
  );
}