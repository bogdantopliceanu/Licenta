import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./DestinationForm.scss";

const DestinationForm = ({
  destination,
  destinationImage,
  imagePreview,
  things_to_do,
  setThings_to_do,
  description,
  setDescription,
  country,
  handleInputChange,
  handleImageChange,
  handleCountryChange,
  saveDestination,
}) => {
  return (
    <div className="add-destination">
      <Card cardClass={"card"}>
        <form onSubmit={saveDestination}>
          <Card cardClass={"group"}>
            <label>Destination Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="destination" />
              </div>
            ) : (
              <p>No image set for this destination.</p>
            )}
          </Card>
          <label>Destination Name:</label>
          <input
            type="text"
            placeholder="Destination name"
            name="name"
            value={destination?.name}
            onChange={handleInputChange}
          />

          <label>Country:</label>
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={handleCountryChange}
          />

          <label>Destination things to do:</label>
          <ReactQuill
            theme="snow"
            value={things_to_do}
            onChange={setThings_to_do}
            modules={DestinationForm.modules}
            formats={DestinationForm.formats}
          />

          <label>Destination Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={DestinationForm.modules}
            formats={DestinationForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Destination
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};




DestinationForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
DestinationForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default DestinationForm;
