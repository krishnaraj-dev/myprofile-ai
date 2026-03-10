import React from 'react';

interface ContactProps {
  contact: any;
}

export const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 scroll-mt-32 md:scroll-mt-40">
      <div className="relative p-12 md:p-24 bg-white rounded-[3rem] border border-slate-200 overflow-hidden text-center shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-6">Get in touch</h2>
          <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900">READY TO DISCUSS OPPORTUNITIES?</h3>
          <p className="text-lg sm:text-xl text-slate-500 font-medium mb-12">
            {contact.call_to_action}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href={`mailto:${contact.email}`}
              aria-label="Email me"
              className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
            >
              Email Me
            </a>
            <a 
              href={`tel:${contact.phone}`}
              aria-label="Call me"
              className="w-full md:w-auto px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
            >
              Call Me
            </a>
            <a 
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="w-full md:w-auto px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-indigo-900 rounded-full" />
        </div>
      </div>
    </section>
  );
};
