"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/shared/container";
import { useVacancyForm } from "@/services/vacancy-form/mutations";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

export function ApplySection({ vacancyId }: { vacancyId: string }) {
  const t = useTranslations("vacancy.apply");
  const tc = useTranslations("common");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const { mutate: sendApplication, isPending } = useVacancyForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const applyFile = (file: File | undefined) => {
    if (!file) return;
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setFileError(t("fileType"));
      setSelectedFile(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(t("fileTooBig", { size: MAX_FILE_SIZE_MB }));
      setSelectedFile(null);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    if (!selectedFile) {
      setFileError(t("cvRequired"));
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error(t("emailInvalid"));
      return;
    }

    sendApplication(
      { name: trimmedName, email: trimmedEmail, cv: selectedFile, vacancy_id: vacancyId },
      {
        onSuccess: () => {
          toast.success(t("successToast"));
          setName("");
          setEmail("");
          setSelectedFile(null);
        },
        onError: () => toast.error(t("errorToast")),
      }
    );
  };

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <Container className="flex flex-col lg:flex-row gap-8 items-start w-full pt-0 pb-12 lg:gap-16 lg:py-[90px]">
        <div className="flex flex-col gap-6 items-start flex-1 min-w-0 w-full lg:gap-9">
          <div className="flex flex-col gap-3 items-start w-full lg:gap-6">
            <h2 className="font-semibold text-[#1c1c1e] text-[20px] leading-[28px] tracking-[0.2px] w-full lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
              {t("heading")}
            </h2>
            <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              {t("desc")}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
              {tc("emailApply")}
            </p>
            <a
              href={`mailto:${t("email")}`}
              className="text-[#35ac9b] text-base leading-6 tracking-[0.16px] underline w-full"
            >
              {t("email")}
            </a>
          </div>
        </div>

        <div className="bg-[#0d153a] flex flex-col gap-5 items-start justify-center p-3.5 pb-5 rounded-[14px] flex-1 min-w-0 w-full lg:gap-6 lg:p-6 lg:pb-6 lg:rounded-2xl">
          <p className="font-semibold text-white text-[20px] leading-[28px] tracking-[0.2px] lg:font-medium lg:text-2xl lg:leading-8 lg:tracking-[0.24px]">
            {t("formTitle")}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-start w-full lg:gap-8"
          >
            <div className="flex flex-col gap-4 items-start w-full lg:gap-6">
              <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="apply-name" className="text-white text-sm tracking-[0.14px] px-1">
                  {t("nameLabel")}
                </label>
                <input
                  id="apply-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="bg-white/12 border border-[#5d627b] rounded-xl px-4 py-3.5 w-full text-sm text-[#e7e7ea] placeholder:text-[#e7e7ea] focus:outline-none focus:border-[#3abdaa]"
                />
              </div>

              <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="apply-email" className="text-white text-sm tracking-[0.14px] px-1">
                  {t("emailLabel")}
                </label>
                <input
                  id="apply-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="bg-white/12 border border-[#5d627b] rounded-xl px-4 py-3.5 w-full text-sm text-[#e7e7ea] placeholder:text-[#e7e7ea] focus:outline-none focus:border-[#3abdaa]"
                />
              </div>

              <div className="flex flex-col gap-5 items-start w-full lg:gap-3">
                <p className="font-medium text-white text-base tracking-[0.16px]">{t("cvLabel")}</p>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
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
                  className={`bg-white/12 border border-dashed rounded-2xl flex flex-col gap-5 items-center px-8 py-6 w-full cursor-pointer transition-colors lg:gap-6 lg:py-8 ${
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
                        <span className="text-[#3abdaa]">{t("uploadHere")}</span>
                        <span className="text-[#b3b5bc]">{t("uploadDrop")}</span>
                      </div>
                    )}
                    <p className="text-[#b3b5bc] text-[10px] tracking-[0.1px]">
                      {t("maxFile", { size: MAX_FILE_SIZE_MB })}
                    </p>
                  </div>
                </div>
                {fileError && <p className="text-red-400 text-xs">{fileError}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-[#61cabb] flex h-12 items-center justify-center px-6 py-3 rounded-full w-full transition-opacity disabled:opacity-70"
            >
              <span className="font-medium text-white text-base leading-6 tracking-[0.16px]">
                {isPending ? tc("sending") : tc("send")}
              </span>
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
