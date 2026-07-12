import DocumentCard from "../../components/document/DocumentCard";

const Documents = () => {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Document Translator
        </h1>

        <p className="mt-2 text-gray-500">
          Upload PDF or DOCX files and translate them instantly using AI.
        </p>
      </div>

      <DocumentCard />

    </div>
  );
};

export default Documents;