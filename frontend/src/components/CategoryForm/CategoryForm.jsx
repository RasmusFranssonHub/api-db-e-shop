import { useMemo, useState } from "react";
import "./CategoryForm.scss";

const iconModules = import.meta.glob("../../assets/icons/category-icons/*.svg", {
  eager: true,
  import: "default",
  query: "?url",
});

const categoryIcons = Object.entries(iconModules).map(([path, source]) => ({
  id: path.split("/").pop(),
  source,
  name: path.split("/").pop().replace(".svg", "").replaceAll("-", " "),
}));

const iconIdFromValue = (icon) => (icon ?? "").split("/").pop().split("?")[0];

export default function CategoryForm({ existingNames, onClose, onCreate, category, onUpdate, onDelete }) {
  const isEditing = Boolean(category);
  const [name, setName] = useState(category?.name ?? "");
  const [selectedIcon, setSelectedIcon] = useState(iconIdFromValue(category?.icon));
  const [errors, setErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const normalizedNames = useMemo(
    () => existingNames.map((categoryName) => categoryName.trim().toLocaleLowerCase()),
    [existingNames]
  );

  const submitCategory = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const nextErrors = {};
    const isDuplicate = normalizedNames.includes(trimmedName.toLocaleLowerCase())
      && trimmedName.toLocaleLowerCase() !== (category?.name ?? "").trim().toLocaleLowerCase();

    if (!trimmedName) nextErrors.name = "Ange ett kategorinamn.";
    else if (isDuplicate) nextErrors.name = "Kategorin finns redan.";
    if (!selectedIcon) nextErrors.icon = "Välj en ikon för kategorin.";

    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSaving(true);
      if (isEditing) await onUpdate({ ...category, name: trimmedName, icon: selectedIcon });
      else await onCreate({ name: trimmedName, icon: selectedIcon });
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Kategorin kunde inte sparas. Försök igen.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="category-form-overlay" role="presentation">
      <form className="category-form" onSubmit={submitCategory} noValidate>
        <header className="category-form-header">
          <h2>{isEditing ? "Redigera kategori" : "Lägg till kategori"}</h2>
          <button type="button" className="category-close-button" onClick={onClose} aria-label="Stäng formuläret">×</button>
        </header>

        <div className="category-form-body">
          {(Object.keys(errors).length > 0 || submitError) && <p className="category-error-summary" role="alert">{submitError || "Fyll i ett namn och välj en ikon."}</p>}

          <div className="category-name-field">
            <label htmlFor="category-name">Kategorinamn</label>
            <input id="category-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Till exempel Jackor" aria-invalid={Boolean(errors.name)} autoFocus />
            {errors.name && <span className="category-field-error">{errors.name}</span>}
          </div>

          <fieldset className={`icon-picker ${errors.icon ? "has-error" : ""}`}>
            <legend>Välj ikon</legend>
            <div className="icon-picker-grid">
              {categoryIcons.map((icon) => (
                <button
                  type="button"
                  className={`icon-option ${selectedIcon === icon.id ? "is-selected" : ""}`}
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon.id)}
                  aria-label={`Välj ikon: ${icon.name}`}
                  aria-pressed={selectedIcon === icon.id}
                >
                  <img src={icon.source} alt="" />
                </button>
              ))}
            </div>
            {errors.icon && <span className="category-field-error">{errors.icon}</span>}
          </fieldset>
        </div>

        {isEditing && confirmDelete && <div className="category-delete-confirm"><strong>Ta bort {category.name}?</strong><span>Det går inte att ångra.</span><div><button type="button" onClick={() => setConfirmDelete(false)}>Behåll</button><button type="button" onClick={() => { onDelete(category.id); onClose(); }}>Ta bort</button></div></div>}

        <footer className="category-form-actions">
          {isEditing && <button type="button" className="category-delete-button" onClick={() => setConfirmDelete(true)}>Ta bort kategori</button>}
          <button type="button" className="category-cancel-button" onClick={onClose}>Avbryt</button>
          <button type="submit" className="category-submit-button" disabled={isSaving}>{isSaving ? "Sparar..." : isEditing ? "Spara ändringar" : "Lägg till kategori"}</button>
        </footer>
      </form>
    </div>
  );
}
