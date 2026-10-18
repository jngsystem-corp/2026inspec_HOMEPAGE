'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

type Status = 'urgent' | 'upcoming' | 'exempt';

type Option = {
  label: string;
  range: string;
  deadline: string;
  status: Status;
  badge: string;
  message: string;
};

const options: Option[] = [
  {
    label: '3만㎡ 이상',
    range: '연면적 3만㎡ 이상',
    deadline: '2025. 7. 19.부터 적용 중',
    status: 'urgent',
    badge: '의무 적용 중',
    message: '반기 1회 유지보수·관리 점검과 매년 1회 성능점검을 계속 이행해야 합니다. 과태료 계도기간(2026.7.18)도 이미 끝났습니다.',
  },
  {
    label: '1만㎡ ~ 3만㎡',
    range: '연면적 1만㎡ 이상 ~ 3만㎡ 미만',
    deadline: '첫 관리점검 2027. 1. 18.',
    status: 'urgent',
    badge: '의무 적용 중',
    message: '2026년 7월 19일부터 의무가 적용됐습니다. 관리자 선임(또는 위탁) 기한 2026.8.18은 이미 지났습니다 — 아직이라면 즉시 선임하고, 2027.1.18까지 첫 유지보수·관리 점검, 2027.7.18까지 첫 성능점검을 해야 합니다.',
  },
  {
    label: '5천㎡ ~ 1만㎡',
    range: '연면적 5천㎡ 이상 ~ 1만㎡ 미만',
    deadline: '2027. 7. 19. 적용',
    status: 'upcoming',
    badge: '준비 필요',
    message: '2027년 7월 19일부터 의무가 적용됩니다(2027.8.18까지 관리자 선임). 미리 준비하면 비용과 행정 절차를 절약할 수 있습니다.',
  },
  {
    label: '5천㎡ 미만 / 공동주택',
    range: '5천㎡ 미만 또는 공동주택·학교',
    deadline: '해당 없음',
    status: 'exempt',
    badge: '의무 없음',
    message: '연면적 5천㎡ 미만 건축물, 공동주택(아파트·연립), 초·중·고 학교시설은 대상에서 제외됩니다.',
  },
];

const borderColor: Record<Status, string> = {
  urgent: '#E85C0D',
  upcoming: '#0070F3',
  exempt: '#0E9E6E',
};

const bgColor: Record<Status, string> = {
  urgent: 'rgba(232,92,13,0.18)',
  upcoming: 'rgba(0,112,243,0.18)',
  exempt: 'rgba(14,158,110,0.18)',
};

export default function HeroDiagnosis() {
  const [selected, setSelected] = useState<number | null>(null);
  const opt = selected !== null ? options[selected] : null;

  return (
    <div className="mb-8">
      <p className="text-white/60 text-xs font-bold mb-3 tracking-wide">
        우리 건물 연면적을 선택하면 의무 기한을 즉시 확인할 수 있습니다
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {options.map((o, i) => (
          <button
            key={o.label}
            onClick={() => setSelected(selected === i ? null : i)}
            aria-pressed={selected === i}
            className={`px-3.5 py-2 rounded-lg text-sm font-bold border transition-all ${
              selected === i
                ? 'bg-white text-[#0D2B5E] border-white'
                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {opt && (
        <div
          className="rounded-xl p-4 border-l-4"
          style={{ background: bgColor[opt.status], borderColor: borderColor[opt.status] }}
          aria-live="polite"
          aria-label="진단 결과"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {opt.status === 'urgent' && (
              <AlertTriangle size={14} className="shrink-0" style={{ color: '#FF9B6B' }} />
            )}
            {opt.status === 'upcoming' && (
              <Clock size={14} className="shrink-0" style={{ color: '#60B0FF' }} />
            )}
            {opt.status === 'exempt' && (
              <CheckCircle2 size={14} className="shrink-0" style={{ color: '#4ADE80' }} />
            )}
            <span className="font-bold text-white text-sm">{opt.range}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ background: borderColor[opt.status], color: 'white' }}
            >
              {opt.badge}
            </span>
          </div>

          {opt.status !== 'exempt' && (
            <p className="text-white/90 text-sm mb-1">
              핵심 일정:{' '}
              <strong className="text-white">{opt.deadline}</strong>
              {opt.status === 'urgent' && (
                <span className="ml-2 text-xs font-bold" style={{ color: '#FF9B6B' }}>
                  ⚠ 미이행 시 최대 300만원 과태료
                </span>
              )}
            </p>
          )}
          <p className="text-white/70 text-xs leading-relaxed">{opt.message}</p>

          {opt.status === 'urgent' && (
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-[#E85C0D] text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              지금 바로 상담 신청 <ArrowRight size={13} />
            </Link>
          )}
          {opt.status === 'upcoming' && (
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 text-white text-xs font-bold rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
            >
              사전 상담 신청 <ArrowRight size={13} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
