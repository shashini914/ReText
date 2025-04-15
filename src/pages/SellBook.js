import { useState } from 'react';
import './SellBook.css';

function SellBook() {
    const [form, setForm] = useState({
        title: '',
        course_code: '',
        description: '',
        price: '',
        contact_method: '',
        photos: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, photos: Array.from(e.target.files).slice(0, 3) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === "photos") {
                value.forEach((photo, i) => formData.append(`photo_${i + 1}`, photo));
            } else {
                formData.append(key, value);
            }
        });

        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/books/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });


        const data = await res.json();
        alert(data.message);
    };

    return (
        <div className="sell-page">
            <h2>Sell a Book</h2>
            <form className="sell-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} />

                <label>Course Code</label>
                <input type="text" name="course_code" value={form.course_code} onChange={handleChange} />

                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} />

                <label>Price</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} />

                <label>Contact Method</label>
                <input type="email" name="contact_method" value={form.contact_method} onChange={handleChange} />

                <label>Upload Photos</label>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />

                <div className="image-preview">
                    {form.photos.map((file, idx) => (
                        <img key={idx} src={URL.createObjectURL(file)} alt={`preview-${idx}`} />
                    ))}
                </div>

                <button type="submit">List Book</button>
            </form>

        </div>
    );
}

export default SellBook;
