'use client'

import React, { useRef, useState } from "react";
import "./element.css";
import { cross_icon } from "../assets/images/images";

const MultipleImageFileInput = ({
  elementName,
  elementLabel,
  elementId,
  elementValue,
  setElementValue,
  onChangeHandler,
}) => {
  const [dragIndex, setDragIndex] = useState(null);

  const onCrossIconClicked = (indexToRemove) => {
    const updatedImges = elementValue.filter(
      (_, index) => index !== indexToRemove
    );
    setElementValue(updatedImges);
  };

  const onDragStart = (index) => {
    setDragIndex(index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (dropIndex) => {
    if (dragIndex === null) return;
    const updatedImages = [...elementValue];
    const draggedItem = updatedImages.splice(dragIndex, 1)[0];
    updatedImages.splice(dropIndex, 0, draggedItem);
    setElementValue(updatedImages);
    setDragIndex(null);
  };

  return (
    <div className="file_input_main_container">
      <label className="element_input_label" htmlFor={elementId}>
        {elementLabel}
      </label>
      <div className="image-uploader">
        {/* First Image */}
        {elementValue.length > 0 && (
          <div className="first-image-row">
            <div className="draggable_image_container">
              <img
                src={elementValue[0].preview}
                alt="Main Preview"
                className="main-image"
                draggable
                onDragStart={() => onDragStart(0)}
                onDragOver={onDragOver}
                onDrop={() => onDrop(0)}
              />

              <div
                className="image_cross_icon"
                onClick={() => onCrossIconClicked(0)}
              >
                <img src={cross_icon} alt="cross_icon_ml_0"></img>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Images */}
        <div className="other-images-grid">
          {elementValue.slice(1).map((img, index) => (
            <div className="draggable_image_container">
              <img
                key={index + 1}
                src={img.preview}
                alt={`Preview ${index + 1}`}
                className="other-image"
                draggable
                onDragStart={() => onDragStart(index + 1)} // +1 because we sliced
                onDragOver={onDragOver}
                onDrop={() => onDrop(index + 1)} // +1 to match full array index
              />

              <div
                className="image_cross_icon"
                onClick={() => onCrossIconClicked(index + 1)}
              >
                <img src={cross_icon} alt={`cross_icon_ml_${index}`}></img>
              </div>
            </div>
          ))}

          {/* "+" Icon to add more images */}
          <label className="add-btn" htmlFor="fileInput">
            +
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden-input"
            multiple
            accept="image/*"
            onChange={onChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default MultipleImageFileInput;
