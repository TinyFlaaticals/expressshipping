import QueryForm from "@/components/QueryForm";
import { Metadata } from "next";

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.id.replace('-', ' ')} - Express Shipping`,
    description: `Learn more about our ${params.id.replace('-', ' ')} services`
  }
}

export default async function ServiceDetails({ params }: Props) {
  const currentService = params.id;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[1398px] mx-auto px-4 sm:px-6 lg:px-[57px] py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Service Details Card */}
          <div 
            className="w-full lg:w-[398px] bg-[#152C40] rounded-[50px] overflow-hidden
                     shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Service Content */}
            <div className="p-10">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-[39px] h-[37px]">
                  <img 
                    src={`/icons/${currentService}_w.svg`}
                    alt={currentService}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="w-[4px] h-[75px] bg-[#F22929] rounded-full" />
                <h1 className="text-2xl font-bold text-white capitalize">
                  {currentService.replace('-', ' ')}
                </h1>
              </div>
            </div>
          </div>

          {/* Query Form */}
          <div className="flex justify-center">
            <QueryForm />
          </div>
        </div>

        {/* Back Button */}
        <div className="w-full flex justify-center">
          <a
            href="/"
            className="mt-16 mb-20 flex items-center gap-3 
                     px-6 py-3 rounded-full border border-transparent
                     hover:border-[#2B84EA]/20 hover:bg-[#2B84EA]/5
                     transition-all duration-300 group"
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full 
                       bg-[#152C40] text-white group-hover:-translate-x-1 transition-transform"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                className="transform"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="text-[#152C40] font-medium text-lg">Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
} 