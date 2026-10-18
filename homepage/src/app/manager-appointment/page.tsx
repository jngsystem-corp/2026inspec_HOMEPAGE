import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, FileText, RefreshCw } from "lucide-react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import PageLayout from "@/components/PageLayout";

const title = "정보통신설비 유지보수·관리자 선임 — 자격·기한·신고 안내";
const description = "정보통신설비 유지보수·관리자 선임 대상과 자격, 건축물 규모별 선임 기한을 확인하세요. 직접 선임과 공사업자 위탁의 차이, 관할 지자체 신고 방법·서류와 과태료 기준액, 무료 상담을 안내합니다.";
const url = "https://inspec.jngsystem.co.kr/manager-appointment";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "정보통신설비유지보수관리자 선임",
    "정보통신설비 유지보수·관리자 선임",
    "관리자 선임 자격",
    "정보통신설비 선임 신고",
    "정보통신설비 유지보수 위탁",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url },
  twitter: { card: "summary_large_image", title, description },
};

// FACTS_LAW1 C4: 기존 건축물의 선임기한과 실제 선임일 기준 신고기한은 별개다.
const deadlines = [
  ["3만㎡ 이상", "2025.7.19", "2025.8.18까지", "선임기한이 지났습니다"],
  ["1만㎡ 이상 ~ 3만㎡ 미만", "2026.7.19", "2026.8.18까지", "선임기한이 지났습니다"],
  ["5천㎡ 이상 ~ 1만㎡ 미만", "2027.7.19", "2027.8.18까지", "선임 준비"],
];

// FACTS_LAW1 C2: 공식 명칭은 시행규칙 [별표]이며, 별표 1이 아니다.
const grades = [
  ["6만㎡ 이상", "특급", "1명"],
  ["3만㎡ 이상 ~ 6만㎡ 미만", "고급 이상", "1명"],
  ["1만 5천㎡ 이상 ~ 3만㎡ 미만", "중급 이상", "1명"],
  ["5천㎡ 이상 ~ 1만 5천㎡ 미만", "초급 이상", "1명"],
];

// FACTS_LAW1 C1·C2, FACTS_LAW2 D1~D3.
const comparisons = [
  ["필요 인력", "인정교육과 건축물 규모별 기술자 등급 요건을 갖춘 관리자", "해당 자격·등급을 갖춘 기술자가 업무를 수행하는 정보통신공사업자"],
  ["선임 방식", "자격요건을 갖춘 관리자를 직접 선임", "유지보수등 업무를 위탁하면 관리자를 선임한 것으로 간주"],
  ["신고 주체·기한", "관리주체가 선임일부터 30일 이내 신고", "위탁해도 관리주체가 선임일부터 30일 이내 신고"],
  ["신고 첨부서류", "재직확인서류, 경력수첩 사본 및 정보통신기술자 경력확인서", "위탁계약서 사본, 경력수첩 사본 및 정보통신기술자 경력확인서"],
  ["관리주체의 의무", "관리기준 준수, 성능점검·기록 관련 의무 및 선임신고 이행", "유지보수등 업무를 위탁하더라도 관리주체의 선임신고 의무 유지"],
];

const steps = [
  {
    icon: BadgeCheck,
    title: "자격 확인",
    text: "건축물의 연면적과 적용일을 확인하고, 인정교육 20시간 이상 이수 여부와 기술계 정보통신기술자 등급을 확인합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "선임 또는 위탁계약",
    text: "규모별 기한에 맞춰 관리자를 선임하거나 정보통신공사업자에게 유지보수등 업무를 위탁합니다. 위탁 시에는 계약서 사본을 준비합니다.",
  },
  {
    icon: FileText,
    title: "기한 내 신고",
    text: "관리주체가 선임일부터 30일 이내에 관할 지자체에 선임신고를 합니다. 위탁 시에도 별지 제10호 선임·해임 신고서에 위탁 수행을 표시해 신고합니다.",
  },
  {
    icon: RefreshCw,
    title: "변경 시 재선임·변경 신고",
    text: "관리자 해임 시 해임일부터 30일 이내 새 관리자를 선임하고, 해임·선임 신고도 각각 그 날부터 30일 이내에 합니다. 기존 신고사항 변경은 변경사유 발생일부터 30일 이내 변경신고합니다.",
  },
];

// FACTS_LAW1 C6, FACTS_LAW2 D8.
const penalties = [
  ["관리자 미선임", "300만원"],
  ["해임일부터 30일 이내 재선임 불이행", "300만원"],
  ["선임·해임·변경 미신고 또는 거짓 신고", "100만원"],
];

function GuideTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] card-shadow">
      <table className="w-full min-w-[640px] bg-white text-sm text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[var(--color-primary)] text-white">
          <tr>
            {headers.map((header) => <th key={header} scope="col" className="px-6 py-4 font-semibold">{header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {rows.map(([label, ...cells]) => (
            <tr key={label} className="hover:bg-[var(--color-bg)]">
              <th scope="row" className="px-6 py-4 font-semibold text-[var(--color-primary)]">{label}</th>
              {cells.map((cell, index) => <td key={headers[index + 1]} className="px-6 py-4 leading-relaxed text-[var(--color-gray-600)]">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ManagerAppointmentPage() {
  return (
    <PageLayout>
      <BreadcrumbSchema items={[{ name: "홈", path: "/" }, { name: "관리자 선임 안내", path: "/manager-appointment" }]} />
      <section className="relative overflow-hidden">
        <Image src="/hero-law.webp" alt="" fill preload sizes="100vw" className="object-cover" style={{ objectPosition: "center center", filter: "brightness(0.4)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,13,28,0.85) 0%, rgba(4,13,28,0.75) 45%, rgba(4,13,28,0.55) 70%, rgba(4,13,28,0.40) 100%)" }} />
        <div className="relative z-10 container-main py-8 sm:py-12">
          <p className="text-white/60 text-sm mb-2">관리자 선임 안내</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight mb-4">정보통신설비 유지보수·관리자 선임 안내</h1>
          <p className="text-white/80 leading-relaxed">자격 확인부터 선임·위탁, 관할 지자체 신고까지 안내합니다.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="answer-block" aria-label="관리자 선임 핵심 안내">
            <p>
              연면적 5천㎡ 이상 대상 건축물의 관리주체(소유자 또는 관리자)는 공동주택·초·중·고 학교시설을 제외하고 자격을 갖춘 정보통신설비 유지보수·관리자를 선임해야 합니다.
              기존 건축물의 선임기한은 3만㎡ 이상 2025.8.18, 1만㎡ 이상~3만㎡ 미만 2026.8.18, 5천㎡ 이상~1만㎡ 미만 2027.8.18까지이며, 실제 선임일부터 30일 이내 관할 특별자치시·특별자치도·시·군·구에 신고해야 합니다.
              정보통신공사업자에게 유지보수등 업무를 위탁하면 선임한 것으로 보지만, 관리주체의 선임신고는 필요합니다.
            </p>
          </div>
          <p className="text-sm mb-8 text-[var(--color-gray-600)]">안내 기준일: <time dateTime="2026-10-18">2026년 10월 18일</time>. 아래 표에서 이미 지난 선임기한을 확인하세요.</p>

          <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">누가 선임해야 하나요?</h2>
          <p className="leading-relaxed mb-6 text-[var(--color-gray-600)]">
            연면적 5,000㎡ 이상 대상 건축물의 관리주체가 선임 의무를 이행합니다. 공동주택과 초·중·고 학교시설은 제외됩니다.
            아래는 기존 건축물의 규모별 적용일과 선임기한입니다.
          </p>
          <GuideTable caption="기존 건축물 규모별 적용일과 선임기한" headers={["건축물 연면적", "적용일", "선임기한", "2026.10.18 기준"]} rows={deadlines} />
          <div className="mt-5 rounded-xl p-5 bg-[var(--color-warning-light)] text-[var(--color-gray-600)]">
            <p className="font-bold mb-2 text-[var(--color-warning)]">1만㎡ 이상 기존 건축물의 선임기한은 이미 지났습니다.</p>
            <p className="text-sm leading-relaxed">선임기한과 신고기한은 다릅니다. 신고기한은 실제 선임일부터 30일 이내이며, 선임기한까지 신고도 마쳐야 한다는 뜻은 아닙니다(시행규칙 제10조제1항).</p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-gray-600)]">
            신축·증축·개축·재축·대수선으로 선임의무가 생긴 경우에는 사용승인·준공인가 등을 받은 완공일부터 30일 이내에 선임해야 합니다.
            선임 후에는 별도로 선임일부터 30일 이내 신고합니다(시행규칙 제9조제2항제1호, 제10조제1항).
          </p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container-main">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">관리자 자격 요건</h2>
          <p className="mb-6 text-[var(--color-gray-600)]">시행령 제37조의3에 따라 다음 두 요건을 모두 갖춰야 합니다.</p>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-[var(--color-border)] card-shadow">
              <h3 className="text-lg font-bold mb-2 text-[var(--color-primary)]">인정교육 20시간 이상</h3>
              <p className="text-sm leading-relaxed text-[var(--color-gray-600)]">유지보수·관리자 인정교육을 20시간 이상 이수해야 합니다.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[var(--color-border)] card-shadow">
              <h3 className="text-lg font-bold mb-2 text-[var(--color-primary)]">기술계 정보통신기술자</h3>
              <p className="text-sm leading-relaxed text-[var(--color-gray-600)]">시행령 별표 6의 기술계 정보통신기술자여야 하며, 건축물 규모별 선임 등급도 충족해야 합니다.</p>
            </div>
          </div>
          <GuideTable caption="건축물 연면적별 관리자 선임 등급과 인원" headers={["건축물 연면적", "선임 등급", "선임 인원"]} rows={grades} />
          <p className="mt-4 text-sm text-[var(--color-gray-600)]">규모별 선임 등급 근거: 시행규칙 제9조제1항 및 시행규칙 [별표].</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">직접 선임 vs 정보통신공사업자 위탁</h2>
          <p className="mb-6 leading-relaxed text-[var(--color-gray-600)]">
            정보통신공사업자에게 유지보수등 업무를 위탁하면 관리자를 선임한 것으로 봅니다(정보통신공사업법 제37조의4제2항 단서).
            위탁해도 관리주체가 선임신고를 해야 합니다(법 제37조의4제3항, 시행규칙 제10조제1항).
          </p>
          <GuideTable caption="직접 선임과 정보통신공사업자 위탁 비교" headers={["확인 항목", "직접 선임", "정보통신공사업자 위탁"]} rows={comparisons} />
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-gray-600)]">관리기준 준수·성능점검·기록 관련 의무의 근거는 법 제37조의3입니다.</p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container-main">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">선임 절차</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {steps.map(({ icon: Icon, title: stepTitle, text }, index) => (
              <li key={stepTitle} className="bg-white rounded-2xl p-6 border border-[var(--color-border)] card-shadow">
                <Icon size={28} className="mb-4 text-[var(--color-accent)]" aria-hidden="true" />
                <p className="text-xs font-bold mb-2 text-[var(--color-accent)]">STEP {index + 1}</p>
                <h3 className="font-bold mb-3 text-[var(--color-primary)]">{stepTitle}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-gray-600)]">{text}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl bg-white p-6 border border-[var(--color-border)] card-shadow">
            <h3 className="text-lg font-bold mb-3 text-[var(--color-primary)]">어디에, 어떤 서류로 신고하나요?</h3>
            <p className="text-sm leading-relaxed mb-4 text-[var(--color-gray-600)]">
              신고기관은 관할 특별자치시장·특별자치도지사·시장·군수·구청장입니다. 실무적으로 관할 시·군·구청에 다음 서류를 제출합니다(시행규칙 제10조).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--color-gray-600)]">
              <li>별지 제10호 유지보수·관리자 선임·해임 신고서</li>
              <li>재직확인서류 — 위탁 시에는 위탁계약서 사본</li>
              <li>경력수첩 사본 및 정보통신기술자 경력확인서</li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-gray-600)]">
              사업자등록증명과 건축물대장은 담당 공무원이 공동이용으로 확인합니다.
              위탁 시에도 별도 명칭의 위탁신고가 아니라 선임·해임 신고서에 위탁 수행을 표시합니다.
            </p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-gray-600)]">
            관리자 교체는 단순 변경신고가 아닌 해임·선임 신고 대상입니다. 관리주체 정보나 관리자의 주소·등급·경력수첩 번호 등 기존 신고사항이 바뀌면 변경신고합니다.
            재선임 근거는 법 제37조의4제5항, 신고기한 근거는 시행규칙 제10조제1항·제3항입니다.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">선임하지 않으면?</h2>
          <p className="mb-6 leading-relaxed text-[var(--color-gray-600)]">법 제78조, 시행령 제58조제1항 및 별표 10에 따른 선임·신고 관련 과태료 기준액은 다음과 같습니다.</p>
          <GuideTable caption="관리자 선임·신고 위반 과태료 기준액" headers={["위반 사항", "과태료 기준액"]} rows={penalties} />
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-gray-600)]">
            위 금액은 시행령 별표 10 제12호부터 제14호의 기준액입니다. 시행령 제58조제2항에 따라 위반횟수 등을 고려해 기준액의 2분의 1 범위에서 경감·가중할 수 있으며, 법정 상한을 넘을 수 없습니다.
            위반횟수별로 고정된 1차·2차·3차 금액표는 아닙니다.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container-main">
          <h2 className="text-2xl font-bold mb-5 text-[var(--color-primary)]">함께 확인할 안내</h2>
          <nav aria-label="관리자 선임 관련 페이지" className="flex flex-wrap gap-4 mb-10">
            {[
              { href: "/law", label: "법령 안내" },
              { href: "/service", label: "유지보수 위탁 서비스" },
              { href: "/faq", label: "자주 묻는 질문" },
              { href: "/target", label: "대상건축물 확인" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="inline-flex items-center gap-2 underline underline-offset-4 font-semibold text-[var(--color-accent)] hover:opacity-80">
                {label} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="rounded-2xl p-8 text-center bg-[var(--color-accent-light)]">
            <h3 className="text-xl font-bold mb-3 text-[var(--color-primary)]">우리 건물에 맞는 선임·위탁 방법을 확인하세요</h3>
            <p className="text-sm leading-relaxed mb-6 text-[var(--color-gray-600)]">건축물 규모와 현재 선임 여부를 알려주시면 자격 확인과 위탁 상담을 도와드립니다.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
              무료 선임·위탁 상담 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
