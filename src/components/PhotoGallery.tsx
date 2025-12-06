import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  url: string;
  uploaded_at: string;
}

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/7c125ea5-3bb7-4b0c-b225-722933543e28');
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        const response = await fetch('https://functions.poehali.dev/15daaa5d-f994-4184-b101-c828cc0ce115', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64 }),
        });

        if (response.ok) {
          setSelectedFile(null);
          await loadPhotos();
        }
        setUploading(false);
      };
      
      reader.onerror = () => {
        console.error('Ошибка чтения файла');
        setUploading(false);
      };
      
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setUploading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Галерея фотографий</h2>

        <Card className="p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  <Icon name="Upload" size={20} className="mr-2" />
                  {selectedFile ? selectedFile.name : 'Выбрать фото'}
                </Button>
              </label>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="px-8"
              >
                {uploading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={20} className="mr-2" />
                    Загрузить
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Поделитесь своими фотографиями с сообществом
            </p>
          </div>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="aspect-square animate-pulse bg-card/50" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Image" size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Пока нет фотографий. Будьте первым!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <Card
                key={photo.id}
                className="overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setModalPhoto(photo)}
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.url}
                    alt="Фото из галереи"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {modalPhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setModalPhoto(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full">
              <button
                onClick={() => setModalPhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              >
                <Icon name="X" size={32} />
              </button>
              <img
                src={modalPhoto.url}
                alt="Увеличенное фото"
                className="w-full h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;