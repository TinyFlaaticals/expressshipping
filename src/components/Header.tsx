import Image from 'next/image'

const Header = () => {
  return (
    <div 
      className="relative w-full h-[300px] rounded-[50px] overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 border border-red-500"
    >
      <div className="absolute inset-0">
        <Image
          src="/public/images/hero.jpg"
          alt="Maldives Aerial View"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
          onError={(e) => {
            console.error('Image failed to load:', e);
          }}
          onLoad={() => {
            console.log('Image loaded successfully');
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-[40px] font-bold text-center">
          THE MALDIVES' LOGISTICS EXPERTS
        </h1>
        <p className="text-xl mt-4">
          Reliable Logistics, Beyond Boundaries
        </p>
      </div>
    </div>
  )
}

export default Header