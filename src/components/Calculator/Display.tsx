interface DisplayProps {
  value: string;
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <div className="text-right text-3xl font-mono text-white overflow-x-auto">
        {value || '0'}
      </div>
    </div>
  );
};

export default Display;