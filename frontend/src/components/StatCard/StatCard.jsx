import "./StatCard.scss";

export default function StatCard({ number, label, icon, onClick }) {
  return (
    <button className="stat-card" type="button" onClick={onClick}>
      <div className="card-icon-container">
        <img src={icon} alt="" className="card-icon" />
      </div>

      <div className="card-content">
        <span className="card-number">{number}</span>
        <span className="card-label">{label}</span>
      </div>
    </button>
  );
}
