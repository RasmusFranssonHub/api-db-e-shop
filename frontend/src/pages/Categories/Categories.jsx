import './Categories.scss';
import plusIcon from "../../assets/icons/noun-plus.svg";

export default function Categories() {
  return (
    <div className="categories">
      <section className="categories-header">
        <div className="categories-header-text">
          <h1>Kategorier</h1>
          <p>Här kan du hantera alla produktkategorier.</p>
        </div>

        <button className="add-category-button">
          <img src={plusIcon} alt="Add Category" />
          Lägg till kategori
        </button>
      </section>

      <section className="categories-content">
        <h2>Alla kategorier</h2>
      </section>

    </div>
  );
}