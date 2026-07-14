interface Props {
  preview: string;
  setPreview: (value: string) => void;
  setImage: (file: File | null) => void;
}

const ImageUploader = ({
  preview,
  setPreview,
  setImage,
}: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="rounded-xl border-2 border-dashed p-8 text-center">

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mx-auto mt-6 max-h-80 rounded-xl shadow"
        />
      )}

    </div>
  );
};

export default ImageUploader;