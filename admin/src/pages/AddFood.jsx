import React, { useState, useRef } from "react";
import useFoodUpload from "../store/useFoodupload";
import "../styles/add-food.style.css";

const AddFood = () => {
	const {
		images,
		formData,
		isSubmitting,
		setFormField,
		addImages,
		removeImage,
		resetForm,
		submitFoodItem
	} = useFoodUpload();
	const msgRef = useRef(null);
	const [isDragActive, setIsDragActive] = useState(false);

	const showMsg = (msg, type) => {
		if (type) {
			if (msgRef.current.classList.contains("error-message")) {
				msgRef.current.classList.remove("error-message");
			}
			msgRef.current.classList.add("success-message");
			msgRef.current.textContent = msg;
		} else {
			if (msgRef.current.classList.contains("success-message")) {
				msgRef.current.classList.remove("success-message");
			}
			msgRef.current.classList.add("error-message");
			msgRef.current.textContent = msg;
		}
		window.scrollTo({
			top: "0",
			behavior: "smooth"
		});
		setTimeout(() => {
			msgRef.current.removeAttribute("class");
			msgRef.current.textContent = "";
		}, 2000);
	};

	// Helper function to process file validation and conversion to Base64
	const handleFiles = (files) => {
		const validFiles = Array.from(files).filter((file) => {
			const isValidType = [
				"image/png",
				"image/jpeg",
				"image/jpg",
				"image/webp"
			].includes(file.type);
			const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
			if (!isValidType) {
				showMsg(
					`${file.name} must be a PNG, JPG, or WEBP image.`,
					false
				);
				return;
			}
			if (!isValidSize) {
				showMsg(
					`${file.name} exceeds the maximum 5MB size limit.`,
					false
				);
				return;
			}
			return isValidType && isValidSize;
		});
		if (validFiles.length === 0) return;

		const base64Promises = validFiles.map((file) => {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result);
				reader.readAsDataURL(file);
			});
		});
		Promise.all(base64Promises).then((base64Strings) => {
			addImages(base64Strings, showMsg);
		});
	};
	// Drag and Drop Event Listeners
	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setIsDragActive(true);
		} else if (e.type === "dragleave") {
			setIsDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files);
		}
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			handleFiles(e.target.files);
		}
	};

	return (
		<div className='main-content'>
			<div id='addm--food' className='container'>
				<div className='form-container'>
					<div className='form-header'>
						<h2>Add New Food Item</h2>
						<p
							style={{
								marginTop: "6px",
								opacity: "0.9",
								fontSize: "15px",
								textAlign: "center"
							}}>
							Fill details for the new menu item
						</p>
						<p ref={msgRef}></p>
					</div>
					<div className='form-body'>
						<form
							id='foodForm'
							onSubmit={(e) => {
								submitFoodItem(e, showMsg);
							}}>
							<div className='form-group'>
								<label>
									Food Image
									<span style={{ color: "#ef4444" }}>*</span>
									{images.length > 0 &&
										` (${images.length}/6)`}
								</label>
								<div
									id='dropZone'
									className={`upload-area ${isDragActive ? "drag-active" : ""}`}
									onDragEnter={handleDrag}
									onDragOver={handleDrag}
									onDragLeave={handleDrag}
									onDrop={handleDrop}>
									{/* Show dropzone prompt if images are fewer than 6 */}
									{images.length < 6 && (
										<div id='uploadContent'>
											<i
												className='fa-solid fa-cloud-arrow-up'
												style={{
													fontSize: "48px",
													color: "#9ca3af",
													marginBottom: "16px"
												}}></i>
											<p
												style={{
													fontSize: "17px",
													color: "#4b5563",
													fontWeight: "500"
												}}>
												Drag & drop image here
											</p>
											<p
												style={{
													color: "#6b7280",
													margin: "8px 0"
												}}>
												or
											</p>
											<label
												className='btn'
												style={{
													background: "white",
													color: "#00629a",
													border: "1px solid #00629a",
													display: "inline-flex",
													padding: "12px 28px",
													fontSize: "15px",
													cursor: "pointer"
												}}>
												Browse Files
												<input
													type='file'
													id='foodImage'
													accept='image/*'
													multiple
													onChange={handleFileChange}
													style={{ display: "none" }}
												/>
											</label>
											<p
												style={{
													fontSize: "13px",
													color: "#9ca3af",
													marginTop: "16px"
												}}>
												PNG, JPG, WEBP (Max 5MB)
											</p>
										</div>
									)}
									{/* Preview individual items dynamic loop mapping */}
									{images.length > 0 && (
										<div
											id='imagePreview'
											className='preview-container'>
											{images.map((base64Str, index) => (
												<div
													className='img-item'
													key={index}>
													<button
														onClick={() =>
															removeImage(index)
														}
														title='Remove Image'
														id='remove-img-item'>
														x
													</button>
													<img
														id={`previewImg-${index}`}
														className='preview-image'
														src={base64Str}
														alt={`Preview ${index + 1}`}
													/>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div className='row'>
								<div className='col form-group'>
									<label>
										Food Name
										<span style={{ color: "#ef4444" }}>
											*
										</span>
									</label>
									<input
										type='text'
										id='foodName'
										placeholder='e.g. Chicken Biryani'
										value={formData.foodName}
										onChange={(e) =>
											setFormField(
												"foodName",
												e.target.value
											)
										}
									/>
								</div>
								<div className='col form-group'>
									<label>
										Price (BDT)
										<span style={{ color: "#ef4444" }}>
											*
										</span>
									</label>
									<div className='price-input'>
										<input
											type='number'
											id='price'
											placeholder='0'
											value={formData.price}
											onChange={(e) =>
												setFormField(
													"price",
													e.target.value
												)
											}
										/>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col form-group'>
									<label>
										Category
										<span style={{ color: "#ef4444" }}>
											*
										</span>
									</label>
									<select
										id='category'
										value={formData.category}
										onChange={(e) =>
											setFormField(
												"category",
												e.target.value
											)
										}>
										<option value=''>
											Select Category
										</option>
										<option value='appetizer'>
											Appetizer
										</option>
										<option value='main'>
											Main Course
										</option>
										<option value='dessert'>Dessert</option>
										<option value='beverage'>
											Beverage
										</option>
										<option value='side'>Side Dish</option>
									</select>
								</div>
								<div className='col form-group'>
									<label>Prep Time (minutes)</label>
									<input
										type='number'
										id='prepTime'
										placeholder='25'
										value={formData.prepTime}
										onChange={(e) =>
											setFormField(
												"prepTime",
												e.target.value
											)
										}
									/>
								</div>
							</div>
							<div className='form-group'>
								<label>
									Description
									<span style={{ color: "#ef4444" }}>*</span>
								</label>
								<textarea
									id='description'
									rows='4'
									placeholder='Describe the dish...'
									value={formData.description}
									onChange={(e) =>
										setFormField(
											"description",
											e.target.value
										)
									}></textarea>
							</div>
							<div className='form-group'>
								<label>Ingredients</label>
								<textarea
									id='ingredients'
									rows='3'
									placeholder='Chicken, Rice, Onion, Spices...'
									value={formData.ingredients}
									onChange={(e) =>
										setFormField(
											"ingredients",
											e.target.value
										)
									}></textarea>
							</div>

							<div className='actions'>
								<button
									type='button'
									className='btn btn-reset'
									onClick={resetForm}>
									Reset
								</button>
								<button
									type='submit'
									className='btn btn-submit'
									disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											<div className='spinner'></div>
											Processing...
										</>
									) : (
										"Upload Item"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddFood;
