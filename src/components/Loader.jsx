const Loader = () => {
  return (
    <div className="text-center mt-10 text-blue-600 dark:text-blue-400">
      <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
      <p className="mt-2">Analyzing your resume...</p>
    </div>
  );
};

export default Loader;
