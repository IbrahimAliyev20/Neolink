import devopsMuhendisiHero from "../../../public/images/vacancy/devops-muhendisi-hero.png";

export type VacancyContentSection =
  | { type: "paragraphs"; title: string; paragraphs: string[] }
  | { type: "list"; title: string; items: string[] };

export interface Vacancy {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
  heroImage: typeof devopsMuhendisiHero;
  sections?: VacancyContentSection[];
}

export const vacancies: Vacancy[] = [
  {
    slug: "devops-muhendisi",
    title: "DevOps Mühəndisi",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
    date: "20 iyul 2026",
    type: "Hibrid",
    heroImage: devopsMuhendisiHero,
    sections: [
      {
        type: "paragraphs",
        title: "Vakansiya haqqında",
        paragraphs: [
          "Neoline komandası olaraq infrastrukturun etibarlı, təhlükəsiz və davamlı inkişafını təmin edəcək DevOps Mühəndisi axtarırıq. Bu vəzifədə siz proqram təminatının hazırlanması və istismarı proseslərini optimallaşdıracaq, inkişaf və əməliyyat komandaları arasında əməkdaşlığı gücləndirəcək, avtomatlaşdırılmış yerləşdirmə prosesləri quracaq və sistemlərin yüksək əlçatanlığını təmin edəcəksiniz.",
          "Gündəlik işinizə CI/CD proseslərinin hazırlanması və təkmilləşdirilməsi, konteyner texnologiyalarının idarə olunması, bulud infrastrukturunun qurulması və monitorinq həllərinin tətbiqi daxil olacaq. Eyni zamanda sistem performansının optimallaşdırılması, təhlükəsizlik standartlarının qorunması və texniki problemlərin operativ həlli istiqamətində aktiv rol oynayacaqsınız.",
          "Əgər müasir DevOps yanaşmaları ilə işləməyi sevir, avtomatlaşdırma və davamlı inkişaf mədəniyyətini dəstəkləyir, yeni texnologiyaları öyrənməyə açıq və innovativ layihələrdə iştirak etmək istəyirsinizsə, sizi Neoline komandasında görməkdən məmnun olarıq. Burada peşəkar inkişafınızı dəstəkləyən mühitdə çalışacaq, real biznes həllərinin hazırlanmasına töhfə verəcək və karyeranızı növbəti mərhələyə daşımaq imkanı əldə edəcəksiniz.",
        ],
      },
      {
        type: "list",
        title: "Namizəddən gözləntilər",
        items: [
          "DevOps və ya Sistem Administratoru kimi minimum 2 il iş təcrübəsi.",
          "Linux əməliyyat sistemi üzrə yaxşı biliklər.",
          "Docker və Kubernetes ilə praktiki iş təcrübəsi.",
          "CI/CD alətləri (GitHub Actions, GitLab CI, Jenkins və s.) ilə işləmə bacarığı.",
          "AWS, Azure və ya Google Cloud Platform xidmətlərindən ən azı biri üzrə təcrübə.",
          "Infrastructure as Code (Terraform və ya Ansible) alətləri ilə işləmək bacarığı.",
          "Monitorinq və loqlama sistemləri (Prometheus, Grafana, ELK və s.) haqqında bilik.",
          "Git versiya idarəetmə sistemi ilə işləmək bacarığı.",
          "Analitik düşüncə, problem həll etmə və komanda ilə effektiv əməkdaşlıq bacarığı.",
          "Azərbaycan dili sərbəst, ingilis dilində texniki sənədləri oxuma və anlama bacarığı.",
        ],
      },
      {
        type: "list",
        title: "Təkliflərimiz",
        items: [
          "Rəqabətqabiliyyətli əməkhaqqı və bonus imkanları.",
          "Peşəkar inkişaf və sertifikatlaşdırma dəstəyi.",
          "Müasir texnologiyalar və real layihələr üzərində işləmək imkanı.",
          "Təcrübəli və peşəkar komanda ilə əməkdaşlıq.",
          "Rahat və müasir iş mühiti.",
          "Karyera inkişafı və yüksəliş imkanları.",
          "Çevik iş mühiti və iş–şəxsi həyat balansını dəstəkləyən yanaşma.",
          "Korporativ tədbirlər və komanda fəaliyyətlərində iştirak imkanı.",
        ],
      },
    ],
  },
  {
    slug: "devops-engineer-2",
    title: "DevOps Engineer",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
    date: "20 iyul 2026",
    type: "Hibrid",
    heroImage: devopsMuhendisiHero,
  },
  {
    slug: "devops-engineer-3",
    title: "DevOps Engineer",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
    date: "20 iyul 2026",
    type: "Hibrid",
    heroImage: devopsMuhendisiHero,
  },
];

export function getVacancyBySlug(slug: string): Vacancy | undefined {
  return vacancies.find((vacancy) => vacancy.slug === slug);
}
