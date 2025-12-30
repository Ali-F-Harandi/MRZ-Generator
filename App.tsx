import React, { useState, useEffect } from 'react';
import { DocumentType, MrzPersonalData, MrzResult } from './src/types/mrz';
import { MrzService } from './src/services/mrz-service';
import MrzForm from './src/components/MrzForm';
import MrzDisplay from './src/components/MrzDisplay';

const App: React.FC = () => {
  const [data, setData] = useState<MrzPersonalData>({
    documentType: DocumentType.PASSPORT,
    countryCode: 'UTO',
    documentNumber: 'L898902C3',
    birthDate: '740812',
    sex: 'F',
    expiryDate: '240416',
    nationality: 'UTO',
    surname: 'ERIKSSON',
    givenNames: 'ANNA MARIA',
    personalNumber: 'ZE184226B'
  });

  const [result, setResult] = useState<MrzResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const generatedMrz = MrzService.generate(data);
      setResult(generatedMrz);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setResult(null);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold">M</div>
            <h1 className="text-xl font-bold tracking-tight">MRZ Generator</h1>
          </div>
          <nav>
            <ul className="flex gap-4 text-sm font-medium text-slate-400">
              <li><span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">v0.1.14</span></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full px-4 py-8 mx-auto">
        {/* Increased width to 7xl and max-width 95% for better responsiveness */}
        <div className="max-w-[95%] xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Input */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Document Details
            </h2>
            <MrzForm data={data} onChange={setData} />
          </section>

          {/* Right Column: Output */}
          <section className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                Generated MRZ
              </h2>
              
              {error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">
                  {error}
                </div>
              ) : (
                <MrzDisplay result={result} />
              )}
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Did you know?</h3>
              <p className="text-sm text-blue-800">
                The checksums in the MRZ (Modulo 10) ensure that scanners can detect reading errors. 
                Try changing a character in the Document Number to see the check digit update automatically!
              </p>
            </div>
          </section>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} MRZ Generator. Privacy: All generation happens locally in your browser.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;