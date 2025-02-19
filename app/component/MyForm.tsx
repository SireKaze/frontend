'use client'; // Menandakan bahwa ini adalah Client Component

import React, { useState } from 'react';
import Label from './LabelProps'; // Pastikan LabelProps sudah diimpor
import Input from './InputProps'; // Pastikan InputProps sudah diimpor
import Button from './ButtonProps'; // Pastikan ButtonProps sudah diimpor

interface FormData {
  username: string;
  password: string;
  name: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    name: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Form Data (Simpan):', formData);
    // Tambahkan logika untuk menyimpan data ke server jika perlu
  };

  const handleUpdate = (): void => {
    console.log('Form Data (Update):', formData);
    // Tambahkan logika untuk memperbarui data di server jika perlu
  };

  const handleDraft = (): void => {
    localStorage.setItem('draftFormData', JSON.stringify(formData));
    console.log('Form Data (Draft):', formData);
  };

  const handleCancel = (): void => {
    setFormData({
      username: '',
      password: '',
      name: '',
    });
    console.log('Form Data (Batal): Form dikosongkan');
  };

  return (
    <body className='bg-white text-black'>
       <div className="m-16">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Hello World</h1>

        <div className="space-y-2">
          <Label htmlFor="username" isRequired title="Username" />
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-white text-black"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" isRequired title="Password" />
          <Input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="bg-white text-black"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" title="Name" />
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white text-black"
          />
        </div>

        <div className="flex space-x-4">
          <Button title="Simpan" colorSchema="blue" type="submit" disabled style={{ opacity: 0.5 }} />
          <Button title="Update" variant="outline" colorSchema="blue" onClick={handleUpdate} disabled style={{ opacity: 0.5 }} />
          <Button title="Draft" colorSchema="green" onClick={handleDraft} />
          <Button title="Batal" colorSchema="red" onClick={handleCancel} />
        </div>
      </form>
    </div>
    </body>
   
  );
};

export default MyForm;


