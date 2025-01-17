export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#152C40] mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <a 
          href="/"
          className="text-[#2B84EA] hover:underline"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
} 