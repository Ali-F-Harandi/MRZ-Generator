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
  
  // Import State
  const [importMode, setImportMode] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

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

  const handleImport = () => {
    try {
      if (!importText.trim()) return;
      const parsedData = MrzService.parse(importText);
      setData(parsedData);
      setImportMode(false);
      setImportError(null);
      setImportText('');
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Failed to parse MRZ');
    }
  };

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
              <li><button onClick={() => setImportMode(!importMode)} className="hover:text-white transition-colors">Import</button></li>
              <li><span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">v1.1.0</span></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full px-4 py-8 mx-auto">
        
        {/* Import Panel */}
        {importMode && (
          <div className="max-w-[95%] xl:max-w-7xl mx-auto mb-8 bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700 animate-fade-in">
            <h2 className="text-white font-bold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Import from MRZ
            </h2>
            <p className="text-slate-400 text-sm mb-4">Paste an existing MRZ code below to auto-fill the form.</p>
            <textarea
              className="w-full h-32 bg-slate-900 text-green-400 font-mono text-sm p-4 rounded border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder={'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<\nL898902C36UTO7408122F2404166ZE184226B<<<<<14'}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            {importError && (
              <div className="mt-2 text-red-400 text-sm font-medium">{importError}</div>
            )}
            <div className="mt-4 flex gap-3">
              <button 
                onClick={handleImport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Decode & Fill
              </button>
              <button 
                onClick={() => setImportMode(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
                You can now <strong>Import</strong> existing MRZ codes! Click the "Import" button in the top navigation to decode a passport string back into this form.
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