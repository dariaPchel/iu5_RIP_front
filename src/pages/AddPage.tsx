import { useState } from 'react';
import type { FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';

const DEFAULT_IMAGE = '/default-photo.png';
const DEFAULT_VIDEO = '/default_video.mp4';

export const AddPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  const handleSaveDraft = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCreatedAt(new Date().toISOString());
    setStep(2);
  };

  const handlePublish = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`✅ Опубликовано: "${name}"\nВозраст: ${age} лет\nИМТ: ${bmi}`);
    setStep(1);
    setName('');
    setDescription('');
    setAge('');
    setBmi('');
    setCreatedAt(null);
  };

  return (
    <div className="add-container">
      <h1 className="add-title">Добавить фактор риска</h1>

      <div className="upload-section">
        <div className="upload-card" style={{ marginBottom: '16px' }}>
          <img src={DEFAULT_IMAGE} alt="Изображение" className="upload-preview" />
        </div>
        <div className="upload-card">
          <video src={DEFAULT_VIDEO} className="upload-preview-video" autoPlay loop muted playsInline />
        </div>
      </div>

      {step === 1 && (
        <Form onSubmit={handleSaveDraft}>
          <div className="form-card">
            <Form.Label>Название фактора риска</Form.Label>
            <Form.Control
              type="text"
              className="form-input"
              placeholder="Например: Возраст старше 70 лет"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="btn-save">
            Далее (Сохранить черновик)
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={handlePublish}>
          <div className="form-card">
            <h3 className="form-card-title">Заполните данные для публикации</h3>

            <Form.Label>Название</Form.Label>
            <Form.Control type="text" className="form-input" value={name} readOnly />

            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="form-input"
              placeholder="Краткое описание фактора риска..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <div className="form-row">
              <div>
                <Form.Label>Возраст (лет)</Form.Label>
                <Form.Control
                  type="number"
                  className="form-input"
                  placeholder="70"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div>
                <Form.Label>ИМТ</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  className="form-input"
                  placeholder="24.5"
                  value={bmi}
                  onChange={(e) => setBmi(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="btn-save">
            Опубликовать карточку
          </Button>
        </Form>
      )}
    </div>
  );
};