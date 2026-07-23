"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import Container from "@/components/shared/container";

const MAX_FILE_SIZE_MB = 5;

export function ApplySection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const applyFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`Fayl ${MAX_FILE_SIZE_MB}MB-dan kiçik olmalıdır`);
      setSelectedFile(null);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  };

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <Container className="flex flex-col lg:flex-row gap-16 items-start w-full py-[90px]">
        <div className="flex flex-col gap-9 items-start flex-1 min-w-0 w-full">
          <div className="flex flex-col gap-6 items-start w-full">
            <h2 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px] w-full">
              Neoline Ailəsinə Qoşulun
            </h2>
            <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
              Böyüməyə dəyər verən komandamızda bacarıqlarınızı nümayiş etdirin, yeni
              texnologiyalarla işləyin və gələcəyin həllərini birlikdə formalaşdıraq.
            </p>
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
              E-poçt ilə müraciət:
            </p>
            <a
              href="mailto:career@neolinetech.az"
              className="text-[#35ac9b] text-base leading-6 tracking-[0.16px] underline w-full"
            >
              career@neolinetech.az
            </a>
          </div>
        </div>

        <div className="bg-[#0d153a] flex flex-col gap-6 items-start justify-center p-6 rounded-2xl flex-1 min-w-0 w-full">
          <p className="font-medium text-white text-2xl leading-8 tracking-[0.24px]">
            Müraciət edin
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col gap-8 items-start w-full"
          >
            <div className="flex flex-col gap-6 items-start w-full">
              <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="apply-name" className="text-white text-sm tracking-[0.14px] px-1">
                  Ad, soyad
                </label>
                <input
                  id="apply-name"
                  type="text"
                  placeholder="Ad və soyadınızı daxil edin"
                  className="bg-white/12 border border-[#5d627b] rounded-xl px-4 py-3.5 w-full text-sm text-[#e7e7ea] placeholder:text-[#e7e7ea] focus:outline-none focus:border-[#3abdaa]"
                />
              </div>

              <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="apply-email" className="text-white text-sm tracking-[0.14px] px-1">
                  E-poçt
                </label>
                <input
                  id="apply-email"
                  type="email"
                  placeholder="E-poçt adresinizi daxil edin"
                  className="bg-white/12 border border-[#5d627b] rounded-xl px-4 py-3.5 w-full text-sm text-[#e7e7ea] placeholder:text-[#e7e7ea] focus:outline-none focus:border-[#3abdaa]"
                />
              </div>

              <div className="flex flex-col gap-3 items-start w-full">
                <p className="font-medium text-white text-base tracking-[0.16px]">CV-niz</p>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragActive(true);
                  }}
                  onDragLeave={() => setIsDragActive(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDragActive(false);
                    applyFile(event.dataTransfer.files?.[0]);
                  }}
                  role="button"
                  tabIndex={0}
                  className={`bg-white/12 border border-dashed rounded-2xl flex flex-col gap-6 items-center p-8 w-full cursor-pointer transition-colors ${
                    isDragActive ? "border-[#61cabb]" : "border-[#3abdaa]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(event) => applyFile(event.target.files?.[0])}
                  />
                  <div className="bg-[#0d153a] flex items-center justify-center p-2 rounded-lg">
                    <UploadCloud className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    {selectedFile ? (
                      <p className="text-[#3abdaa] text-xs tracking-[0.12px]">{selectedFile.name}</p>
                    ) : (
                      <div className="flex gap-1 items-start text-xs tracking-[0.12px]">
                        <span className="text-[#3abdaa]">Buradan yükləyin</span>
                        <span className="text-[#b3b5bc]">və ya sürükləyib buraxın</span>
                      </div>
                    )}
                    <p className="text-[#b3b5bc] text-[10px] tracking-[0.1px]">
                      Maksimum fayl {MAX_FILE_SIZE_MB}MB
                    </p>
                  </div>
                </div>
                {fileError && <p className="text-red-400 text-xs">{fileError}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#61cabb] flex h-12 items-center justify-center px-6 py-3 rounded-full w-full"
            >
              <span className="font-medium text-white text-base leading-6 tracking-[0.16px]">
                Göndər
              </span>
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
